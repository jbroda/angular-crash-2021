import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {
    console.log("ngOnInit")
    type Hello = number | string;
    let h: Hello = 1;
    let g: Hello = "2";
    let i: any = g;
    let j: any = h;
    type Point = {x:Hello, y:Hello};
    var p:Point = {x:1, y:2};
    interface Pt {x:Hello, y:Hello};
    var p2:Pt = {x:2, y:"dfs"};
    interface PtExtra extends Pt {
      erasable: boolean
    };
    var p3:PtExtra = {x:1,y:"y",erasable:false};
    const x = "hello" as Hello;
    let gg:"type" = "type";
    let changingString = "str";
    changingString = "str2";
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy")
  }
}
