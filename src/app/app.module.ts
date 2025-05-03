import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { routes } from './app.routes'; 

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), 
    FormsModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';              // Needed for ngModel
import { CommonModule } from '@angular/common';            //  Needed for *ngIf
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LoginComponent } from './components/login/login.component'; 
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    LoginComponent          
  ],
  imports: [
    BrowserModule,
    CommonModule,           
    FormsModule,            
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
