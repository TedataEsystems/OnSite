import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import {ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';
import { OnsiteReportService } from 'src/app/services/onsiteReport.service';
import { GroupSubCat } from 'src/app/Model/GroupSubCat';
import {groupClosure  } from 'src/app/Model/groupClosure';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  countToday:any= 0;
  countCurrentMonth:number= 0;
  countLastMonth:number= 0;
  countCurrentYear:number= 0;

  MttrToday ='';
  MttrCurrentMonth = '';
  MttrLastMonth = '';
  MttrCurrentYear = '';


  isTableExpanded = false;
 
  //SubCat
  searchKeySubCatTbl:string ='' ;
  GroupSubCat: GroupSubCat[] = [];
  displayedColumnsSubCatTbl: string[] = [ 'category', 'subCategory', 'requestCount', 'mttr'];
  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  dataSourceSubCatTbl = new MatTableDataSource();
  columnsToDisplaySubCatTbl: string[] = this.displayedColumnsSubCatTbl.slice();


  //Closure
  searchKeyClosureTbl:string ='' ;
  groupClosure: groupClosure[] = [];
  displayedColumnsClosureTbl: string[] = [ 'closure', 'requestCount', 'mttr'];
  @ViewChild(MatSort) sortClosureTbl?:MatSort ;
  @ViewChild(MatPaginator) paginatorClosureTbl?:MatPaginator ;
  dataSourceClosureTbl = new MatTableDataSource();
  columnsToDisplayClosureTbl: string[] = this.displayedColumnsClosureTbl.slice();

  constructor(private titleService:Title , private onsiteService : OnsiteReportService)

  {

    this.titleService.setTitle("OnSite");

  }


  //SubCat
  pageNumberSubCatTbl = 1;
  pageSizeSubCatTbl = 100;
  sortColumnDefSubCatTbl: string = "requestCount";
  SortDirDefSubCatTbl: string = 'asc';
  public colnameSubCatTbl: string = 'Id';
  public coldirSubCatTbl: string = 'asc';

  getGroubSubCatToday(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.onsiteService.getGroupSubCatToday(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.GroupSubCat = response?.data;
      this.GroupSubCat.length = response?.pagination.totalCount;

      this.dataSourceSubCatTbl = new MatTableDataSource<any>(this.GroupSubCat);
      this.dataSourceSubCatTbl._updateChangeSubscription();
      this.dataSourceSubCatTbl.paginator = this.paginator as MatPaginator;
    })
  }


    onSearchSubCatTblClear(){
      this.searchKeySubCatTbl ='';
      this.applyFilterSubCatTbl();
    }
    applyFilterSubCatTbl(){
      this.dataSourceSubCatTbl.filter=this.searchKeySubCatTbl.trim().toLowerCase();
    }


  //Closure
  pageNumberClosureTbl = 1;
  pageSizeClosureTbl = 100;
  sortColumnDefClosureTbl: string = "requestCount";
  SortDirDefClosureTbl: string = 'asc';
  public colnameClosurebl: string = 'Id';
  public coldirClosureTbl: string = 'asc';
  getClosureToday(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    console.log("Closure")

    this.onsiteService.getGroupClosureToday(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {

      this.groupClosure = response?.data;
      this.groupClosure.length = response?.pagination.totalCount;
      console.log("Closure response",this.groupClosure)
      this.dataSourceClosureTbl = new MatTableDataSource<any>(this.groupClosure);
      this.dataSourceClosureTbl._updateChangeSubscription();
      this.dataSourceClosureTbl.paginator = this.paginatorClosureTbl as MatPaginator;
      console.log(" dataSourceClosureTbl",this.dataSourceClosureTbl);

    })
  }

  onSearchClosureTblClear(){
    this.searchKeyClosureTbl ='';
    this.applyFilterClosureTbl();
  }
  applyFilterClosureTbl(){
    this.dataSourceClosureTbl.filter=this.searchKeyClosureTbl.trim().toLowerCase();
  }



  getToday()
{
  return this.onsiteService.getToday().subscribe(res=>{
    this.countToday = res.count; 
    this.MttrToday = res.mttr;
  });
}

getCurrentMonth() {
  return this.onsiteService.getCurrentMonth().subscribe(res=>{
    this.countCurrentMonth = res.count;
    this.MttrCurrentMonth = res.mttr;
  });
}
getLastMonth() {
  return this.onsiteService.getLastMonth().subscribe(res=>{
    this.countLastMonth = res.count;
    this.MttrLastMonth = res.mttr;
  });
}

getCurrentYear(){
  return this.onsiteService.getCurrentYear().subscribe(res=>{
    this.countCurrentYear = res.count;
    this.MttrCurrentYear = res.mttr;
  });
}

  ngOnInit(){
    this.getToday();
    this.getCurrentMonth();
    this.getLastMonth();
    this.getCurrentYear();
    this.getGroubSubCatToday(1, 100, '', this.sortColumnDefSubCatTbl, this.SortDirDefSubCatTbl);
    this.getClosureToday(1, 100, '', this.sortColumnDefClosureTbl, this.SortDirDefClosureTbl);

  }



  ngAfterViewInit() {

    this.dataSourceSubCatTbl.sort = this.sort as MatSort;
    this.dataSourceSubCatTbl.paginator = this.paginator as MatPaginator;

    this.dataSourceClosureTbl.sort = this.sortClosureTbl as MatSort;
    this.dataSourceClosureTbl.paginator = this.paginatorClosureTbl as MatPaginator;
  
  
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
