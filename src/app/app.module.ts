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
