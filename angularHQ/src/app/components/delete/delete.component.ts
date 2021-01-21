import { HqFormComponent } from './../hq-form/hq-form.component';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HqService } from 'src/app/service/hq.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public idDelete: string;

  constructor(
    private service: HqService,
    public dialogRef: MatDialogRef<HqFormComponent>,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string,
  ) { this.idDelete = data }

  ngOnInit(): void {
  }

  deleteHQ(){
    this.service.deleteHQ(this.idDelete).subscribe(result => {
      console.log('Resp Delete', result);
    },
    err => {
      console.log('Error ', err);
    });
    this.dialogRef.close(true);
    window.location.reload();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
