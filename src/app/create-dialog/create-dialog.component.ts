import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataControlService} from '../service/data-control.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {
  new = false;
  form: FormGroup;

  constructor(private _dialog: MatDialogRef<CreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public _data: any, private formB: FormBuilder, private _service: DataControlService) {
    if (_data) {
      this.new = false;
      this.form = this.formB.group({
        id: [_data.id, Validators.required],
        name: [_data.name, Validators.required],
        createDate: [_data.createDate, Validators.required],
        importance: [_data.importance, Validators.required],
        status: [_data.status, Validators.required]
      });
    } else {
      this.new = true;
      this.form = this.formB.group({
        name: ['', Validators.required],
        createDate: [Date.now()],
        importance: [, Validators.required],
        status: ['', Validators.required]
      });
    }
  }

  ngOnInit(): void {
  }

  create() {
    this._dialog.close(this.form.getRawValue());
  }

  update() {
    this._dialog.close(this.form.getRawValue());
  }

}
