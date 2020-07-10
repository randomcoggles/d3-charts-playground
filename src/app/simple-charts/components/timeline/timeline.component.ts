import { Component, ViewChild, ElementRef, Input, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"]
})
export class TimelineComponent implements AfterViewInit {
  timeLineObj = [
    {
      label: "Industrial Revolutions",
      item: [
        {
          title: "First (1784)",
          startDate: new Date(1784, 1, 1),
          endDate: new Date(1870, 1, 1),
          content: "Mechanical production, railroad and steam power"
        },
        {
          title: "Second (1870)",
          startDate: new Date(1870, 1, 1),
          endDate: new Date(1969, 1, 1),
          content:
            "Mass production, electrical power and the advent of assemblyline"
        },
        {
          title: "Third (1969)",
          startDate: new Date(1969, 1, 1),
          endDate: new Date(2000, 1, 1),
          content: "Automated production, electronics, and computers"
        },
        ,
        {
          title: "Fourth (2000)",
          startDate: new Date(2000, 1, 1),
          endDate: new Date(2020, 1, 1),
          content: "Artiicial inteligence, big data, robotics and more to come"
        }
      ]
    }
  ];

  @ViewChild("svgWrap") svgWrap: ElementRef;
  @Input() canvaHeight = 300;
  @Input() canvaWidth = 850;
  // TODO make this an input
  padding = { top: 50, right: 50, bottom: 50, left: 50 };
  innerWidth: number;
  innerHeight: number;
  timeLineBeginDate: Date;
  timeLineEndDate: Date;

  xTicks = [];
  get xTicksTransform () {
    return 'translate(' + this.padding.left + ', ' + (this.padding.top + this.innerHeight) + ' )';
  }

  ticksArray = [];
  selectedTickIndex = 0;
  get pointerTransform () {
    const obj = this.xTicks[this.selectedTickIndex];
    if(!obj) {
      return '';
    }
    const x = obj.x;
    const pointerWidth  = 10;
    return `translate(${x + this.padding.left - pointerWidth}, ${this.innerHeight + this.padding.top - 30})`;
  }
  
  yScale;
  xScale;
  
  data: any;

  constructor() {
    this.innerWidth =  this.canvaWidth - this.padding.left - this.padding.right;
    this.innerHeight = this.canvaHeight - this.padding.top - this.padding.bottom;
  }

  
  get viewBox() {
    return [0, 0, this.canvaWidth, this.canvaHeight].join(" ");
  }

  buildTicks = (beginDate: Date, endDate: Date, step: number) => {
      if(!step || step <= 0) {
          throw 'Param step is invalid!';
      }
      let currentDate = new Date(beginDate);
      const ticks = [];
      const endTime = endDate.getTime();
      while(currentDate.getTime() < endTime) {
        ticks.push(new Date(currentDate));
        currentDate = new Date(currentDate.getTime() + step);
      }
      return ticks;
  }

  onTickClicked($event,xTick, index) {
    console.log('--> ',$event,xTick, index);
    this.selectedTickIndex = index;
  }

  update() {
    // TODO: get it from input data
    var startDate = new Date(1990,0,0);
    var endDate = new Date(2000,0,0);
    var step = 3.154e+10;  // One year
    const tickDates = this.buildTicks(startDate, endDate, step)
    const factor = this.innerWidth / (tickDates.length - 1);
    this.xTicks = tickDates
    .map((date, i) => {
        return {date: date, x: i * factor};
    });;

  }

  ngAfterViewInit() {
    this.update();
  }

}
