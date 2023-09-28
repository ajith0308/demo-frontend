import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  dtoptions: DataTables.Settings = {};
  data: any[] = [];
  error: string | null = null;
  dtTrigger: Subject<any>=new Subject<any>()

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'simple_numbers'
    };

    const apiUrl = 'https://demouser.onrender.com/auth/users';

    this.httpClient.get(apiUrl).subscribe(
      (response: any) => {
        this.data = response;
        this.dtTrigger.next(null);
      },
      (error) => {
        this.error = 'An error occurred while fetching data.';
        console.error(error);
      }
    );
  }
}