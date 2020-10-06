import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColumnChooser, QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ChangeEventArgs} from '@syncfusion/ej2-angular-dropdowns';
import { ColumnChooserService, TreeGridComponent , ToolbarService, PageService, ExcelExportService, PdfExportService, FilterService, VirtualScrollService, ResizeService, ReorderService, SortService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  providers: [ ColumnChooserService, SortService, ReorderService, ResizeService, ToolbarService, PageService, ExcelExportService, PdfExportService, FilterService, VirtualScrollService]
})

export class TreeComponent implements OnInit 
{
  @ViewChild('treegrid') public treegrid: TreeGridComponent;
  columnSource = [];
  logCount = 0;
  count = 0;
  pos = 0;
  childGrid: any;
  childSource: any = [];
  flag1: boolean = false;
  flag2: boolean = false;
  buttonFlag: boolean = false;
  public initialPage: Object;
  dataset: any;
  displayDataset: any = [];
  posts: any = [];
  public toolbar: string[];
  searchSettings: { hierarchyMode: string; };
  public d1data: Object;
  public ddlfields: Object;
  public lines: string;

  constructor(private httpClient: HttpClient) 
  {

  }

  getPosts()
  {
    let obs = this.httpClient.get("https://poc.cdfi.co.in/api/elasticsearch");
    obs.subscribe((response) => 
    {
      console.log(response["hits"][0]._source);
      this.columnSource = Object.keys(response["hits"][0]._source);
      
      this.dataset = response;
      for(let i = 0; i < this.dataset.hits.length; i++)
      {
        let post = this.dataset.hits[i]._source;
        this.childSource.push(post);
      }
      for(let i = 0; i < this.childSource.length; i += 100)
      {
        this.displayDataset.push(this.childSource[i]);
        this.displayDataset[this.pos++]["subtask"] = [];
      }
      
      var j = 0;
      for(var i = 0; i < this.displayDataset.length; i++)
      {
        for(this.count = 1; j < this.childSource.length, this.count < 100; j++, this.count++)
        {
          if(this.childSource[j].hasOwnProperty("subtask"))
          {
            continue;
          }
          else
          {
            this.displayDataset[i]["subtask"].push(this.childSource[j]);
          }
        }
      }

      this.flag1 = true;
    });
  }

  // Conditional Formatting section
  queryCellInfo (args: QueryCellInfoEventArgs) 
  {
    if(this.logCount < 4)
    {
      console.log(args.cell.attributes[3].nodeValue.includes("currentstatus"));
    }

    // To add red color to cells with Hospitalized value and with the column name currentstatus

    if((args.cell.innerHTML) == "Hospitalized" && args.cell.attributes[3].nodeValue.includes("currentstatus"))
    {
      args.cell.setAttribute('style', 'background-color:#7b2b1d;color:white;');
    }

    // To add green color to cells with Hospitalized value and with the column name currentstatus
    else if(args.cell.innerHTML == "Recovered" && args.cell.attributes[3].nodeValue.includes("currentstatus"))
    {
      args.cell.setAttribute('style', 'background-color:#336c12;color:white;');
    }

    // To add red color to cells with Deceased value and with the column name currentstatus
    else if(args.cell.innerHTML == "Deceased" && args.cell.attributes[3].nodeValue.includes("currentstatus"))
    {
      args.cell.setAttribute('style', 'background-color:#7b2b1d;color:white;');
    }
    this.logCount++;
  }
  
  ngOnInit(): void 
  {
    this.columnSource = [""];
    this.toolbar = ['Print', 'ExcelExport', 'PdfExport', 'CsvExport', 'Search', 'ColumnChooser', 'ExpandAll', 'CollapseAll'];
    this.getPosts();
    this.lines = 'Vertical';
    this.ddlfields = { text: 'type' , value: 'id'};
    this.d1data= [{ id: 'Horizontal', type: 'Horizontal' },
                  { id: 'Vertical', type: 'Vertical' },
                  { id: 'Both', type: 'Both' },
                  { id: 'None', type: 'None' }]
  }

  //Exports handling section
  public toolbarClick(args: ClickEventArgs): void 
  {
    console.log("Toolbar Clicked");
    switch (args.item.text) 
    {
        case 'PDF Export':
            this.treegrid.pdfExport();
            break;
        case 'Excel Export':
            this.treegrid.excelExport();
            break;
        case 'CSV Export':
            this.treegrid.csvExport();
            break;
    }
  }

  //Handling grid lines change and reflection it back to the tree grid
  change (e: ChangeEventArgs) : void 
  {
    let lines: any = <string>e.value;
    this.treegrid.gridLines = lines;
    this.treegrid.refresh();
  }

}
