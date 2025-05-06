import { Sale } from '../../Models/sales.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InventoryItem } from '../../Models/inventory.model';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  salesRecords: Sale[] = [];
  inventoryItems: InventoryItem[] = [];
  selectedProduct: InventoryItem | null = null;
  quantitySold: number = 1;

  saleDate: Date = new Date();
  salePrice: number = 0;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      const savedSales = localStorage.getItem('salesRecords');
      const savedInventory = localStorage.getItem('inventoryItems');
  
      if (savedSales) {
        this.salesRecords = JSON.parse(savedSales);
        this.salesRecords.forEach(sale => {
          sale.saleDate = new Date(sale.saleDate); 
        });
      }
  
      if (savedInventory) {
        this.inventoryItems = JSON.parse(savedInventory);
        

        this.inventoryItems.forEach(item => {
          item.expirationDate = new Date(item.expirationDate);
        });
  
        console.log('Loaded Inventory:', this.inventoryItems);
      }
    }
  }

  createSale(): void {
    if (!this.selectedProduct) {
      alert('Please select a product.');
      return;
    }
  
    const availableQuantity = this.selectedProduct.quantity ?? 0;
  
    if (availableQuantity === 0) {
      alert(`Not enough stock available! Maximum allowed: ${availableQuantity}`);
      return;
    }
  
    if (this.quantitySold > availableQuantity) {
      alert(`Not enough stock available! Maximum allowed: ${availableQuantity}`);
      this.quantitySold = availableQuantity; // ✅ Auto-adjust to max available stock
      return;
    }
  
    const newSale: Sale = {
      id: this.salesRecords.length + 1,
      productId: this.selectedProduct.productID,
      name: this.selectedProduct.name,
      quantitySold: this.quantitySold,
      salePrice: this.salePrice, // ✅ Use the user-entered sale price
      totalRevenue: this.quantitySold * this.salePrice, // ✅ Calculate revenue based on sale price
      saleDate: this.saleDate
    };
  
    console.log('New Sale:', newSale);
  
    this.salesRecords.push(newSale);
    this.selectedProduct.quantity -= this.quantitySold; // ✅ Reduce inventory stock
  
    this.saveToLocalStorage();
  }
  
  saveToLocalStorage(): void {
    localStorage.setItem('salesRecords', JSON.stringify(this.salesRecords)); 
    localStorage.setItem('inventoryItems', JSON.stringify(this.inventoryItems)); 
  }

  logout(): void {
    this.authService.setLoggedIn(false);
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
  selectedProductId: number | null = null;


  updateSelectedProduct(): void {
    console.log('Selected Product ID Before Conversion:', this.selectedProductId);
  
    if (!this.selectedProductId) {
      alert('Error: No product selected.');
      return;
    }
  
    this.selectedProduct = this.inventoryItems.find(item => item.productID === Number(this.selectedProductId)) || null;
  
    console.log('Selected Product ID After Conversion:', Number(this.selectedProductId));
    console.log('Selected Product:', this.selectedProduct);
  
    if (!this.selectedProduct) {
      alert('Error: Selected product not found in inventory.');
    }
  }
}