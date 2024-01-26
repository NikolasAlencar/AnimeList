import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then(mod => mod.HomeComponent),
  },
  {
    path: 'anime-detail',
    loadComponent: () =>
      import('./anime-detail/anime-detail.component').then(
        mod => mod.AnimeDetailComponent
      ),
  },
];
