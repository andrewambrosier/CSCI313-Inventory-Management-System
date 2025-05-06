import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryItem } from '../../Models/inventory.model';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryItem[] = [
    {
      id: 1, name: 'Tractor', quantity: 2, restockThreshold: 1, costPrice: 25000, salePrice: 30000,
      productID: 101, maxStock: 10, expirationDate: new Date('2030-12-22'), category: 'Equipment'
    },
    {
      id: 2, name: 'Compost', quantity: 20, restockThreshold: 5, costPrice: 15, salePrice: 25,
      productID: 102, maxStock: 40, expirationDate: new Date('2025-08-15'), category: 'Fertilizer'
    }
  ];

  newItem: InventoryItem = this.getEmptyItem();
  isEditing = false;
  editIndex: number | null = null;
  selectedCategory: string = '';
  searchTerm: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      const saved = localStorage.getItem('inventoryItems');
      if (saved) {
        this.inventoryItems = JSON.parse(saved);
        // Convert expirationDate strings to Date objects
        this.inventoryItems.forEach(item => {
          item.expirationDate = new Date(item.expirationDate);
        })
      }
    }
  }

  getEmptyItem(): InventoryItem {
    return {
      id: 0, name: '', quantity: 0, restockThreshold: 0, costPrice: 0, salePrice: 0,
      productID: 0, maxStock: 100, expirationDate: new Date(), category: ''
    };
  }

  getStockPercentage(item: InventoryItem): number {
    return Math.round((item.quantity / item.maxStock) * 100);
  }

  getFilteredItems(): InventoryItem[] {
    return this.inventoryItems.filter(item => {
      const matchesCategory = !this.selectedCategory || item.category === this.selectedCategory;
      const matchesSearch = !this.searchTerm || item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  addSupply(): void {
    this.newItem.id = this.inventoryItems.length + 1;
    this.inventoryItems.push({ ...this.newItem });
    this.saveToLocalStorage();
    this.resetForm();
  }

  editSupply(item: InventoryItem): void {
    this.isEditing = true;
    this.editIndex = this.inventoryItems.findIndex(i => i.id === item.id);
    this.newItem = { ...item };
  }

  updateSupply(): void {
    if (this.editIndex !== null) {
      this.inventoryItems[this.editIndex] = { ...this.newItem };
      this.saveToLocalStorage();
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editIndex = null;
    this.resetForm();
  }

  deleteSupply(item: InventoryItem): void {
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) {
      return;
    }
    this.inventoryItems = this.inventoryItems.filter(i => i.id !== item.id);
    localStorage.setItem('inventoryItems', JSON.stringify(this.inventoryItems));
  }

  resetInventory(): void {
    const confirmReset = confirm('Are you sure you want to reset the inventory?');
    if (confirmReset) {
      this.inventoryItems = [];
      this.saveToLocalStorage();
    }
    
  }

  resetForm(): void {
    this.newItem = this.getEmptyItem();
  }

  saveToLocalStorage(): void {
    localStorage.setItem('inventoryItems', JSON.stringify(this.inventoryItems));
  }
}
