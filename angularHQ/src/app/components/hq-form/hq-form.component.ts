import { HqService } from './../../service/hq.service';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hq-form',
  templateUrl: './hq-form.component.html',
  styleUrls: ['./hq-form.component.css']
})
export class HqFormComponent implements OnInit {

  public hqForm: FormGroup;
  public idEdit: string;

  constructor(
    private service: HqService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HqFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.idEdit = data
  }

  ngOnInit(): void {
    this.hqForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      edition: ['', Validators.required],
      author: ['', Validators.required],
      publishingCompany: ['', Validators.required],
      date: ['', Validators.required],
    });
    if( this.idEdit != null ){
      this.getByID();
    }
  }
  getByID(){
    this.service.getHQById(this.idEdit).subscribe(result => {
      this.hqForm = this.fb.group({
        id: [result['id'], Validators.required],
        name: [result['name'], Validators.required],
        edition: [result['edition'], Validators.required],
        author:[result['author'], Validators.required],
        publishingCompany: [result['publishingCompany'], Validators.required],
        date: [result['date'], Validators.required],
      });
    },
    err => {
      console.log('Error', err)
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(){
    if(this.hqForm.value.id == null){
      this.create();
    }else{
      this.update();
    }
  }

  create(){
    this.service.insertHQ(this.hqForm.value).subscribe(result => {
      console.log('HQ Save', result)
    },
    err => {
      console.log('Error', err)
    });
    this.dialogRef.close(true);
    this.hqForm.reset();
    window.location.reload();
  }

  update(){
    this.service.putHQ(this.hqForm.value).subscribe(result => {
      console.log('HQ update', result)
    },
    err => {
      console.log('Error', err)
    });
    this.dialogRef.close(true);
    this.hqForm.reset();
    window.location.reload();
  }
}
