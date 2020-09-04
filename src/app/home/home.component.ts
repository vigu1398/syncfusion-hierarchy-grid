import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { HttpClient } from '@angular/common/http';
import { DetailRowService } from '@syncfusion/ej2-angular-grids';
import { PageService } from '@syncfusion/ej2-angular-grids';
import { SelectionService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { VirtualScrollService } from "@syncfusion/ej2-angular-grids";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  count = 5;
  pos = 0;
  childGrid: any;
  childSource: any = [];
  flag1: boolean = false;
  flag2: boolean = false;
  buttonFlag: boolean = false;
  public initialPage: Object;
  dataset: any;
  displayDataset: any = [];
  @ViewChild('grid') public grid: GridComponent;

  constructor(private httpClient: HttpClient, private apiCallsService: ApiCallsService)
  {

  }

  getPosts(): any
  {
    let obs = this.httpClient.get("https://poc1.cdfi.co.in/api/elasticsearch");
    obs.subscribe((response) =>
    {
      this.dataset = response;
      setTimeout(() => this.flag1 = true , 2000);
      for(let i = 0; i < this.dataset.hits.length; i++)
      {
        let post = this.dataset.hits[i]._source;
        this.childSource.push(post);
      }
      // console.log(this.childSource);
      // console.log(this.dataset.hits);
      // console.log(this.childSource.length);
      setTimeout(() => this.flag2 = true, 2000);
      if(this.childSource.length > 0)
      {
        //console.log("Initialsing Child Grid");
        this.childGrid =
        {
          dataSource: this.displayDataset,
          queryString: "_id",
          columns: [
              { field: "Arriving From City", headerText: "Arriving From City", width: "200"},
              { field: "Arriving From City Updated", headerText: "Arriving From City Updated", width: "200"},
              { field: "Daily Symptom Count", headerText: "Daily Symptom Count", width: "200"},
              { field: "Date of Last Contact", headerText: "Date of Last Contact", width: "200"},
              { field: "Destination in Meghalaya with Address", headerText: "Destination in Meghalaya with Address", width: "200"},
              { field: "District", headerText: "District", width: "200"},
              { field: "District_for_GPS", headerText: "District_for_GPS", width: "200"},
              { field: "Family Daily Symptom Count", headerText: "Family Daily Symptom Count", width: "200"},
              { field: "Legit Contact", headerText: "Legit Contact", width: "200"},
              { field: "Name", headerText: "Name", width: "200"},
              { field: "No of Records", headerText: "No of Records", width: "200"},
              { field: "PK", headerText: "PK", width: "200"},
              { field: "Registration Date", headerText: "Registration Date", width: "200"},
              { field: "Source", headerText: "Source", width: "200"},
              { field: "State", headerText: "State", width: "200"},
              { field: "SuspectPhoneNo", headerText: "Suspect Phone Number", width: "200"},
              { field: "SuspectPhoneNo 10Digit", headerText: "SuspectPhoneNo 10Digit", width: "200"},
              { field: "TrendDate", headerText: "Trend Date", width: "200"},
              { field: "TrendDateStr", headerText: "TrendDateStr", width: "200"},
              { field: "TrendDay", headerText: "TrendDay", width: "200"},
              { field: "TrendDay No", headerText: "TrendDay No", width: "200"},
              { field: "TrendMonth", headerText: "TrendMonth", width: "200"},
          ],

        };
        //console.log(this.childGrid);
        //console.log(this.childSource);
      }
    });
  }

  onClick(): void
  {
    console.log("Clicked");
    //console.log(this.displayDataset);
    while(this.count-- && this.pos < this.dataset.hits.length)
    {
      (this.grid.dataSource as object[]).unshift(this.dataset.hits[this.pos]);
      this.pos++;
    }
    this.grid.refresh();
    this.count = 5;

    console.log(this.displayDataset);
    for(var i = 0; i < this.displayDataset.length; i++)
    {
      for(var key in this.childSource[i])
      {
        this.displayDataset[i][key] = this.childSource[i][key];
      }
    }
    console.log(this.displayDataset);
  }

  ngOnInit()
  {
    this.initialPage = { pageSizes: true, pageCount: 4 };
    this.getPosts();
  }
}
