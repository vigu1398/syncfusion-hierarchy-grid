import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { DetailRowService } from '@syncfusion/ej2-angular-grids';
import { PageService } from '@syncfusion/ej2-angular-grids';
//import { HttpClientJsonpModule } from '@angular/common/http';
import { VirtualScrollService } from "@syncfusion/ej2-angular-grids";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    //HttpClientJsonpModule
    HttpClientModule,
  ],
  providers: [DetailRowService, PageService, VirtualScrollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
