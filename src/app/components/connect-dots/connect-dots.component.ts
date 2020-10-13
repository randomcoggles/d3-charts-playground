import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-connect-dots",
  templateUrl: "./connect-dots.component.html"
  // styleUrls: ["./connect-dots.component.scss"]
})
export class ConnectDotsComponent implements OnInit {
  dots = [];
  colors = ['green', 'cyan', 'red', 'blue', 'brown', 'purple', 'gray', 'burlywood', 'coral', 'darkmagenta'];
  numberOfDots = 1070;
  vertices: {};
  showSpinner = false;
  nNearestNeighbors = 3;
  verticesPathStr = '';
  canvasArea = {width: 650, height: 550};
  foundPathStr = '';
  connectionsParams: any;

  constructor(private http: HttpClient) {
    // this.dots = this.createRandomDots({width: 600, height: 550}, this.numberOfDots);
    // this.renderGraph();
  }

  ngOnInit() {
    this.showSpinner = true;
    this.http.get('/assets/data/connections.json')
    .subscribe({
      next: (resp: any) => {
        this.connectionsParams = resp;
        this.dots = resp.dots;
        this.vertices = resp.vertices;
        this.verticesPathStr = '';
        Object.values(this.vertices).forEach((vertice: {dot: any, dStr: string}, i)=>{
          this.verticesPathStr += vertice.dStr;
        });
        console.log(resp, '....');
      },
      error: error => {
        console.log(error);
      }
    })
  }
  renderGraph() {      
      this.showSpinner = true;
      this.dots = this.createRandomDots({width: 600, height: 550}, this.numberOfDots);
      this.vertices = {};
      const params = {
            dots: this.dots,
            nNearestNeighbors: this.nNearestNeighbors,
            colors: this.colors
          }
      const vertices =  this.getVertices(params).vertices;
      this.verticesPathStr = '';
      Object.values(vertices).forEach((vertice: {dot: any, dStr: string}, i)=>{
        this.verticesPathStr += vertice.dStr;
      });
      console.log('this.vertices:\t', this.vertices);

    }

  createRandomDots(area, nDots) {
    const dots = [];
    for (var i = 0; i < nDots; i++) {
      var x = Math.floor(Math.random() * area.width);
      var y = Math.floor(Math.random() * area.height);
      dots.push({ x, y, id: i + 1 });
    }
    return dots;
  }

  findNeighboors(dot, dots) {
    const mappedDots = dots.map(d => {
      const dist = Math.sqrt(Math.pow((d.x - dot.x), 2) + Math.pow((d.y - dot.y), 2));
      return {id: d.id, x: d.x, y: d.y, distance: dist};
    })
    const neighboors = mappedDots.sort((a,b)=>{
      return a.distance > b.distance ? 1 : -1;
    })
    return neighboors;
  }

  getVertices(params) {
    const {dots, nNearestNeighbors, colors, strategyDTC} = params;    
    console.log(params)
    const vertices = {};

    if(strategyDTC) {
        console.time('DivideToConquer');
        const placa = {};
        const granularity = 1/20; // var nRegions = 1500/20=75
        const nDots = dots.length;
        const nRegions = nDots * granularity;
        let maxW = 0, maxH = 0;
        dots.forEach((dot,i)=>{
          maxW = Math.max(dot.x, maxW);
          maxH = Math.max(dot.y, maxH);
        });
        var totalArea = maxW * maxH;
        var rectArea = totalArea/nRegions;
        var rectSide = Math.sqrt(rectArea);
        var nSidesW = Math.floor(maxW / rectSide) + 1;
        var nSidesH = Math.floor(maxH / rectSide) + 1;
        console.log({nSidesW, nSidesH, maxW, maxH, totalArea, rectArea, rectSide, nRegions });
        var areas = {};
        var currenAreatX = 0, currentAreaY = 0;

        dots.forEach((dot,i)=>{
          var areaKey = Math.floor(nSidesW / maxW * dot.x)  + '-' + Math.floor(nSidesH / maxH * dot.y);
          areas[areaKey] = areas[areaKey] ? areas[areaKey] : {dots: []}; // Is it better to store it in an array or a hash?
          areas[areaKey].dots.push(dot);
        });
    console.log(areas);
        Object.values(areas).forEach((area: {dots: any[]}, i)=>{
            const dots = area.dots;
            dots.forEach((dot,i)=>{
              var orderedNeighboors = this.findNeighboors(dot, dots.filter(d => (d.id !== dot.id)));        
              orderedNeighboors.slice(0, nNearestNeighbors).forEach((neighboor, j) => {
                const v = [dot.id,neighboor.id].sort().join('-');
                if(!vertices[v]) {
                  let dStr = '';
                  dStr += 'M' + dot.x + ',' + dot.y;
                  dStr += ' L' + neighboor.x + ',' + neighboor.y + ' ';
                  let weight = Math.sqrt(Math.pow((neighboor.x - dot.x), 2) + Math.pow((neighboor.y - dot.y), 2));
                  const vertice = {
                    id: v, weight,
                    dot, neighboor, dStr, 
                    color: colors[i%(colors.length-1)]
                    };

                    dot.vertices = dot.vertices || [];
                    const j = dot.vertices.indexOf(v);
                    if(!(j > -1)) {
                      dot.vertices.push(v);
                    }

                    neighboor.vertices = neighboor.vertices || [];
                    const k = neighboor.vertices.indexOf(v);
                    if(!(k > -1)) {
                      neighboor.vertices.push(v);
                    }
                    
                  vertices[v] = vertice
                }
              });
            });
        });
        console.timeEnd('DivideToConquer');

    } else {
        console.time('NoStrategy');
        dots.forEach((dot,i)=>{
          var orderedNeighboors = this.findNeighboors(dot, dots.filter(d => (d.id !== dot.id)));        
          orderedNeighboors.slice(0, nNearestNeighbors).forEach((neighboor, j) => {
            const v = [dot.id,neighboor.id].sort().join('-');
            if(!vertices[v]) {
              let dStr = '';
              dStr += ' M' + dot.x + ',' + dot.y;
              dStr += ' L' + neighboor.x + ',' + neighboor.y + ' ';
              vertices[v] = {dot, neighboor, dStr, 
                             color: colors[i%(colors.length-1)]
                            };
            }
          });
        });
        console.timeEnd('NoStrategy');
    } // end else
    return {type: 'getVertices', vertices, dots};
  }

saveTextAsFile(textToWrite, fileNameToSaveAs){
    	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'}); 
    	var downloadLink = document.createElement("a");
    	downloadLink.download = fileNameToSaveAs;
    	downloadLink.innerHTML = "Download File";
    	if (window.webkitURL != null){
    		// Chrome allows the link to be clicked
    		// without actually adding it to the DOM.
    		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    	}
      else{
    		// Firefox requires the link to be added to the DOM
    		// before it can be clicked.
    		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    		downloadLink.onclick = () => { document.removeChild(downloadLink)};
    		downloadLink.style.display = "none";
    		document.body.appendChild(downloadLink);
    	}
    
    	downloadLink.click();
    }
    
}
