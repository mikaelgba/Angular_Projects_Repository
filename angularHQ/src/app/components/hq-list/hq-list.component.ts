import { DeleteComponent } from './../delete/delete.component';
import { HqFormComponent } from './../hq-form/hq-form.component';
import { MatDialog } from '@angular/material/dialog';
import { HqService } from './../../service/hq.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';

@Component({
  selector: 'app-hq-list',
  templateUrl: './hq-list.component.html',
  styleUrls: ['./hq-list.component.css']
})
export class HqListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'edition', 'author', 'publishingCompany', 'date', 'action'];
  hqs = [];
  length: number;
  totalRecordsPerPage: number = 10;
  hqNameFind: string;
  hqDateFind: string;

  constructor(
    private service: HqService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllHQ(0, 'date', null);
  }

  getAllHQ(pageNumber: number, sortField: string, filters: string) {
    this.service.getAllHQ(pageNumber, this.totalRecordsPerPage, sortField, filters).subscribe(hqReturn => {
      this.hqs = hqReturn['hqs']
      this.length = hqReturn['page'].size;
    }, err => {
      console.log('error', err);
      console.log('error status', err.status);
      console.log('error error', err.error);
      console.log('error headers', err.headers);
    });
  }

  getServerData(event?:PageEvent){
    this.getAllHQ(event.pageIndex, 'date', null);
  }

  findByParameter(){
    let filters = '';

    if(this.hqNameFind != null  && this.hqNameFind != ''){
      filters+= 'name='+this.hqNameFind;
    }

    if(this.hqDateFind != null) {
      if(filters != ''){
        filters+= ';';
      }

      let newDate: moment.Moment = moment.utc(this.hqDateFind).local();
      filters+= 'date='+newDate.format("YYYY-MM-DDTHH:mm:ss")+'.000Z';
    }
    this.getAllHQ(0,'meetingDate',filters);
  }

  edit(idEdit:string){
    const dialogRef = this.dialog.open(HqFormComponent, {width: '500px', data: idEdit});
    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed.");
    });
  }

  deleteHQByID(idDelete:string){
    const dialogRef = this.dialog.open(DeleteComponent, {width: '500px', data: idDelete});
    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed.");
    });
  }
}
