import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get("https://finnhub.io/api/v1/news?category=general&token=c0kfulv48v6und6rip8g").subscribe((res)=>{
      this.list=res;

    });
    console.log(this.list);
  }
  apikey='c0kfulv48v6und6rip8g';
  list;
  searchbycategory(category){
  this.http.get("https://finnhub.io/api/v1/news?category=general&token=c0kfulv48v6und6rip8g").subscribe((res)=>{
        this.list=res;
        
      });
    console.log(this.list);  }
  searchbycompany(company){
    this.http.get("https://finnhub.io/api/v1/news?category=general&token=c0kfulv48v6und6rip8g").subscribe((res)=>{
      this.list=res;
      
    });
    console.log(this.list);  }
}
