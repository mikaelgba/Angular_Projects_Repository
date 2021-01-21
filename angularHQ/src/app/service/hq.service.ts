import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HqService {

  MOBILE_BASS_URL: string = "https://mobilebaas.com/backend/api/manage/db";
  tableName: string = "hqs";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'MOBILEBAASKEY' : 'MTYxMTI0ODc4MDMwMk1pY2hhZWwgVWV3ZXJ0b24gVC4gT2xpdmVpcmE='
    })
  };
  constructor(private http: HttpClient) { }

  insertHQ(hq: any){
    return this.http.post(this.MOBILE_BASS_URL + '?table=' + this.tableName, hq, this.httpOptions);
  }
  putHQ(hq: any){
    return this.http.put(this.MOBILE_BASS_URL + '?table=' + this.tableName, hq, this.httpOptions);
  }
  deleteHQ(id: string){
    return this.http.delete(this.MOBILE_BASS_URL + '/' + id  + '?table=' + this.tableName, this.httpOptions);
  }
  getHQById(id: string){
    return this.http.get(this.MOBILE_BASS_URL + '/' + id  + '?table=' + this.tableName, this.httpOptions);
  }
  getAllHQ(pageNumber: number, totalRecordsPerPage: number, sortField: string, filters: string){

    let parameters = '?table=' + this.tableName;

    if(pageNumber != null){
      parameters += '&pageNumber=' + pageNumber;
    }
    if(totalRecordsPerPage != null){
      parameters += '&totalRecordsPerPage=' + totalRecordsPerPage;
    }
    if(sortField != null){
      parameters += '&sortField=' + sortField;
    }
    if(filters != null){
      parameters += '&filters=' + filters;
    }
    return this.http.get(this.MOBILE_BASS_URL + '/find' + parameters, this.httpOptions);
  }
}
