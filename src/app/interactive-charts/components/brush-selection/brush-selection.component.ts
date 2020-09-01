import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { select, event } from "d3-selection";
import { scaleOrdinal, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3";
import { brush } from "d3-brush";
import { Subscription, fromEvent } from "rxjs";
import * as d3 from 'd3';
import { delay, finalize } from "rxjs/operators";

@Component({
  selector: "app-brush-selection",
  templateUrl: "./brush-selection.component.html",
  styleUrls: ["./brush-selection.component.scss"]
})
export class BrushSelectionComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("svgWrap") svgWrap: ElementRef;
  // TODO make this an input
  padding = { top: 10, right: 30, bottom: 30, left: 40 };
  innerWidth: number;
  innerHeight: number;
  data: {
    Sepal_Length: number;
    Sepal_Width: number;
    Petal_Length: number;
    Petal_Width: number;
    Species: string;
  }[];
  yScale;
  xScale;
  circles;
  selectedDots;
  selectionRanges: any[] = [];
  disableBrush = false;
  keyDownSubscription: Subscription;
  keyupSubscription: Subscription;
  showHelpSection = false;
  chartReady = false;
  dataReady = false;
  selectionMode: 'drag' | 'single' = 'drag';

  constructor(private http: HttpClient) {
    this.innerWidth = 560 - this.padding.left - this.padding.right;
    this.innerHeight = 400 - this.padding.top - this.padding.bottom;
  }

  ngOnInit() {

    this.keyDownSubscription = fromEvent(document, "keyup").subscribe(
      (e: KeyboardEvent) => {
        if (e.which === 17) {
          this.disableBrush = !this.disableBrush;
          this.selectionMode === 'drag' ? 'single' : 'drag';
        }
        console.log(e);
      }
    );
  }

  ngAfterViewInit() {
    // TODO: relocate this to an input
    this.chartReady = false;
    this.http.get("./assets/bubble-data02.json", {headers: {'cacheable': 'true'}})    
    .pipe(delay(1000))
    .pipe(finalize(() => { 
      this.dataReady = true;
      setTimeout(()=>{this.chartReady = true;}, 100);
    }))
    .subscribe(
      response => {
        this.data = response as any[];
        this.update();
      },
      error => {
        console.log(error);
      }
    );
  }

  update() {
    // ========== SETUP CANVAS ==========

    const svg = select(this.svgWrap.nativeElement)
      .append("svg")
      .attr("width", this.innerWidth + this.padding.left + this.padding.right)
      .attr("height", this.innerHeight + this.padding.bottom + this.padding.top)
      .append("g")
      .attr(
        "transform",
        `translate(${this.padding.left}, ${this.padding.top})`
      );

    // ========== GET DIMENSIONS ==========
    const data01 = (this.data || [])[0];
    let xMax = data01.Sepal_Length || 0;
    let xMin = xMax;
    let yMax = data01.Petal_Length || 0;
    let yMin = yMax;

    (this.data || []).forEach(item => {
      xMax = Math.max(xMax, item.Sepal_Length);
      xMin = Math.min(xMin, item.Sepal_Length);
      yMax = Math.max(yMax, item.Petal_Length);
      yMin = Math.min(yMin, item.Petal_Length);
    });
    yMax = yMax + yMax * 0.5;
    yMin = yMin - yMax * 0.1;
    // xMin = xMin + (xMax * .2);
    xMin = xMin - xMax * 0.05;

    // ========== CREATE SCALES ==========
    // debugger;
    this.xScale = scaleLinear()
      .domain([xMin, xMax])
      .range([0, this.innerWidth]);

    this.yScale = scaleLinear()
      .domain([yMin, yMax])
      .range([this.innerHeight, 0]);

    // ========== ADD SCALES TO CANVAS ==========

    // Horizontal scale
    svg
      .append("g")
      .attr("transform", `translate(0,${this.innerHeight})`)
      .call(axisBottom(this.xScale));
    // Vertical scale
    svg.append("g").call(axisLeft(this.yScale));

    // ========== SCALES TO CANVAS ==========

    // TODO: Get this info dynamically from data
    // Color scale: give me a specie name, I return a color
    const color = scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica"])
      .range(["#440154ff", "#21908dff", "#fde725ff"]);

    // ========== ADD BUBBLES ==========
    const that = this;
    this.circles = svg
      .append("g")
      .selectAll("circle")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("cx", d => {
        return this.xScale(d.Sepal_Length);
      })
      .attr("cy", d => {
        return this.yScale(d.Petal_Length);
      })
      .attr("r", 8)
      .on("mouseenter", function(d) {
        const el = select(this);
        el.classed("bubble-hover", true);
      })
      .on("mouseout", function(d) {
        const el = select(this);
        el.classed("bubble-hover", false);
      })
      .on("click", function(d) {
        console.log("d: ", d);
        const el = select(this);
        el.classed("single-selected", true);
        that.selectOne(el, d);
      })
      .style("fill", d => {
        return color(d.Species);
      })
      .style("opacity", 0.5);

    // ========== ADD AREA SELECTION FEATURE ==========
    // debugger;
    svg.call(
      brush()
        .extent([
          [0, 0],
          [this.innerWidth + this.padding.right, this.innerHeight]
        ])
        // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area...
        .on("start brush", this.updateChart.bind(this))
        .on("end", this.getSelecion.bind(this))
    );
  }
  
  selectOne(el, param) {
    // single-selected
    // TODO: add single selected item
    // this.selectionRanges.unshift(param);
    console.log(param);
  }

  getSelecion() {
    const coords = event.selection;
    if (!coords) {
      return;
    }
    this.selectedDots = [];
    this.circles &&
      this.circles.classed("selected", d => {
        const cx = this.xScale(d.Sepal_Length);
        const cy = this.yScale(d.Petal_Length);
        let x0 = coords[0][0],
          x1 = coords[1][0],
          y0 = coords[0][1],
          y1 = coords[1][1];
        const isSelected = x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
        if (isSelected) {
          this.selectedDots.unshift(d);
        }
        return isSelected;
      });
    const ranges = this.getSelectionRanges(this.selectedDots);
    if(ranges) {
      this.selectionRanges.unshift(ranges);
    }
  }

  get rangesStr() {
    let str = '';
    this.selectionRanges.forEach(item =>{

    })
    return null;
  }
  private getSelectionRanges(selection) {
    const newSelection = (selection || []);
    if (!newSelection.length) {
      return null;
    }
    const data01 = newSelection[0];
    let xMax = data01.Sepal_Length || 0;
    let xMin = xMax;
    let yMax = data01.Petal_Length || 0;
    let yMin = yMax;

    newSelection.forEach(item => {
      xMax = Math.max(xMax, item.Sepal_Length);
      xMin = Math.min(xMin, item.Sepal_Length);
      yMax = Math.max(yMax, item.Petal_Length);
      yMin = Math.min(yMin, item.Petal_Length);
    });
    return {rangeY: {min: yMin, max: yMax}, rangeX: {min: xMin, max: xMax}, numberOfItems: newSelection.length }
  }

  updateChart() {
    const extent = event.selection;
    this.circles &&
      this.circles.classed("selected", d => {
        return this.isBrushed(
          extent,
          this.xScale(d.Sepal_Length),
          this.yScale(d.Petal_Length)
        );
      });
  }

  private isBrushed(brush_coords, cx, cy) {
    var x0 = brush_coords[0][0],
      x1 = brush_coords[1][0],
      y0 = brush_coords[0][1],
      y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    // This return TRUE or FALSE depending on if the points is in the selected area.
  }

  ngOnDestroy() {
    this.keyDownSubscription.unsubscribe();
  }
}
