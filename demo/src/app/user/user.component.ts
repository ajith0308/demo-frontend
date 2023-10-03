import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'bootstrap';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  formGroup: FormGroup;
  loading = false;
  // language:string= 'es';
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,private translate: TranslateService) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['',[Validators.required, this.ageRangeValidator(100)] ],
      gender: ['', Validators.required], 

      phone_number: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]], 
      email: ['',[Validators.required, Validators.email]],
    });
  
      // Set the default language
      this.translate.setDefaultLang('en');
    
    // translate.setDefaultLang('en');
    // translate.use('en'); // Set the default language
  }
  changeLanguage(language: string){
    this.translate.use(language); // Change the active language
    
    
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
  ageRangeValidator(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value !== null && (isNaN(control.value) || control.value > max)) {
        return { 'ageRange': true };
      }
      return null;
    };
  }
}
