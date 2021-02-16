import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { symb } from './US-Stock-Symbols';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  constructor(private http: HttpClient) { }
  control=new FormControl();
  selectedcategory='general';
  ngOnInit() {
    this.http.get("https://finnhub.io/api/v1/news?category=general&token=c0kfulv48v6und6rip8g").subscribe((res)=>{
      this.list=res;
      console.log(this.list);
      var elem;
      for(elem in this.list){
        var d=new Date(this.list[elem]['datetime']);
        this.list[elem]['datetime']=stringify(d.getHours())+':'+stringify(d.getMinutes())+','+stringify(d.getDate())+'/'+stringify(d.getMonth())+'/'+stringify(d.getFullYear());
      }
    });
  }
  apikey='c0kfulv48v6und6rip8g';
  list;
  selectedcatergorycontrol=new FormControl(this.selectedcategory);
  searchbycategory(category){
  this.http.get("https://finnhub.io/api/v1/news?category="+category+"&token=c0kfulv48v6und6rip8g").subscribe((res)=>{
        this.list=res;
        this.list.shift();
        var elem;
        for(elem in this.list){
          var d=new Date(this.list[elem]['datetime']);
          this.list[elem]['datetime']=stringify(d.getHours())+':'+stringify(d.getMinutes())+','+stringify(d.getDate())+'/'+stringify(d.getMonth())+'/'+stringify(d.getFullYear());
        }
      });
    console.log(this.list);  }
  searchbycompany(company){
    var date=new Date();
    var now=date.getFullYear()+'-'+date.getMonth()+"-"+date.getDay();
    var then=date.getFullYear()+'-'+stringify(date.getMonth()-1)+"-"+date.getDay();
    this.http.get("https://finnhub.io/api/v1/company-news?symbol="+company+"&from="+now+"&to="+then+"&token=c0kfulv48v6und6rip8g").subscribe((res)=>{
      this.list=res;
      this.list.shift();
      console.log(this.list);
      var elem;
      for(elem in this.list){
        var d=new Date(this.list[elem]['datetime']);
        this.list[elem]['datetime']=stringify(d.getHours())+':'+stringify(d.getMinutes())+','+stringify(d.getDate())+'/'+stringify(d.getMonth())+'/'+stringify(d.getFullYear());
      }
    });
  }
}
