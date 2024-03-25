import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-allposts',
  templateUrl: './allposts.component.html',
  styleUrl: './allposts.component.css'
})
export class AllpostsComponent {
  posts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

   fetchPosts() {
     this.http.get<any[]>('http://localhost:3001/post/getAllPosts')
      .subscribe(
       ( response:any) => {
          // Assuming the response data is an array of posts
          this.posts = response.posts;
          console.log('Fetched posts:', this.posts);
        },
        error => {
          console.error('Error fetching posts:', error);
        }
      );
  }
}
