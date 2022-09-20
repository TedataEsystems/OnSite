import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { listClosureCountMttrToday } from 'src/app/Model/listClosureCountMttrToday';
import { listSubCatCountMttrToday } from 'src/app/Model/listSubCatCountMttrToday';
import { NotificationMsgService } from 'src/app/services/notification-msg.service';
import { OnsiteReportService } from 'src/app/services/onsiteReport.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  loader: boolean = false;
  listSubCatCountMttrToday: listSubCatCountMttrToday[] = [];
  sortColumnDef: string = "RequestCount";
  SortDirDef: string = 'asc';

  listClosureCountMttrToday: listClosureCountMttrToday[] = [];
  closure_sortColumnDef: string = "RequestCount";
  closure_SortDirDef: string = 'asc';


  countToday: any = 0;
  countCurrentMonth: number = 0;
  countLastMonth: number = 0;
  countCurrentYear: number = 0;

  MttrToday = '';
  MttrCurrentMonth = '';
  MttrLastMonth = '';
  MttrCurrentYear = '';

  closure_searchKey: string = '';
  searchKey: string = '';
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


  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @ViewChild(MatSort) closure_sort?: MatSort;
  @ViewChild('closure_MatPaginator') closure_paginator?: MatPaginator;

  displayedColumns: string[] = ['Category', 'SubCategory', 'RequestCount', 'Mttr'];
  dataSource = new MatTableDataSource(this.listSubCatCountMttrToday);

  closure_displayedColumns: string[] = ['closureReason', 'RequestCount', 'Mttr'];
  closure_dataSource = new MatTableDataSource(this.listClosureCountMttrToday);
  // displayedColumns: string[] = ['id', 'name', 'age', 'address','history'];
  // dataSource = new MatTableDataSource(this.TICKETS_DATA);
  constructor(private titleService: Title, private onsiteService: OnsiteReportService,
    private notificationService: NotificationMsgService) {

    this.titleService.setTitle("OnSite");

  }
  getToday() {
    return this.onsiteService.getToday().subscribe(res => {
      this.countToday = res.count;
      this.MttrToday = res.mttr;
    });
  }

  getCurrentMonth() {
    return this.onsiteService.getCurrentMonth().subscribe(res => {
      this.countCurrentMonth = res.count;
      this.MttrCurrentMonth = res.mttr;
    });
  }
  getLastMonth() {
    return this.onsiteService.getLastMonth().subscribe(res => {
      this.countLastMonth = res.count;
      this.MttrLastMonth = res.mttr;
    });
  }

  getCurrentYear() {
    return this.onsiteService.getCurrentYear().subscribe(res => {
      this.countCurrentYear = res.count;
      this.MttrCurrentYear = res.mttr;
    });
  }
  getRequestdataBySubCategory(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.onsiteService.getSubCatCountMttrToday(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.listSubCatCountMttrToday = response?.data;
      this.listSubCatCountMttrToday.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.listSubCatCountMttrToday);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })
    setTimeout(() => this.loader = false, 2000);
  }

  getRequestdataByClosureReason(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.onsiteService.getClosureCountMttrToday(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.listClosureCountMttrToday = response?.data;
      this.listClosureCountMttrToday.length = response?.pagination.totalCount;
      this.closure_dataSource = new MatTableDataSource<any>(this.listClosureCountMttrToday);
      this.closure_dataSource._updateChangeSubscription();
      this.closure_dataSource.paginator = this.closure_paginator as MatPaginator;
    })
    setTimeout(() => this.loader = false, 2000);
  }
  ngOnInit() {
    this.getRequestdataBySubCategory(1, 25, '', this.sortColumnDef, this.SortDirDef);
    this.getRequestdataByClosureReason(1, 25, '', this.closure_sortColumnDef, this.closure_SortDirDef);
    this.getToday();
    this.getCurrentMonth();
    this.getLastMonth();
    this.getCurrentYear();
    this.GetCountOverYear();

  }



  ngAfterViewInit() {

    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;

    this.closure_dataSource.sort = this.closure_sort as MatSort;
    this.closure_dataSource.paginator = this.closure_paginator as MatPaginator;

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  closure_onSearchClear() {
    this.closure_searchKey = '';
    this.closure_applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  // applyFilter() {
  //   let searchData = this.searchKey.trim().toLowerCase();
  //   this.getRequestdataBySubCategory(1, 25, searchData, this.sortColumnDef, "asc");
  // }
  closure_applyFilter() {
    this.closure_dataSource.filter = this.closure_searchKey.trim().toLowerCase();
    // let searchData = this.closure_searchKey.trim().toLowerCase();
    // this.getRequestdataByClosureReason(1, 25, searchData, this.closure_sortColumnDef, "asc");
  }

  //this section for pagination
  pageIn = 0;
  previousSizedef = 25;
  pagesizedef: number = 25;
  public pIn: number = 0;
  pageChanged(event: any) {
    debugger;
    this.loader = true;
    this.pIn = event.pageIndex;
    this.pageIn = event.pageIndex;
    this.pagesizedef = event.pageSize;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.previousSizedef = previousSize;
    this.getRequestdataNext(previousSize, pageIndex + 1, pageSize, '', this.sortColumnDef, this.SortDirDef);
  }
  getRequestdataNext(cursize: number, pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {

    this.onsiteService.getSubCatCountMttrToday(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
      if (res.status == true) {

        this.listSubCatCountMttrToday.length = cursize;
        this.listSubCatCountMttrToday.push(...res?.data);
        this.listSubCatCountMttrToday.length = res?.pagination.totalCount;
        this.dataSource = new MatTableDataSource<any>(this.listSubCatCountMttrToday);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator as MatPaginator;
        this.loader = false;
      }
      else this.notificationService.warn(res.error)
    }, err => {
      this.notificationService.warn("! Fail");
      this.loader = false;

    })


  }
  lastcol: string = 'Id';
  lastdir: string = 'asc';

  sortData(sort: any) {
    if (this.pIn != 0)
      window.location.reload();
    if (this.lastcol == sort.active && this.lastdir == sort.direction) {
      if (this.lastdir == 'asc')
        sort.direction = 'desc';
      else
        sort.direction = 'asc';
    }
    this.lastcol = sort.active; this.lastdir = sort.direction;
    var c = this.pageIn;
    this.getRequestdataBySubCategory(1, 25, '', sort.active, this.lastdir);
  }





  //this section for pagination Closure Reason
  closure_pageIn = 0;
  closure_previousSizedef = 25;
  closure_pagesizedef: number = 25;
  public closure_pIn: number = 0;
  closure_pageChanged(event: any) {
    this.loader = true;
    this.closure_pIn = event.pageIndex;
    this.closure_pageIn = event.pageIndex;
    this.closure_pagesizedef = event.pageSize;
    let closure_pageIndex = event.pageIndex;
    let closure_pageSize = event.pageSize;
    let closure_previousSize = closure_pageSize * closure_pageIndex;
    this.closure_pagesizedef = closure_previousSize;
    this.getRequestdataNextClosure(closure_previousSize, closure_pageIndex + 1, closure_pageSize, '', this.sortColumnDef, this.SortDirDef);
  }
  getRequestdataNextClosure(cursize: number, pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {

    this.onsiteService.getClosureCountMttrToday(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
      if (res.status == true) {

        this.listClosureCountMttrToday.length = cursize;
        this.listClosureCountMttrToday.push(...res?.data);
        this.listClosureCountMttrToday.length = res?.pagination.totalCount;
        this.closure_dataSource = new MatTableDataSource<any>(this.listClosureCountMttrToday);
        this.closure_dataSource._updateChangeSubscription();
        this.closure_dataSource.paginator = this.closure_paginator as MatPaginator;
        this.loader = false;
      }
      else this.notificationService.warn(res.error)
    }, err => {
      this.notificationService.warn("! Fail");
      this.loader = false;

    })


  }
  closure_lastcol: string = 'Id';
  closure_lastdir: string = 'asc';

  closure_sortData(sort: any) {
    if (this.closure_pIn != 0)
      window.location.reload();
    if (this.closure_lastdir == sort.active && this.closure_lastdir == sort.direction) {
      if (this.closure_lastdir == 'asc')
        sort.direction = 'desc';
      else
        sort.direction = 'asc';
    }
    this.closure_lastcol = sort.active; this.closure_lastdir = sort.direction;
    var c = this.closure_pageIn;
    this.getRequestdataByClosureReason(1, 25, '', sort.active, this.closure_lastdir);
  }













  //////////line chart//////////////////////
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions: ChartOptions = {
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
  lineChartType: ChartType = 'line';



  /////////bar chart/////////////////////////
  barChartOptions: ChartOptions = {

    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barcolors: Array<any> = [
    { // first color
      backgroundColor: '#d7d7d7',

    },
    { // second color
      backgroundColor: '#80868b',

    },
    {
      // thirdcolor
      backgroundColor: '#8e2279',

    }];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Requests' },
    { data: [], label: 'MTTR' },
  ];

  totalRequests : number;
  totalMttr : string;
  GetCountOverYear() {
    this.onsiteService.GetCountOverYear().subscribe(response => {
      
      let _data = response.data;
      this.totalMttr = response.totalMtrr;
      this.totalRequests=response.totalRequests;
      _data.forEach(element => {
        this.barChartLabels.push(element.month);
        this.barChartData[0].data.push(element.requestCount);
        this.barChartData[1].data.push(element.mttr);
      });

    })
  }

}
