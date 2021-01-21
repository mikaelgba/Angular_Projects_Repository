import { HqFormComponent } from './../hq-form/hq-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createHQ() {
    const dialogRef = this.dialog.open(HqFormComponent, {width: '500px'});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog form HQ closed');
    });
  }

}
