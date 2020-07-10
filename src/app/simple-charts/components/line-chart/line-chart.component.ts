import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, Input } from "@angular/core";
import { select } from "d3-selection";
import { scaleOrdinal, scaleLinear, scalePoint } from "d3-scale";
import { line } from  'd3-shape';
import { axisBottom, axisLeft } from "d3";

@Component({
  selector: 'app-simple-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class SimpleLineChart implements AfterViewInit {
  @ViewChild("svgWrap") svgWrap: ElementRef;
  @Input() canvaHeight = 300;
  @Input() canvaWidth = 600;
  // TODO make this an input
  padding = { top: 50, right: 50, bottom: 50, left: 50 };
  innerWidth: number;
  innerHeight: number;
  
  yScale;
  xScale;
  circles;
  data: any;

  constructor() {
    this.innerWidth = 600 - this.padding.left - this.padding.right;
    this.innerHeight = 300 - this.padding.top;
  }

  ngAfterViewInit() {
    const currentDate = new Date();
    this.data = Array.from({length: 13}, (item, i) =>{
        const month = new Intl.DateTimeFormat('en-US', {month: 'short'}).format(currentDate);
        const year = currentDate.getUTCFullYear();
        const monthNumber = currentDate.getUTCMonth()
        let dateStr = month + (monthNumber === 0 || i === 0 || i ===12 ? '/' + year : '' );
        currentDate.setUTCMonth(monthNumber - 1);
        return {date: dateStr, value: Math.floor(Math.random() * 800)}
    });
    this.update();
  }
  
  getViewBox() {
    return [0, 0, this.canvaWidth, this.canvaHeight].join(" ");
  }

  update() {
    // ========== SETUP CANVAS ==========

    const svg = select(this.svgWrap.nativeElement)
      // .append("svg")
      // .classed('svg-canvas')
      // .attr("width", this.innerWidth + this.padding.left + this.padding.right)
      // .attr("height", this.innerHeight + this.padding.bottom + this.padding.top)
      .append("g")
      .attr(
        "transform",
        `translate(${this.padding.left}, 0)`
      );

    // ========== GET DIMENSIONS ==========
    const data01 = (this.data || [])[0];
    let xMax = this.data[this.data.length - 1].month;
    let xMin = this.data[0].month;
    let yMax = data01.value || 0;
    let yMin = yMax;

    (this.data || []).forEach(item => {
      yMax = Math.max(yMax, item.value);
      yMin = Math.min(yMin, item.value);
    });
    yMax += yMax * 0.1;
    yMin -= Math.max(yMax * 0.1, 0);

    // ========== CREATE SCALES ==========
    // debugger;
    // const months = this.data.map(d => d.date);
    this.xScale = scalePoint()
      .domain(this.data.map(d => d.date).reverse())
      .range([0, this.innerWidth]);

    this.yScale = scaleLinear()
      .domain([yMin, 800])
      .range([this.innerHeight, 0]);
    // ========== ADD SCALES TO CANVAS ==========

    // Horizontal scale
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${this.innerHeight})`)      
      .call(axisBottom(this.xScale))
      .selectAll("text")
      .attr("transform", "rotate(-35) translate(-10, 10)");
    // Vertical scale
    svg.append("g")
      // .attr("transform", `translate(0, -20)`)      
          
    .call(axisLeft(this.yScale));

    // ========== SCALES TO CANVAS ==========
        //  ...comming soon

    // ========== ADD Line ==========
  const myLine = line()
        .x(d => { return this.xScale(d.date)})
        .y(d => this.yScale(d.value));
      //  debugger;
    svg
      .append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d",  myLine);

    // var myLine = svg
    //   .append('g')
    //   .append("path")
    //     // .data(this.data)
    //     .datum(this.data)
    //     .enter()
    //     .attr("d", line()
    //       .x(d => this.xScale(d.date) )
    //       .y(d => this.yScale(+d.value))
    //     )
    //     .attr("stroke", 'blue')
    //     .style("stroke-width", 4)
    //     .style("fill", "none")

  }
}
