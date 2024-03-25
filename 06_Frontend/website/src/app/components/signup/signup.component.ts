
/**
 * Signup Component
 *
 * This component is responsible for handling the signup form.
 * It validates user inputs for username, email, and password fields.
 */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  /**
   * Constructor
   *
   * Initializes the signup form with validators for username, email, and password fields.
   * @param formBuilder FormBuilder instance for creating the form group
   */
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router) {
    this.signupForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          (control: { value: any }) => {
            const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/; // Start with letter, followed by letters or numbers
            const valid = usernameRegex.test(control.value); // Check if username follows the pattern
            if (control.value.length > 0 && control.value.startsWith('_')) {
              return { invalidUsername: true }; // Return error if the username starts with an underscore
            }
            return valid ? null : { invalidUsername: true }; // Return error if the username is not valid
          },
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(200),
          (control: { value: any }) => {
            const passwordRegex =
              /^(?=.*[A-Z])(?=.*[!@#$%^&()])(?=.*[0-9])(?!.*\s)(?!.*(\d)\1)/;
            return passwordRegex.test(control.value)
              ? null
              : { invalidPassword: true };
          },
        ],
      ],
    });
  }

  /**
   * onSubmit
   *
   * Handles form submission.
   * Logs success message if the form is valid, otherwise logs error message.
   */
  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted successfully!');
      console.log(this.signupForm.value);
      const userData = {
        username:this.signupForm.value.username,
        email:this.signupForm.value.email,
        password:this.signupForm.value.password,
      }
      this.http.post('http://localhost:3001/users/register',userData).subscribe({
        next: (response) => {
          // Handle the response if needed
          console.log('Signup successful', response);
          // Redirect to the login route
         // this.router.navigate([']);
        },
        error: (error) => {
          // Handle any errors here
          console.error('Signup failed', error);
        }
      });

    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }

  /**
   * showAlert
   *
   * Displays an alert if the form is invalid.
   */
  showAlert() {
    if (this.signupForm.invalid) {
      alert('Please fill all the fields correctly.');
    }
  }
}
