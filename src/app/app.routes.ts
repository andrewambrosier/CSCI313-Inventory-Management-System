import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SalesComponent } from './components/sales/sales.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirect empty path to login
  { path: 'login', component: LoginComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'sales', component: SalesComponent }
];
