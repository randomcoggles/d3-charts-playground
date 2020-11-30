import { Component, ViewChild, ElementRef } from "@angular/core";
import { select } from "d3-selection";
import { scaleOrdinal, scaleLinear, scaleBand } from "d3-scale";
import { axisBottom, axisLeft } from "d3";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
})
export class BarchartComponent {
  @ViewChild("svgChart") svgChart: ElementRef;

  canvasWidth = 600;
  canvasHeight = 300;

  paddingLeft = 50;
  paddingTop = 50;
  paddingRight = 50;
  paddingBottom = 50;

  data;

  constructor() {
    this.data = "USA, Russia, Brazil, UK, France, Germany, Ireland, Spain, Israel"
      .split(/\s*,\s*/g)
      .map((item) => {
        return { country: item, value: Math.floor(Math.random() * 800) };
      });
  }

  getViewBox() {
    return [0, 0, this.canvasWidth, this.canvasHeight].join(" ");
  }

  ngAfterViewInit() {
    this.update();
  }

  update() {
    const innerWidth = this.canvasWidth - this.paddingLeft - this.paddingRight;
    const innerHeight =
      this.canvasHeight - this.paddingTop - this.paddingBottom;

    // Step 1: get the svg element
    let svg: any = select(this.svgChart.nativeElement)
      .append("g")
      .attr("class", "svg-wrap")
      .attr("transform", `translate(${this.paddingLeft}, ${this.paddingTop})`);

    let xMax = 0,
      xMin = 0,
      yMax = 0,
      yMin = 0;
    if (!this.data || !this.data.length) {
      return;
    }
    this.data.forEach((item) => {
      yMax = Math.max(yMax, item.y);
      yMin = Math.min(yMin, item.y);
    });

    // Step 2: define the x and y scales
    let xScale = scaleBand()
      .range([0, innerWidth])
      .domain(this.data.map((item) => item.country))
      .padding(0.1);

    let yScale = scaleLinear().domain([0, 800]).range([innerHeight, 0]);

    // Step 3: define the x and y axes
    let xAxis = axisBottom(xScale);
    let yAxis = axisLeft(yScale);

    // Step 4: render the axes
    svg
      .append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0, " + innerHeight + ")")
      .call(xAxis);

    svg.append("g").attr("class", "yaxis").call(yAxis);

    // ============ GRIDS =============

    // add the X gridlines
    const gridX = svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + innerHeight + ")");
    gridX.call(
      axisBottom(xScale).tickSize(-innerHeight).tickFormat(null) // To take at this. See what it means
    );
    gridX.selectAll("line").attr("class", "x grid-line");

    // add the X gridlines
    const gridY = svg.append("g").attr("class", "grid");
    gridY.call(
      yAxis.tickSize(-innerWidth).tickFormat(null) // To take at this. See what it means
    );
    gridY.selectAll("line").attr("class", "y grid-line");

    // ============ BARS  =============

    // onst bubbles = svg.selectAll(".bubble");

    //     bubbles
    //       .data(this.data)
    // .enter()
    const bars = svg
      .append("g")
      .attr("class", "bars")
      .selectAll("rect")
      .data(this.data)
      .enter()
      .append("rect")
      // .merge(bars)
      // .transition()
      // .duration(100)
      .attr("x", (d) => xScale(d.country))
      .attr("y", (d) => yScale(d.value))
      .attr("width", (d) => xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.value))
      .attr("fill", "brown");

    // debugger;
  }
}
