import {
  Component,
  Input,
  SimpleChanges,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { select } from "d3-selection";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import { axisBottom, axisLeft, max, timeFormat } from "d3";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-simple-axes",
  templateUrl: "./axes.component.html",
  styleUrls: ["./axes.component.scss"]
})
export class SimpleAxesComponent implements AfterViewInit {
  @ViewChild("svgSimpleAxes") private svgSimpleAxes: ElementRef;
  @ViewChild("svgDateAxes") private svgDateAxes: ElementRef;

  // TODO: listen to changes in any of the inputs
  @Input() canvaHeight = 300;
  @Input() canvaWidth = 600;
  @Input() data: any[];
  @Input() paddintTop = 50;
  @Input() paddingLeft = 50;
  @Input() paddintBottom = 50;
  @Input() paddingRight = 0;
  // TODO: Out put events:
  // hover, click, etc. For this create a bubble element.
  bubbleTemplate = null;

  innerWidth = 760;
  innerHeight = 320;

  xTicks = [];
  yTicks = [];

  yScale;
  xScale;
  xTicksMarker = [];
  yTicksMarker = [];
  bubbles = [];
  constructor(private http: HttpClient) {}

  getViewBox() {
    return [0, 0, this.canvaWidth, this.canvaHeight].join(" ");
  }
  ngAfterViewInit() {
    this.http.get("./assets/bubble-data01.json", {headers: {'cacheable': 'true'}}).subscribe(
      response => {
        this.data = response as any[];
      },
      error => {
        console.log(error);
      }
    );
    this.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      this.update();
    }
  }

  update() {
    this.innerWidth = this.canvaWidth - this.paddingLeft - this.paddingRight;
    this.innerHeight = this.canvaHeight - this.paddintTop - this.paddintBottom;

    let element = this.svgSimpleAxes.nativeElement;
    let width: number = 600;
    let height: number = 300;
    let bottomPad: number = 50;
    let topPad = 50;
    let xPad: number = 50;
    let xTicks: number = 14;
    let yTicks: number = 10;

    let xValues = [75, 250, 350, 120, 600, 450, 125, 850, 1000];
    let yValues = [25, 150, 250, 320, 400, 550, 325, 815];
    
    // Step 1: create an svg element
    let svgSimpleAxes: any = select(this.svgSimpleAxes.nativeElement);
    let svgDateAxes: any = select(this.svgDateAxes.nativeElement);

    // Step 2: define the x and y scales
    let xScale = scaleLinear()
      .domain([0, max(xValues)])
      .range([xPad, width - xPad]);

    this.xScale = xScale;
    this.xTicks = xScale.ticks();

    let yScale = scaleLinear()
      .domain([0, max(yValues)])
      .range([height - bottomPad, 0]);
    this.yScale = yScale;
    this.yTicks = yScale.ticks();

    // Step 3: define the x and y axes
    let xAxis = axisBottom(xScale).ticks(xTicks);
    this.yTicks = yScale.ticks();

    let yAxis = axisLeft(yScale).ticks(yTicks);

    // Step 4: render the axes
    svgSimpleAxes
      .append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0, " + (height - topPad) + ")")
      .call(xAxis);
    // debugger;

    svgSimpleAxes
      .append("g")
      .attr("class", "yaxis")
      .attr("transform", "translate(" + xPad + ",0)")
      .call(yAxis);
      
    svgSimpleAxes.append("text")             
    .attr("transform",
          "translate(" + (width/2) + " ," + 
                          (height ) + ")")
    .style("text-anchor", "middle")
    .text("Score");

    

    // ============== Date axes ==============

    svgDateAxes
      .append("g")
      .attr("class", "yaxis")
      .attr("transform", "translate(" + xPad + ",0)")
      .call(yAxis);

    let timeXScale = scaleTime()
      .domain([new Date(2000, 0, 1), new Date(2010, 0, 2)])
      .range([xPad, width - xPad]);
    // debugger;
    let timeXAxis = axisBottom(timeXScale)
      .ticks(15)
      .tickFormat(timeFormat("%Y"));

    svgDateAxes
      .append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0, " + (height - topPad) + ")")
      .call(timeXAxis);

    svgDateAxes.append("text")             
    .attr("transform",
          "translate(" + (width/2) + " ," + 
                          (height ) + ")")
    .style("text-anchor", "middle")
    .text("Year");
  }
}
