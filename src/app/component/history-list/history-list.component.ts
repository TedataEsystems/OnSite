import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { EditComponent } from '../edit/edit.component';
@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HistoryListComponent implements OnInit {
  searchKey:string ='' ;
  isTableExpanded = false;
  TICKETS_DATA = [
    {
      "id": 1,
      "name": "Abby Jaskolski ",
      "age": 21,
      "address": 1.0079,
      "isExpanded": false,
      "subjects": [
        {
          "name": "Bio",
          "type": "Medical",
          "grade": "A"
        }
      ]
    },
    {
      "id": 2,
      "name": "Jabari Fritsch",
      "age": 20,
      "address": 1.0079,
      "isExpanded": false,
      "subjects": [
        {
          "name": "Bio",
          "type": "Medical",
          "grade": "A"
        }

      ]
    },
    {
      "id": 3,
      "name": "Maybell Simonis",
      "age": 21,
      "address": 1.0079,
      "isExpanded": false,
      "subjects": [
        {
          "name": "Bio",
          "type": "Medical",
          "grade": "A"
        }

      ]
    }
  ];


  constructor(private titleService:Title)

  {

    this.titleService.setTitle(" Home");

  }


  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  displayedColumns: string[] = ['id' ,'elementId','descirption', 'parentType', 'actionType', 'userName','creationDate'];
  dataSource = new MatTableDataSource(this.TICKETS_DATA);
  // searchKey!:string;

  ngOnInit(){

  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;}

    onSearchClear(){
      this.searchKey ='';
      this.applyFilter();
    }
    applyFilter(){
      this.dataSource.filter=this.searchKey.trim().toLowerCase();
    }

lastcol: string = 'Id';
lastdir: string = 'asc';

sortData(sort: any) {

    window.location.reload();
  if (this.lastcol == sort.active && this.lastdir == sort.direction) {
    if (this.lastdir == 'asc')
      sort.direction = 'desc';
    else
      sort.direction = 'asc';
  }
  this.lastcol = sort.active; this.lastdir = sort.direction;


}


toggleTableRows() {
  this.isTableExpanded = !this.isTableExpanded;

  this.dataSource.data.forEach((row: any) => {
    row.isExpanded = this.isTableExpanded;
  })
}


}
