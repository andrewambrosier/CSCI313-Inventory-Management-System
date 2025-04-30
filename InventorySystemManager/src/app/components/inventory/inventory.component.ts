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
      productID: 101, maxStock: 10, expirationDate: new Date('2030-12-22'), category: 'Equipment'
    },
    { id: 2, name: 'compost', quantity: 20, restockThreshold: 5, costPrice:15, salePrice: 25, productID: 102, maxStock: 40,
      expirationDate: new Date('2025-08-15'), category: 'Fertilizer'
    }

  ];
  getStockPercentage(item: InventoryItem): number {
    return (item.quantity / item.maxStock) * 100; // makes a percentage so we can have progress bars
  }
}
