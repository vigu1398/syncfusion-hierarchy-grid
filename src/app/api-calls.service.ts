import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService
{

  Message: any = [];
  constructor(private httpClient: HttpClient)
  {

  }

  getData(): any
  {
    let obs = this.httpClient.get("https://poc1.cdfi.co.in/api/elasticsearch");
  }
}
