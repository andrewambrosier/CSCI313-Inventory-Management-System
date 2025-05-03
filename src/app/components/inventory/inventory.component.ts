import { Component } from '@angular/core';
import { InventoryItem } from '../../Models/inventory.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-inventory',
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  // Array containing inventory items with predefined properties

  inventoryItems: InventoryItem[] = [
    {
      id: 1, name: 'Tractor', quantity: 2, restockThreshold: 1, costPrice: 25000, salePrice: 30000,
      productID: 101, maxStock: 10, expirationDate: new Date('2030-12-22'), category: 'Equipment'
    },
    { id: 2, name: 'compost', quantity: 20, restockThreshold: 5, costPrice:15, salePrice: 25, productID: 102, maxStock: 40,
      expirationDate: new Date('2025-08-15'), category: 'Fertilizer'
    }

  ];
  // Function to calculate stock percentage for progress bars

  getStockPercentage(item: InventoryItem): number {
    return (item.quantity / item.maxStock) * 100; // makes a percentage so we can have progress bars
  }
  // Object representing a new inventory item before it is added

  newItem: InventoryItem = {
    id: 0, productID: 0, name: '', quantity: 0, restockThreshold: 0,
    costPrice: 0, salePrice: 0, maxStock: 100, expirationDate: new Date(),
    category: ''
  };
  // Function to add a new inventory item to the list

  addSupply() {
    this.inventoryItems.push({ ...this.newItem });
    console.log('New supply added:', this.newItem);
    this.newItem = { id: 0, productID: 0, name: '', quantity: 0, restockThreshold: 0,
      costPrice: 0, salePrice: 0, maxStock: 100, expirationDate: new Date(), category: ''
    }; 
  }

  isEditing = false;
  editIndex: number | null = null;

  editSupply(item: any) {
    this.isEditing = true;
    this.editIndex = this.inventoryItems.findIndex(i => i.id === item.id);
    this.newItem = {...item};
  }

  updateSupply() {
    if (this.editIndex !== null){
      this.inventoryItems[this.editIndex] = {...this.newItem};
      console.log('Supply updates:', this.newItem);
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editIndex = null;
    this.newItem = { id: 0, productID: 0, name: '', quantity: 0, restockThreshold: 0,
      costPrice: 0, salePrice: 0, maxStock: 100, expirationDate: new Date(), category: ''
    }; 
  }

  selectedCategory: string | null = null;
  searchTerm: string = '';

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  getFilteredItems() {
    return this.inventoryItems.filter(item => {
      const matchesCategory =
        !this.selectedCategory || item.category === this.selectedCategory;
      const matchesSearch =
        !this.searchTerm ||
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
}
