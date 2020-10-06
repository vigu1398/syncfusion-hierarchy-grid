import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { HttpClient } from '@angular/common/http';
import { FilterService, GridComponent, PdfExportProperties } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FilterService],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit
{
  col = 0;
  width = 200;
  columnItem: object;
  childColumnSource = [];
  keysArray = [];
  columnSource = [];
  count = 100000;
  pos = 0;
  childGrid: any;
  childSource: any = [];
  flag1: boolean = false;
  flag2: boolean = false;
  buttonFlag: boolean = false;
  public toolbar1: string[];
  public toolbar: string[];
  public initialPage: Object;
  dataset: any;
  displayDataset: any = [];
  @ViewChild('grid') public grid: GridComponent;
  flag3: boolean;
  lines: string;
  ddlfields: { text: string; value: string; };
  d1data: { id: string; type: string; }[];

  constructor(private httpClient: HttpClient, private apiCallsService: ApiCallsService)
  {

  }

  getPosts(): any
  {
    this.columnSource = [""];
    let obs = this.httpClient.get("https://poc.cdfi.co.in/api/elasticsearch");
    obs.subscribe((response) =>
    {

      for(var key in response["hits"][0]._source)
      {
        console.log(key);
        this.childColumnSource.push(
        {
          "field": key,
          "headerText": key,
          "width": this.width
        });
      }

      console.log(this.childColumnSource);
      this.columnSource = Object.keys(response["hits"][0]);
      this.flag3 = true;

      this.dataset = response;
      for(let i = 0; i < this.dataset.hits.length; i++)
      {
        let post = this.dataset.hits[i]._source;
        this.childSource.push(post);
      }
      setTimeout(() => this.flag2 = true, 2000);
      if(this.childSource.length > 0)
      {
        this.childGrid =
        {
          dataSource: this.displayDataset,
          queryString: "_id",
          columns: this.childColumnSource
        };
      }
    });
  }

  Load(): void
  {
    console.log("Clicked");
    //console.log(this.displayDataset);
    while(this.count-- && this.pos < this.dataset.hits.length)
    {
      (this.grid.dataSource as object[]).unshift(this.dataset.hits[this.pos]);
      this.pos++;
    }
    this.grid.refresh();
    this.count = 100000;

    //console.log(this.displayDataset);
    for(var i = 0; i < this.displayDataset.length; i++)
    {
      for(var key in this.childSource[i])
      {
        this.displayDataset[i][key] = this.childSource[i][key];
      }
    }

    this.flag2 = false;
  }


  ngOnInit()
  {
    this.columnItem = {field: "", headerText: "", width: this.width};
    this.toolbar = ['Print', 'PdfExport', 'Search', 'ExcelExport', 'ColumnChooser'];
    this.lines = 'Vertical';
    this.ddlfields = { text: 'type' , value: 'id'};
    this.d1data= [{ id: 'Horizontal', type: 'Horizontal' },
                  { id: 'Vertical', type: 'Vertical' },
                  { id: 'Both', type: 'Both' },
                  { id: 'None', type: 'None' }];
    this.getPosts();

    // this.childColumnSource =  [
    //   { field: "agebracket", headerText: "Age Bracket", width: "200"},
    //   { field: "contractedfromwhichpatientsuspected", headerText: "contractedfromwhichpatientsuspected", width: "200"},
    //   { field: "currentstatus", headerText: "currentstatus", width: "200"},
    //   { field: "dateannounced", headerText: "dateannounced", width: "200"},
    //   { field: "detectedcity", headerText: "detectedcity", width: "200"},
    //   { field: "detecteddistrict", headerText: "detecteddistrict", width: "200"},
    //   { field: "detectedstate", headerText: "detectedstate", width: "200"},
    //   { field: "entryid", headerText: "entryid", width: "200"},
    //   { field: "gender", headerText: "gender", width: "200"},
    //   { field: "nationality", headerText: "nationality", width: "200"},
    //   { field: "notes", headerText: "notes", width: "200"},
    //   { field: "numcases", headerText: "numcases", width: "200"},
    //   { field: "patientnumber", headerText: "patientnumber", width: "200"},
    //   { field: "source1", headerText: "source1", width: "200"},
    //   { field: "source2", headerText: "source2", width: "200"},
    //   { field: "source3", headerText: "source3", width: "200"},
    //   { field: "statecode", headerText: "statecode", width: "200"},
    //   { field: "statepatientnumber", headerText: "statepatientnumber", width: "200"},
    //   { field: "statuschangedate", headerText: "statuschangedate", width: "200"},
    //   { field: "typeoftransmission", headerText: "typeoftransmission", width: "200"},
    //   { field: "path_id", headerText: "path_id", width: "200"},
    //   { field: "url", headerText: "url", width: "200"},
    //   { field: "Lockdown Phases", headerText: "Lockdown Phases", width: "200"},
    //   { field: "detectedstate_corrected", headerText: "detectedstate_corrected", width: "200"},
    //   { field: "Primary_Key", headerText: "Primary_Key", width: "200"},
    //   { field: "Announced Month", headerText: "Announced Month", width: "200"},
    //   { field: "Announced Day", headerText: "Announced Day", width: "200"},
    //   { field: "Announced Date LOV", headerText: "Announced Date LOV", width: "200"},
    //   { field: "Country", headerText: "Country", width: "200"},
    //   { field: "Source_file", headerText: "Source_file", width: "200"},
    // ]
  }

  toolbarClick(args: ClickEventArgs) 
  {
    console.log("Click Event");
    if (args.item.text === 'PDF Export') 
    {
      this.grid.pdfExport({hierarchyExportMode: 'All'});
    }

    if(args.item.text == 'Excel Export')
    {
      this.grid.excelExport({hierarchyExportMode: 'All'});
    }
  }

    //Handling grid lines change and reflection it back to the tree grid
    change (e: ChangeEventArgs) : void 
    {
      let lines: any = <string>e.value;
      this.grid.gridLines = lines;
      this.grid.refresh();
    }

}
