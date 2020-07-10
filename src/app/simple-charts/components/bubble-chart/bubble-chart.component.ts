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

@Component({
  selector: "app-simple-bubble-chart",
  templateUrl: "./bubble-chart.component.html",
  styleUrls: ["./bubble-chart.component.scss"]
})
export class BubbleChartComponent {
  @ViewChild("svgBubbleChart") private svgBubbleChart: ElementRef;
  @ViewChild("svgDateAxes") private svgDateAxes: ElementRef;

  // TODO: listen to changes in any of the inputs
  @Input() canvaHeight = 300;
  @Input() canvaWidth = 600;
  @Input() data: any[];
  @Input() paddingTop = 50;
  @Input() paddingLeft = 50;
  @Input() paddintBottom = 50;
  @Input() paddingRight = 50;
  @Input() nYTicks = 10;
  @Input() nXTicks = 10;


  innerWidth = 760;
  innerHeight = 320;

  xTicks = [];
  yTicks = [];

  yScale;
  xScale;
  bubbles = [];

  constructor() {
    this.data = Array.from({ length: 37 }, item => {
      const x = Math.floor(Math.random() * 1000);
      const y = Math.floor(Math.random() * 800 * (x / 800));
      const r = Math.max(3, Math.floor(Math.random() * 15));
      return { x, y, r };
    });
  }

  getViewBox() {
    return [0, 0, this.canvaWidth, this.canvaHeight].join(" ");
  }

  ngAfterViewInit() {
    this.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      // this.update();
    }
  }

  update() {
    this.innerWidth = this.canvaWidth - this.paddingLeft - this.paddingRight;
    this.innerHeight = this.canvaHeight - this.paddingTop - this.paddintBottom;

    // Step 1: create an svg element
    let svg: any = select(this.svgBubbleChart.nativeElement);

    let xMax = 0,
      xMin = 0,
      yMax = 0,
      yMin = 0;
    if (!this.data || !this.data.length) {
      return;
    }
    this.data.forEach(item => {
      xMax = Math.max(xMax, item.x);
      xMin = Math.min(xMin, item.x);
      yMax = Math.max(yMax, item.y);
      yMin = Math.min(yMin, item.y);
    });
    yMax += yMax  * .1;
    // Step 2: define the x and y scales
    let xScale = scaleLinear()
      .domain([0, 1000])
      .range([this.paddingLeft, this.canvaWidth - this.paddingRight]);

    this.xScale = xScale;
    this.xTicks = xScale.ticks();

    let yScale = scaleLinear()
      .domain([yMin, 800])
      .range([this.canvaHeight - this.paddingTop, 0]);
    this.yScale = yScale;
    this.yTicks = yScale.ticks();

    // Step 3: define the x and y axes
    let xAxis = axisBottom(xScale).ticks(this.nXTicks);
    this.yTicks = yScale.ticks();

    let yAxis = axisLeft(yScale).ticks(this.nYTicks);

    // Step 4: render the axes
    svg
      .append("g")
      .attr("class", "xaxis")
      .attr(
        "transform",
        "translate(0, " + (this.canvaHeight - this.paddingTop) + ")"
      )
      .call(xAxis);
    // debugger;

    svg
      .append("g")
      .attr("class", "yaxis")
      .attr("transform", "translate(" + this.paddingLeft + ",0)")
      .call(yAxis);

    const bubbles = svg.selectAll(".bubble");

    bubbles
      .data(this.data)
      // .enter()
      .attr("cx", function(d) {
        return xScale(d.x);
      })
      .attr("cy", function(d) {
        return yScale(d.y);
      })
      .attr("r", function(d) {
        return d.r || 15;
      })
      .on("mouseenter", function(d) {
        const el = select(this);
        el.classed("bubble-hover", true);
      })
      .on("mouseout", function(d) {
        console.log("d: ", d);
        const el = select(this);
        el.classed("bubble-hover", false);
      })
      .style("fill", "steelblue")
      .style("opacity", "0.7")
      .attr("stroke", "black");

    /*
    svg
      .append("g")
      .selectAll("dot")
      .datat(this.data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return xScale(d.x);
      })
      .attr("cy", function(d) {
        return yScale(d.y);
      })
      .attr("r", function(d) {
        return d.r || 5;
      })
      .style("fill", "#69b3a2")
      .style("opacity", "0.7")
      .attr("stroke", "black");*/
  }
}
