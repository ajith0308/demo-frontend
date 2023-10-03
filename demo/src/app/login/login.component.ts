import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Define the FormGroup
  showPassword = false;

  constructor() {
    // Initialize the FormGroup and define form controls with validation
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  // Add a login method to handle form submission
  login() {
    if (this.loginForm.valid) {
      // Use optional chaining to safely access form values
      const userEmail = this.loginForm.get('email')?.value;
      const userPassword = this.loginForm.get('password')?.value;

      // Perform your login logic here
      console.log('User Email:', userEmail);
      console.log('User Password:', userPassword);
    } else {
      // Form is invalid, show error messages
      // You can display these messages in your template
    }
  }

  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}


