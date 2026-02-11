import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'rick-morty',
    loadComponent: () => import('./rickandmorty/rickandmorty')
      .then(m => m.RickMortyComponent) 
  },
  {
    path: 'json-placeholder',
    loadComponent: () => import('./jsonplaceholder/jsonplaceholder')
      .then(m => m.JsonPlaceholderComponent)  
  },
  {
    path: '',
    redirectTo: '/rick-morty',
    pathMatch: 'full'
  }
];