import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewContactComponent } from './new-contact/new-contact.component';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-contact', component: NewContactComponent }
];
