import { Component } from '@angular/core';
import { InventoryItem } from '../../Models/inventory.model';

@Component({
  selector: 'app-inventory',
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  inventoryItems: InventoryItem[] = [
    {
      id: 1, name: 'Tractor', quantity: 2, restockThreshold: 1, costPrice: 25000, salePrice: 30000,
      productID: 101
    },
    { id: 2, name: 'Fertilizer', quantity: 20, restockThreshold: 5, costPrice:15, salePrice: 25, productID: 102}

  ];
}
