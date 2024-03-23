import { Component } from '@angular/core';

@Component({
  selector: 'app-allposts',
  templateUrl: './allposts.component.html',
  styleUrl: './allposts.component.css'
})
export class AllpostsComponent {
  posts = [
    { title: 'Paintings', price: '$600', author: 'Arya Deshmukh', image: './images/image1.png', height: '290px', likes: "likes", comments: "commenst", bid: "bid" },
    { title: 'Bicycle', price: '$550', author: 'XYZ', image: './images/2.png', height: null,likes:"likes", comments: "commenst", bid: "bid"  },
    { title: 'Villa', price: '$600', author: 'ABC', image: './images/villa.png', height: '300px', likes: "likes", comments: "commenst", bid: "bid"  },
    { title: 'Bike', price: '$600', author: 'ABC', image: './images/bike.png', height: '300px', likes: "likes", comments: "commenst", bid: "bid"  },
    { title: 'Car', price: '$600', author: 'XYZ', image: './images/car.png', height: '300px',likes: "likes", comments: "commenst", bid: "bid" },
    { title: 'Sample Article Title', price: '$600', author: 'Bicycle', image: './images/bike.png', height: null, likes: "likes", comments: "commenst", bid: "bid"  }
  ];
}
