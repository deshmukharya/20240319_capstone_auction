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
    startDate: '',
    startTime: '',
    duration: 0
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3001/post/createPost', this.postData)
      .subscribe(
        res => {
          console.log(res);
          // Optionally reset the form data after successful submission
          this.postData = {
            name: '',
            category: '',
            image: '',
            price: 0,
            startDate: '',
            startTime: '',
            duration: 0
          };
        },
        err => {
          console.error(err);
        }
      );
  }
}
