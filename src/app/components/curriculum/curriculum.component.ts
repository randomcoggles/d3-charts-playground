import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-curriculum",
  templateUrl: "./curriculum.component.html",
  styleUrls: ["./curriculum.component.scss"]
})
export class CurriculumComponent implements OnInit {

  @ViewChild ('wrap') wrap: ElementRef;
  
  token: string;
  cellphone = '';
  email = '';
  address = '';
  zip = '';
  subscriptions: any[] = [];
  lang: any = 'en';
  printStyle = `
      .print-button {
        display: none;
      }
			.row {
				display: flex;
			}

			.container {
        argin: 0 auto;
        padding: 0 56px;
			}

			.page-header {
				max-width: 860px;
				margin: 0 auto;
				margin-top: 56px;
				justify-content: space-between;
			}

			.page-header .page-title {
				text-align: right;
			}

			.page-header .name {
				font-size: 46px;
				padding: 0;
				margin: 0;
				font-family: cursive;
			}

			.header-flags {
				margin-right: 8px;
			}

			.header-flags.active {
				border-bottom: solid #020080;
			}

			.header-flags.active::after {
				border: solid 7px transparent;
				border-bottom-color: #020080;
				content: "";
				position: absolute;
				width: 0;
				height: 0;
				margin-left: -19px;
				margin-top: 13px;
			}

			.header-flags img {
				border-radius: 8px;
				width: 25px;
				height: 25px;
				margin-bottom: 0px;
			}

			.c-section {
				max-width: 860px;
				margin: 0 auto;
			}

			.c-section .section-title {
				font-size: 42px;
				margin-bottom: 8px;
				border-bottom: 4px solid;
				font-family: cursive;
				margin-top: 16px;
			}

			.p-data-item-tile {
				font-weight: bold;
			}

			.summary-list {
				padding-left: 15px;
			}

			.summary-list li {
				list-style: none;
			}

			.date-range {
				min-width: 170px;
				display: flex;
				padding-top: 16px;
				font-weight: bold;
			}

			.experience-title {
				font-weight: bold;
        padding-top: 16px;
			}

			.bold {
				font-weight: bold;
			}

			.last-updated {
				font-style: italic;
        font-style: italic;
        display: flex;
        align-items: center;
        justify-content: flex-end;
			}

      img.company-logo {
          display: none;
      }
      .assignments {
        font-weight: bold;
      }
      .btn-more { display: none;}

  `;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    const sub = this.route.queryParams.subscribe(params => {
      const confid = '-----confidential-----'
      this.zip = params["zip"] || "";
      this.cellphone = params["cel"] || confid;
      this.email = params["email"] || confid;
      this.address = params["address"] || confid;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  print(){
    var mywindow = window.open('', 'PRINT', 'height=1200,width=860');
    mywindow.document.write('<html><head><title> Curriculum </title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(this.wrap.nativeElement.innerHTML);
    mywindow.document.write('<style>.print-button{display: none;}' + this.printStyle + '</style></body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    setTimeout(() => { 
      mywindow.print(); 
      mywindow.close();
    }, 1000);
    
    
  }
}
