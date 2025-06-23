
import { Routes } from '@angular/router';

import { Proyectos }    from './pages/proyectos/proyectos';
import { Servicios }    from './pages/servicios/servicios';
import { Staff }        from './pages/staff/staff';
import { Contacto }     from './pages/contacto/contacto';
import { PageNotFound } from './pages/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '',           redirectTo: '/proyectos', pathMatch: 'full' },
  { path: 'proyectos',  component: Proyectos },
  { path: 'servicios',  component: Servicios },
  { path: 'staff',      component: Staff },
  { path: 'contacto',   component: Contacto },
  { path: '**',         component: PageNotFound },
];
