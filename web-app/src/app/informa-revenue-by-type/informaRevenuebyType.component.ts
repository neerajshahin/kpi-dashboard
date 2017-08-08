import { Component, ViewChild, Input, ElementRef, OnChanges } from '@angular/core';
import { WindowRef } from '../services/Window';
import { Chart } from 'chart.js';

@Component({
  selector: 'informaRevenuebyType',
  templateUrl: './informaRevenuebyType.component.html'
})
export class InformaRevenuebyTypeComponent {
  @ViewChild('baseChart') private baseChart: ElementRef;

  chartHeight: number = parseInt(this.winRef.nativeWindow.innerHeight) / 2.8;
  chart;

  constructor(public winRef: WindowRef) {

  }
  @Input() data: any;
  ngOnChanges(changes: any) {
    console.log('ngOnChanges' + JSON.stringify(changes));
    if (this.chart) {
      this.chart.data.labels = []
      this.chart.data.datasets[0].data = [];
      this.chart.update();
      this.chart.data.labels = changes.data.currentValue.labels;
      this.chart.data.datasets[0].data = changes.data.currentValue.data;
      this.chart.update(3000);
    }

  }
  ngOnInit() {
    let chartColors = {
      clr1: '#addcc9',
      clr2: '#dbebc2',
      clr3: '#fdd2b5',
      clr4: '#87a6d5',
      clr5: '#f48b94',
      clr6: '#4DB6AC',
      clr7: '#4FC3F7',

    };
    let ctx = this.baseChart.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            chartColors.clr1,
            chartColors.clr2,
            chartColors.clr3,
            chartColors.clr4,
            chartColors.clr5
          ]
        }]
      },
      options: {
        labels:{
            position: 'outside'
        },
        //showAllTooltips: true,
        elements: { arc: { borderWidth: 0 } },
  
        pieceLabel: {
            render: function (args) {
                return '£ ' + args.value;
            },
            position: 'outside',
         },
        //,
        // tooltips: {
        //   xAlign: 'center',
        //   yAlign: 'center',
        //   callbacks: {
        //     // use label callback to return the desired label
        //     label: function (tooltipItem, data) {
        //       return "£ "+Math.round(data.datasets[0].data[tooltipItem.index]).toFixed(1);
        //     },
        //     position: 'outside'
        //   }
        // },
        maintainAspectRatio: false
      }
    });
  }

}