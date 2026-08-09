docker run --rm -it -p 4566:4566 -p 4510-4559:4510-4559 `
-e EXTRA_CORS_ALLOWED_ORIGINS="http://localhost:4200" `
-e DISABLE_CORS_CHECKS="1" `
-e DASHBOARD_API_OPEN="1" `
localemu/localemu

docker run --rm -it -p 4566:4566 -p 4510-4559:4510-4559 `
-v "//./pipe/docker_engine://./pipe/docker_engine" `
-v "/var/run/docker.sock:/var/run/docker.sock" `
-e EXTRA_CORS_ALLOWED_ORIGINS="http://localhost:4200" `
-e DISABLE_CORS_CHECKS="1" `
-e DASHBOARD_API_OPEN="1" `
localemu/localemu