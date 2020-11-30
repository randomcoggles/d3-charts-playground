import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { select } from "d3-selection";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import { axisBottom, axisLeft, max, timeFormat } from "d3";

@Component({
  selector: "app-d3-angular-simple-axes",
  templateUrl: "./d3-angular-simple-axes.component.html",
  styleUrls: ["./d3-angular-simple-axes.component.scss"],
})
export class D3AngularSimpleAxesComponent implements AfterViewInit {
  @ViewChild("svgSimpleAxes") private svgSimpleAxes: ElementRef;
  @ViewChild("svgDateAxes") private svgDateAxes: ElementRef;

  // TODO: listen to changes in any of the inputs
  @Input() canvaHeight = 300;
  @Input() canvaWidth = 600;
  @Input() data: any[];
  @Input() paddintTop = 60;
  @Input() paddingLeft = 60;
  @Input() paddintBottom = 60;
  @Input() paddingRight = 0;
  // TODO: Out put events:
  // hover, click, etc. For this create a bubble element.
  bubbleTemplate = null;

  innerWidth = 760;
  innerHeight = 320;

  padding = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };
  numberOfYTicks = 10;
  numberOfXTicks = 10;
  yTicks;
  xTicks;

  yScale;
  xScale;
  xTicksMarker = [];
  yTicksMarker = [];
  bubbles = [];
  constructor(private cdRef: ChangeDetectorRef) {}

  getViewBox() {
    return [0, 0, this.canvaWidth, this.canvaHeight].join(" ");
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
    this.update();
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      this.update();
    }
  }

  update() {
    this.innerWidth = this.canvaWidth - this.paddingLeft - this.paddingRight;
    this.innerHeight = this.canvaHeight - this.paddintTop - this.paddintBottom;

    let xValues = [75, 250, 350, 120, 600, 450, 125, 850];
    let yValues = [25, 150, 250, 320, 400, 550, 325, 815];
    // debugger;
    // Step 1: create an svg element
    // let svgSimpleAxes:any = select(this.svgSimpleAxes.nativeElement);
    // let svgDateAxes:any = select(this.svgDateAxes.nativeElement);

    // Step 2: define the x and y scales
    let xScale = scaleLinear()
      .domain([0, max(xValues)])
      .range([this.padding.left, this.canvaWidth - this.padding.right]);

    this.xScale = xScale;
    this.xTicks = xScale.ticks();

    let yScale = scaleLinear()
      .domain([0, max(yValues)])
      .range([this.canvaHeight - this.padding.top, this.padding.bottom]);
    this.yScale = yScale;
    // debugger;
    this.numberOfYTicks = yScale.ticks()[0];

    // Step 3: define the x and y axes
    let xAxis = axisBottom(xScale);

    // .ticks(this.numberOfXTicks);
    this.yTicks = yScale.ticks();
    // debugger;

    let yAxis = axisLeft(yScale).ticks(this.numberOfYTicks);

    // // Step 4: render the axes
    // svgSimpleAxes.append("g")
    //     .attr("class", "xaxis")
    //     .attr("transform", "translate(0, " + (this.canvaHeight - this.padding.left) + ")")
    //     .call(xAxis);
    //     // debugger;

    // svgSimpleAxes.append("g")
    //     .attr("class", "yaxis")
    //     .attr("transform", "translate(" + this.padding.left + ",0)")
    //     .call(yAxis);

    // ============== Date axes ==============

    //     svgDateAxes.append("g")
    //         .attr("class", "yaxis")
    //         .attr("transform", "translate(" + this.padding.left + ",0)")
    //         .call(yAxis);

    //     let timeXScale = scaleTime()
    //                     .domain([new Date(2000, 0, 1), new Date(2010, 0, 2)])
    //                     .range([this.padding.left, this.canvaWidth - this.padding.right]);
    // // debugger;
    //     let timeXAxis = axisBottom(timeXScale)
    //                   .ticks(xTicks)
    //                   .tickFormat(timeFormat("%Y"));

    //     svgDateAxes.append("g")
    //         .attr("class", "xaxis")
    //         .attr("transform", "translate(0, " + (height-yPad) + ")")
    //         .call(timeXAxis);
  }
}
