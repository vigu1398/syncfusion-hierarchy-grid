import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FreezeService, GridModule, ReorderService, SortService } from '@syncfusion/ej2-angular-grids';
import { DetailRowService } from '@syncfusion/ej2-angular-grids';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { VirtualScrollService } from "@syncfusion/ej2-angular-grids";
import { PageService} from '@syncfusion/ej2-angular-treegrid';
import { AggregateService } from '@syncfusion/ej2-angular-grids';
import { ToolbarService } from '@syncfusion/ej2-angular-grids';
import { InfiniteScrollService} from '@syncfusion/ej2-angular-grids';
import { ExcelExportService, PdfExportService,GroupService, FilterService, ResizeService, ColumnChooserService} from '@syncfusion/ej2-angular-grids';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TreeComponent } from './tree/tree.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TreeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    //HttpClientJsonpModule
    HttpClientModule,
    TreeGridModule,
    DropDownListModule,
  ],
  providers: [FreezeService, ReorderService, ResizeService, FilterService, ColumnChooserService, ExcelExportService, PdfExportService, DetailRowService,GroupService, PageService, VirtualScrollService, SortService, FilterService, AggregateService, ToolbarService, InfiniteScrollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
