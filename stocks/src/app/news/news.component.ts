import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { symb } from './US-Stock-Symbols';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  constructor(private http: HttpClient) { }
  selectedcategory='general';
  categories=['general', 'forex', 'crypto', 'merger'];
  x=(new symb).symbs;
  mycontrol=new FormControl();
  filteredOptions: Observable<string[]>;

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
    this.filteredOptions = this.mycontrol.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.x.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
  searchbycompany(){
    var company=this.mycontrol.value;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var now = yyyy + '-' + mm + '-' + dd;
    var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    var then = yyyy + '-' + mm + '-' + dd;

     this.http.get("https://finnhub.io/api/v1/company-news?symbol="+company+"&from="+then+"&to="+now+"&token=c0kfulv48v6und6rip8g").subscribe((res)=>{
      this.list=res;
      this.list.shift();
      console.log(this.list, then);
      var elem;
      for(elem in this.list){
        var d=new Date(this.list[elem]['datetime']);
        this.list[elem]['datetime']=stringify(d.getHours())+':'+stringify(d.getMinutes())+','+stringify(d.getDate())+'/'+stringify(d.getMonth())+'/'+stringify(d.getFullYear());
      }
    });
  }
}
