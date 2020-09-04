import { Component } from '@angular/core';
import { ApiCallsService } from './api-calls.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'syncfusion-api';

  constructor(private httpClient: HttpClient)
  {

  }

  ngOnInit(): void
  {
    // let obs = this.httpClient.get("https://poc1.cdfi.co.in/api/elasticsearch");
    // obs.subscribe((response) => console.log(response)

  }
}
