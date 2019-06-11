import {Component, ElementRef, OnInit, Input, ViewChild} from '@angular/core';
import {TweenMax} from "gsap";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() { }

  time : any = 35990;
  count :any = 0;
  rol : any  = "start";
  interval : any;

  hours_1_min : any = 0;
  hours_1_max : any = 0;
  hours_2_min : any = 0;
  hours_2_max : any = 0;

  min_1_min : any   = 0;
  min_1_max : any   = 0;
  min_2_min : any   = 0;
  min_2_max : any   = 0;

  sec_1_min : any   = 0;
  sec_1_max : any   = 0;
  sec_2_min : any   = 0;
  sec_2_max : any   = 0;

  @ViewChild('hours_1_min_el') hours_1_min_el: ElementRef;
  @ViewChild('hours_1_max_el') hours_1_max_el: ElementRef;
  @ViewChild('hours_2_min_el') hours_2_min_el: ElementRef;
  @ViewChild('hours_2_max_el') hours_2_max_el: ElementRef;
  @ViewChild('min_1_min_el') min_1_min_el: ElementRef;
  @ViewChild('min_1_max_el') min_1_max_el: ElementRef;
  @ViewChild('min_2_min_el') min_2_min_el: ElementRef;
  @ViewChild('min_2_max_el') min_2_max_el: ElementRef;
  @ViewChild('sec_1_min_el') sec_1_min_el: ElementRef;
  @ViewChild('sec_1_max_el') sec_1_max_el: ElementRef;
  @ViewChild('sec_2_min_el') sec_2_min_el: ElementRef;
  @ViewChild('sec_2_max_el') sec_2_max_el: ElementRef;

  ngOnInit(){

  	setTimeout(()=>{
	  this.animateFigure('sec_2',this.sec_2_max_el.nativeElement, this.sec_2_min_el.nativeElement);
      this.animateFigure('sec_1', this.sec_1_max_el.nativeElement, this.sec_1_min_el.nativeElement);
      this.animateFigure('min_2', this.min_2_max_el.nativeElement, this.min_2_min_el.nativeElement);
      this.animateFigure('min_1', this.min_1_max_el.nativeElement, this.min_1_min_el.nativeElement);
      this.animateFigure('hours_2', this.hours_2_max_el.nativeElement, this.hours_2_min_el.nativeElement);
      this.animateFigure('hours_1', this.hours_1_max_el.nativeElement, this.hours_1_min_el.nativeElement);
  	},1000)

    this.interval = setInterval(()=> {
      this.timeCalculate()
    },1000);
  }

  timeCalculate() {
    this.time++;

    var mytim = this.time;
    this.hours_1_max = Math.floor(mytim/36000);
    this.hours_2_max = Math.floor(mytim/3600)%10;
    mytim = mytim % 3600;
    this.min_1_max= Math.floor(mytim/600);
    this.min_2_max = Math.floor(mytim/60)%10;
    mytim = mytim%60;
    this.sec_1_max = Math.floor(mytim/10);
    this.sec_2_max = Math.floor(mytim%10);

    this.checkHour();
    // if(this.count==0){
    //   this.animateFigure('sec_1', this.sec_1_max_el.nativeElement, this.sec_1_min_el.nativeElement);
    //   this.animateFigure('min_2', this.min_2_max_el.nativeElement, this.min_2_min_el.nativeElement);
    //   this.animateFigure('min_1', this.min_1_max_el.nativeElement, this.min_1_min_el.nativeElement);
    //   this.animateFigure('hours_2', this.hours_2_max_el.nativeElement, this.hours_2_min_el.nativeElement);
    //   this.animateFigure('hours_1', this.hours_1_max_el.nativeElement, this.hours_1_min_el.nativeElement);
    //   this.count=1;
    // }

    this.animateFigure('sec_2',this.sec_2_max_el.nativeElement, this.sec_2_min_el.nativeElement)
  }

  animateFigure (val,$top,$back_top) {

    TweenMax.to($top, 0.8, {
      rotationX: "-180deg",
      transformPerspective: 300,
      onComplete:()=>{

        if (val == 'sec_2') {

          this.sec_2_min = this.sec_2_max;
        } else if ( val == 'sec_1') {

          this.sec_1_min = this.sec_1_max;
        } else if ( val == 'min_2') {

          this.min_2_min = this.min_2_max;
        } else if ( val == 'min_1') {

          this.min_1_min = this.min_1_max;
        } else if ( val == 'hours_2') {

          this.hours_2_min = this.hours_2_max;
        } else if ( val == 'hours_1') {

          this.hours_1_min = this.hours_1_max;
        }
        TweenMax.set($top, { rotationX: 0 });
      }
    });

    TweenMax.to($back_top, 0.8, {
      rotationX: 0,
      transformPerspective: 300,
      clearProps: "all"
    });

  }

  checkHour() {

    if (this.time%10 == 0) {
      this.animateFigure('sec_1', this.sec_1_max_el.nativeElement, this.sec_1_min_el.nativeElement);
    }

    if (this.time%60 == 0) {
      this.animateFigure('min_2', this.min_2_max_el.nativeElement, this.min_2_min_el.nativeElement);
    }

    if (this.time%600 == 0) {
      this.animateFigure('min_1', this.min_1_max_el.nativeElement, this.min_1_min_el.nativeElement);
    }

    if (this.time%3600 == 0) {
      this.animateFigure('hours_2', this.hours_2_max_el.nativeElement, this.hours_2_min_el.nativeElement);
    }

    if (this.time%36000 == 0) {
      this.animateFigure('hours_1', this.hours_1_max_el.nativeElement, this.hours_1_min_el.nativeElement);
    }

  }

  start(){

    if (this.rol!="start") {
      this.rol="start";
      this.interval = setInterval(()=> {
        this.timeCalculate()
      },1000);
    }
  }

  stop(){

    if (this.rol!="stop") {
      this.rol="stop";
      clearInterval(this.interval);
      this.time=-1;
      this.timeCalculate();
    }
  }

  break(){

    if (this.rol!="break") {
      this.rol="break";
      clearInterval(this.interval);
    }
  }

}
