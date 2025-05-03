export interface Sale {
    id: number;                   // Unique ID for the sale
    productId: number;            // ID of the product sold
    quantitySold: number;         // Quantity sold
    salePrice: number;            // Sale price per unit (could differ from Inventory sale price)
    totalRevenue: number;         // Total revenue from this sale (quantitySold * salePrice)
    saleDate: Date;               // Date of the sale
  }