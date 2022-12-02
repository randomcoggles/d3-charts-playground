
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';

import { select } from "d3-selection";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import { axisBottom, axisLeft, max, timeFormat } from "d3";
import d3 from 'd3';
import { HttpClient } from "@angular/common/http";
import { forceSimulation, forceLink, forceManyBody, forceCenter } from "d3-force";

@Component({
  selector: 'simple-network',
  templateUrl: 'simple-network.component.html',
  styleUrls: ['simple-network.component.scss']
})
export class SimpleNetworkComponent implements OnInit{
  
  @ViewChild("chartWrap") private chartWrap: ElementRef;
  margin = {top: 10, right: 30, bottom: 30, left: 40};

  width = 400 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;
  data;

  
  constructor(private http: HttpClient) {}

  ngOnInit(){}
  
  ngAfterViewInit() {this.update();}


  update(){
    let chartWrap: any = select(this.chartWrap.nativeElement);
    chartWrap.append("svg")
    .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    let svg = chartWrap;

    
    this.http.get("./assets/data/simple-network.json", {headers: {'cacheable': 'true'}}).subscribe(
      response => {
        this.data = response as any;
        const data = response as any;
        console.log('this.data: ', this.data)
        
        console.log('\n\n\nHit! ', data, '\n\n\n\n');
        var link = svg
          .selectAll("line")
          .data(data.links)
          .enter()
          .append("line")
          .style("stroke", "#aaa");

    // Initialize the nodes
        var node = svg
          .selectAll("circle")
          .data(data.nodes)
          .enter()
          .append("circle")
          .attr("r", 20)
          .style("fill", "#69b3a2");

    // Let's list the force we wanna apply on the network
        var simulation = 
          forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
          .force("link", forceLink()                               // This force provides links between nodes
          .id(function(d) { return d.id; })                     // This provide  the id of a node
          .links(data.links))
          .force("charge", forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
          .force("center", forceCenter(this.width / 2, this.height / 2))     // This force attracts nodes to the center of the svg area
          .on("end", ticked);


    // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
          link
              .attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node
              .attr("cx", function (d) { return d.x+6; })
              .attr("cy", function(d) { return d.y-6; });
        }
        
      },
      error => {
        console.log(error);
      }
    );

  }



}