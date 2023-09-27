import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  data: any;
  error: string | null = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {  
    const apiUrl = 'https://users-7dmy.onrender.com/auth/users';

    this.httpClient.get(apiUrl).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        this.error = 'An error occurred while fetching data.';
        console.error(error);
      }
    );  
  }
}
