import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  formGroup: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      age: ['', Validators.required]
    });
  }
  isFormValid() {
    return this.formGroup.valid;
  }
  onSubmit() {
    
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      
      this.http.post('', formData).subscribe(
        (response: any) => {
          console.log('Data saved successfully!', response);
          
        },
        (error: any) => {
          console.error('Failed to save data:', error);
         
        }
      );
    }
  }
}
