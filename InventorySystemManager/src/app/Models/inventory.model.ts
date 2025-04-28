export interface InventoryItem {
    id: number;
    productID: number;          //specific item id
    name: string;
    quantity: number;
    restockThreshold: number;   //Threshold to trigger restock
    costPrice: number;          //Cost per unit
    salePrice: number;          //Sales price per unit
  }