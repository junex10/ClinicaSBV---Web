import { Component, OnInit, Input } from '@angular/core';
import * as PrintJS from 'print-js';
import { Globals } from 'src/app/helpers';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  @Input('url') url: string = '';
  @Input('buttonText') buttonText: string = 'Imprimir';
  @Input('isPDF') isPDF: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }

  print = () => {
    const url = this.url;
    const isPDF = this.isPDF;
    if (Globals.isImage(url)) {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        PrintJS({
          printable: url,
          type: 'image'
        });
      }
    }
    else if (Globals.isPdf(url) || isPDF) {
      PrintJS({
        printable: url
      });
    }
    else {
      window.open(url);
    }
  }

}
