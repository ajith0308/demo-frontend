import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  formGroup: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required], 
      phone_number: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]], 
      email: ['',[Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      
      this.http.post('https://demouser.onrender.com/auth', formData).subscribe(
        (response: any) => {
          console.log('Data saved successfully!', response);
          this.router.navigate(['table']);
        },
        (error: any) => {
          console.error('Failed to save data:', error);
         
        }
      );
    }
   
  }
}
