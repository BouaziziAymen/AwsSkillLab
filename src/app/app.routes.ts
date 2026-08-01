import { Routes } from '@angular/router';
import { ConsoleComponent } from './components/console/console.component';
import { AppComponent } from './app.component';
import { GameScreenComponent } from './screens/game-screen/game-screen.component';

export const routes: Routes = [
  { path: '', component: GameScreenComponent },
  { path: '**', redirectTo: '' },
];
