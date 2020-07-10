import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { select } from "d3-selection";
import { scaleLinear, scalePoint } from "d3-scale";
import { line } from "d3-shape";
import { axisBottom, axisLeft } from "d3";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"]
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild("svgWrap") svgWrap: ElementRef;

  @Input() canvasWidth = 600;
  @Input() canvasHeight = 300;

  padding = { top: 50, right: 50, bottom: 50, left: 50 };

  data: any[];

  seasons = [
    {season: 'summer', color: 'yellow'},
    {season: 'autumn', color: 'lightcoral'},
    {season: 'winter', color: 'silver'},
    {season: 'spring', color: '#6ff743'}
    ]

  constructor() {
    // ======= create random data =======

    console.log("this.data.....:\t", this.data);
  }

  generateData() {
    const getSeason = monthNumber => {
      return monthNumber === 11 || monthNumber <= 1
        ? "winter"
        : monthNumber <= 4
        ? "spring"
        : monthNumber <= 7
        ? "summer"
        : monthNumber <= 10
        ? "autumn"
        : "unknown";
    };
    const currentDate = new Date();
    this.data = Array.from({ length: 13 }, (item, i) => {
      const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
        currentDate
      );
      const year = currentDate.getUTCFullYear();
      const monthNumber = currentDate.getUTCMonth();
      let dateStr =
        month + (monthNumber === 0 || i === 0 || i === 12 ? "/" + year : "");
      currentDate.setUTCMonth(monthNumber - 1);
      return {
        date: dateStr,
        value: Math.floor(Math.random() * 1000),
        season: getSeason(monthNumber)
      };
    });
    
    this.update();

  }

  getViewBox() {
    return [0, 0, this.canvasWidth, this.canvasHeight].join(" ");
  }

  ngAfterViewInit() {
    this.generateData();
    // setInterval(() =>{this.generateData();}, 2000);
  }

  update() {
    // ========== CANVAS ==========
    let svg = select(this.svgWrap.nativeElement);
    svg.select('.innert-chart').remove();
    svg = select(this.svgWrap.nativeElement)
      .append("g")
      .attr('class', 'innert-chart')
      .attr(
        "transform",
        `translate(${this.padding.left}, ${this.padding.top})`
      );

    const innerWidth =
      this.canvasWidth - this.padding.left - this.padding.right;
    const innerHeight =
      this.canvasHeight - this.padding.top - this.padding.bottom;

    // ========== CREATE SCALES ==========
    const xScale = scalePoint()
      .domain(this.data.map(d => d.date).reverse())
      .range([0, innerWidth]);

    const yScale = scaleLinear()
      .domain([0, 1000])
      .range([innerHeight, 0]);

    // ========== ADD SCALES TO CANVAS ==========

    // Horizontal scale
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-35) translate(-10, 10)");
    // Vertical scale
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(axisLeft(yScale));

    // ========== ADD FOUR SEASONS ==========

    const seasonData = JSON.parse(JSON.stringify(this.data));
    seasonData.shift();    

    let incrementer = 0;
    const bandWidth = (xScale.range()[1] / xScale.domain().length);
    const bars = svg
      .append("g")
      .attr("class", 'seasons')
      .selectAll("rect")
      .data(seasonData)
      .enter()
      .append("rect")
      .attr("class", d => d.season)
      .attr("x", d => xScale(d.date))
      .attr("y", d => 0)
      .attr("width", d => bandWidth)
      .attr("height", d => innerHeight)
      .attr("fill", "steelblue")
      .attr("opacity", ".3")
      .append("svg:title")
      .text(d => d.season);

    // add the X gridlines
    const gridY = svg.append("g").attr("class", "grid");
    gridY.call(
      axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat("") // To take at this. See what it means
    );
    gridY
      .selectAll("line")
      .attr("stroke", "rgba(70, 130, 180, 0.3)")
      .attr("class", "y grid-line");
    // add the X gridlines
    const gridX = svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + innerHeight + ")");
    gridX.call(
      axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickFormat("") // To take at this. See what it means
    );
    gridX
      .selectAll("line")
      .attr("stroke", "rgba(70, 130, 180, 0.3)")
      .attr("class", "x grid-line");

    //  ========== ADD LINE TO CHAR ==========

    svg
      .append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .attr(
        "d",
        line()
          .x(d => xScale(d.date))
          .y(d => yScale(d.value))
      );

    // ========== ADD DOTS TO LINES ==========

    const bubbles = svg
      .append("g")
      .attr("class", "line-dots")
      .selectAll(".bubble");

    const smileys = val => {
      return val < 250
        ? "sad"
        : val < 500
        ? "worried"
        : val < 750
        ? "neutral"
        : "happy";
    };
    const g = bubbles
      .data(this.data)
      .enter()
      .append("g")
      .attr("class", "line-dot");

    g.append("use")
      .attr("class", "sad")
      .attr("href", d => {
        const smiley = "#smiley-" + smileys(d.value);
        console.log("smiley:\t", smiley);
        return smiley;
      })
      .attr("x", d => xScale(d.date) - 20)
      .attr("y", d => yScale(d.value) - 20)
      .attr("item-index", (d, i) => i)
      // .style('transform', 'scale(.5)') // Can't scale
      .on("mouseenter", function(d) {
        const el = select(this);
        el.classed("dot-hover", true);
      })
      .on("mouseout", function(d) {
        const el = select(this);
        el.classed("dot-hover", false);
      });
    const t = svg.selectAll(".line-dot");
    t.each(function(item) {
      console.log(item);
      select(this).append("g");
      // .attr("cx", d => xScale(d.date))
      // .attr("cy", d => yScale(d.value))
      // .html(`
      // <g transform="scale(.2)">
      //   <circle cx="50" cy="50" r="50" stroke-width="6" stroke="black" fill="yellow"/>
      //   <circle id="blackcircle" cx="30" cy="30" r="10" fill="black"/>
      //   <circle id="blackcircle" cx="70" cy="30" r="10" fill="black"/>
      //   <g transform="translate(85,85) rotate(180)">
      //   <path d="M0,0 A40,40 10 0,0 65,0" fill="none" stroke="black" stroke-width="5"></path>
      //   </g>
      // </g>
      // `);
    });
    console.log("....");
  } // End update method
}
