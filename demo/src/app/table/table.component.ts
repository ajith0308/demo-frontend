import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  dtoptions: DataTables.Settings = {}; // DataTables settings
  data: any[] = []; // Data array
  error: string | null = null;
  dtTrigger: Subject<any> = new Subject<any>();

  editedItemIndex: number | null = null;
  editedItem: any = {};
  modalVisible: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true
    };

    const apiUrl = 'https://demouser.onrender.com/auth/users';

    this.httpClient.get(apiUrl).subscribe(
      (response: any) => {
        this.data = response.data.users; // Assign the data from the API to the 'data' array
        this.dtTrigger.next(null); // Trigger DataTables to update
      },
      (error) => {
        this.error = 'An error occurred while fetching data.';
        console.error(error);
      }
    );
  }
}
