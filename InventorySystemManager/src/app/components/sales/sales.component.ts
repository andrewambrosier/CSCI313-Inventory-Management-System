import { Component } from '@angular/core';
import { Sale } from '../../Models/sales.model';

@Component({
  selector: 'app-sales',
  imports: [],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  salesRecords: Sale[] = [
    {id: 1, productId: 101, quantitySold: 1, salePrice: 30000
      , totalRevenue: 30000, saleDate: new Date('03/15/2025')
    },
    {id: 2, productId: 102, quantitySold: 5, salePrice: 25
      , totalRevenue: 125, saleDate: new Date('02/01/2025')
    }
  ]
}
