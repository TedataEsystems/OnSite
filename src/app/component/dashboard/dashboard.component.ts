import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import {ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

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


  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  displayedColumns: string[] = ['id', 'name', 'age', 'address','history'];
  dataSource = new MatTableDataSource(this.TICKETS_DATA);
  constructor(private titleService:Title)

  {

    this.titleService.setTitle("OnSite");

  }
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













//////////line chart//////////////////////
lineChartData: ChartDataSets[] = [
  { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
];

lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

 lineChartOptions:ChartOptions = {
  responsive: true,
};

 lineChartColors: Color[] = [
  {
    borderColor: 'black',
    backgroundColor: 'rgba(255,255,0,0.28)',
  },
];

 lineChartLegend = true;
 lineChartPlugins = [];
 lineChartType:ChartType = 'line';



/////////bar chart/////////////////////////
barChartOptions: ChartOptions = {

  responsive: true,
};
barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];
// barcolors: Color[] = [
//   {
//     backgroundColor: [
//     'red',
//     'orange',
//     'grey'
//     ]
//   }
// ];

public barcolors: Array<any> = [
  { // first color
    backgroundColor:'#d7d7d7',

  },
  { // second color
    backgroundColor: '#80868b',

  },
{
  // thirdcolor
  backgroundColor: '#8e2279',

}];
public barChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Evaluator' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Required' },
  { data: [11, 60, 20, 20, 80, 11, 70], label: 'Average' }
];



}
