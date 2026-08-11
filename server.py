import asyncio
import threading
import docker
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = docker.from_env()

@app.websocket("/ws/ec2/terminal/{instance_id}")
async def ec2_terminal_websocket(websocket: WebSocket, instance_id: str):
    await websocket.accept()
    
    container_name = f"localemu-ec2-{instance_id}"
    try:
        container = client.containers.get(container_name)
    except Exception as e:
        await websocket.send_text(f"\r\n[Error] Container {container_name} not found: {str(e)}\r\n")
        await websocket.close()
        return

    try:
        exec_id = client.api.exec_create(
            container.id, 
            cmd=["sh"], 
            stdin=True, 
            stdout=True, 
            stderr=True, 
            tty=True
        )["Id"]
        
        socket_stream = client.api.exec_start(exec_id, socket=True, stream=True)
        # Handle both standard sockets and Windows NpipeSocket wrappers securely
        sock = getattr(socket_stream, '_sock', socket_stream)
    except Exception as e:
        await websocket.send_text(f"\r\n[Error] Failed to start terminal session: {str(e)}\r\n")
        await websocket.close()
        return

    loop = asyncio.get_running_loop()
    queue = asyncio.Queue()

    def socket_reader():
        try:
            while True:
                # Use standard read/recv depending on socket type
                if hasattr(sock, 'recv'):
                    data = sock.recv(1024)
                else:
                    data = sock.read(1024)
                if not data:
                    break
                loop.call_soon_threadsafe(queue.put_nowait, data)
        except Exception:
            pass

    t = threading.Thread(target=socket_reader, daemon=True)
    t.start()

    async def forward_output():
        try:
            while True:
                data = await queue.get()
                if isinstance(data, bytes):
                    text = data.decode("utf-8", errors="ignore")
                else:
                    text = str(data)
                await websocket.send_text(text)
        except Exception:
            pass

    output_task = asyncio.create_task(forward_output())

    try:
        while True:
            user_input = await websocket.receive_text()
            def write_to_socket():
                if hasattr(sock, 'sendall'):
                    sock.sendall(user_input.encode("utf-8"))
                elif hasattr(sock, 'write'):
                    sock.write(user_input.encode("utf-8"))
                    sock.flush()
            
            await loop.run_in_executor(None, write_to_socket)
    except WebSocketDisconnect:
        pass
    except Exception:
        pass
    finally:
        output_task.cancel()
        try:
            sock.close()
        except Exception:
            pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=4567, reload=True)