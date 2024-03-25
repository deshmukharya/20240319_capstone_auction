import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.css'
})
export class AddpostComponent {
  postData = {
    name: '',
    category: '',
    image: '',
    price: 0,
    startDateTime: '', // Initialize with an empty string
    duration: 0
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Format the date before submitting
    this.postData.startDateTime = this.formatDateTime(this.postData.startDateTime);

    // Make HTTP post request to submit the data
    this.http.post<any>('http://localhost:3001/post/createPost', this.postData)
      .subscribe(
        response => {
          console.log('Post created successfully:', response);
          // Optionally reset the form data after successful submission
          this.resetForm();
        },
        error => {
          console.error('Error creating post:', error);
        }
      );
  }

  // Function to format date to match "yyyy-MM-ddThh:mm" format
  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    const formattedDateTime = `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())}T${this.pad(date.getHours())}:${this.pad(date.getMinutes())}`;
    return formattedDateTime;
  }

  // Function to pad single digits with a leading zero
  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  // Function to reset the form data
  resetForm() {
    this.postData = {
      name: '',
      category: '',
      image: '',
      price: 0,
      startDateTime: '', // Initialize with an empty string
      duration: 0
    };
  }
}
