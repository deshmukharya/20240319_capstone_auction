
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



interface Post {
  name: string;
  category: string;
  image: string;
  price: number;
  startDateTime: Date;
  duration: number;
}
@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrl: './bidding.component.css'
})
export class BiddingComponent implements OnInit  {
  auctionData: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDataFromBackend();
  }

  fetchDataFromBackend() {
    this.http.get<Post[]>('http://localhost:3001/post/getPostById?_id=${postId}')
      .subscribe(
        (data: Post[]) => {
          this.auctionData = data;
        },
        (error) => {
          console.error('Error fetching data from backend:', error);
        }
      );
  }

  toggleStopwatch() {
    // Your stopwatch logic here
    console.log('Stopwatch toggled');
  }

}
