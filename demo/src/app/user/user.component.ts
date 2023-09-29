import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'bootstrap';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  formGroup: FormGroup;
  loading = false;

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
      this.loading = true; 
      const formData = this.formGroup.value;
      
      this.http.post('https://demouser.onrender.com/auth', formData).subscribe(
        (response: any) => {
          console.log('Data saved successfully!', response);
          this.loading = false;
          this.showSuccessToast()
        },
        (error: any) => {
          console.error('Failed to save data:', error);
          this.loading = false;
        }
      );
    }
   
  }
  showSuccessToast() {
    const successToast = document.getElementById('successToast');
    if (successToast) {
      successToast.classList.add('show'); // Show the toast
      setTimeout(() => {
        successToast.classList.remove('show'); // Hide the toast after a delay
      }, 500); // Adjust the delay time (e.g., 1000 milliseconds = 1seconds)
    }
  }
  
}
