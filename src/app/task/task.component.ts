import { Component, OnInit } from '@angular/core';
import {DataControlService} from '../service/data-control.service';
import {MatDialog} from '@angular/material/dialog';
import {error} from '@angular/compiler/src/util';
import {CreateDialogComponent} from '../create-dialog/create-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  filterStatus = '';
  filterImportance = '';

  formStatus: FormGroup;
  formImportance: FormGroup;
  // formName: FormGroup;
  //
  // sortName = '';

  limit = 3;
  page = 0;

  dataTask = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'createDate', 'importance', 'status', 'action'];

  constructor(private _service: DataControlService, private _dialog: MatDialog, private formS: FormBuilder, private formI: FormBuilder, private formN: FormBuilder) {
    this.formStatus = this.formS.group({
      status: ['']
    });

    this.formImportance = this.formI.group({
      importance: []
    });

    // this.formName = this.formN.group({
    //   name: ['']
    // });
  }

  ngOnInit(): void {
    this.getTask();
  }

  setFilterAndSort() {
    console.log(this.filterImportance);
    let str = '_page=' + this.page + '&_limit=' + this.limit;
    if (this.filterStatus !== '' && this.filterStatus !== null && this.filterStatus !== 'none') {
      str += '&status=' + this.filterStatus;
    }
    if (this.filterImportance !== '' && this.filterImportance !== null) {
      str += '&importance=' + this.filterImportance;
    }
    return str;
  }

  setFilterStatus() {
    this.filterStatus = this.formStatus.getRawValue().status;
    this._service.getAllTasks(this.setFilterAndSort()).subscribe( res => {
      this.dataTask = res;
    });
  }

  setFilterImportance() {
    this.filterImportance = this.formImportance.getRawValue().importance;
    this._service.getAllTasks(this.setFilterAndSort()).subscribe( res => {
      this.dataTask = res;
    });
  }

  // setSortName() {
  //   this.sortName = this.formName.getRawValue().name;
  // }

  changeTableList(event) {
      this.limit = event.pageSize;
      this._service.getAllTasks(this.setFilterAndSort()).subscribe(res => {
        this.dataTask = res;
      });
  }

  getTask() {
    this._service.getAllTasks(this.setFilterAndSort()).subscribe(res => {
      this.dataTask = res;
    });
  }

  delete(id) {
    this._service.deleteTask(id).subscribe(res => {
      this.getTask();
    }, error => {
      console.error(error);
    });
  }

  // update
  update(task: any) {
    this._dialog.open(CreateDialogComponent, {
      width: '450px',
      data: task
    }).afterClosed().subscribe(res => {
      this._service.updateTask(res).subscribe(result =>
        this.getTask());
    });
  }

  // create
  create() {
    this._dialog.open(CreateDialogComponent, {
      width: '450px',
    }).afterClosed().subscribe( res => {
      this._service.createTask(res).subscribe( result => {
        this.getTask();
      });
    });
  }

  filterOne(event) {
    console.log(event);
    this.filterStatus = event.valueOf();
  }
}
