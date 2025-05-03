import { Routes } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SalesComponent } from './components/sales/sales.component';

export const routes: Routes = [
  { path: '', component: InventoryComponent },
  { path: 'sales', component: SalesComponent },
];