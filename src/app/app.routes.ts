import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },

  /* ──────────── Corsi ──────────── */
 {
    path: 'corsi',
    children: [
      {                                         // 1) lista  /docenti
        path: '',
        loadComponent: () =>
          import('./corsi/corsi').then(m => m.Corsi)
      },
      {                                         // 2) nuovo  /docenti/nuovo
        path: 'nuovo',
        loadComponent: () =>
          import('./corsi-new/corsi-new').then(m => m.CorsiNew)
      },
      {                                         // 3) modifica /docenti/:id
        path: ':id',
        loadComponent: () =>
          import('./corsi-new/corsi-new').then(m => m.CorsiNew)
      }
    ]
  },


  /* ──────────── Docenti ──────────── */
  {
    path: 'docenti',
    children: [
      {                                         // 1) lista  /docenti
        path: '',
        loadComponent: () =>
          import('./docenti/docenti').then(m => m.Docenti)
      },
      {                                         // 2) nuovo  /docenti/nuovo
        path: 'nuovo',
        loadComponent: () =>
          import('./docenti-new/docenti-new').then(m => m.DocentiNew)
      },
      {                                         // 3) modifica /docenti/:id
        path: ':id',
        loadComponent: () =>
          import('./docenti-new/docenti-new').then(m => m.DocentiNew)
      }
    ]
  },

  /* ──────────── Discenti ──────────── */
  {
    path: 'discenti',
    children: [
      {                                         // 1) lista  /discenti
        path: '',
        loadComponent: () =>
          import('./discenti/discenti').then(m => m.Discenti)
      },
      {                                         // 2) nuovo  /discenti/nuovo
        path: 'nuovo',
        loadComponent: () =>
          import('./discenti-new/discenti-new').then(m => m.DiscentiNew)
      },
      {                                         // 3) modifica /discenti/:id
        path: ':id',
        loadComponent: () =>
          import('./discenti-new/discenti-new').then(m => m.DiscentiNew)
      }
    ]
  },
  /* ──────────── Fallback ──────────── */
  { path: '**', redirectTo: '' }
];
