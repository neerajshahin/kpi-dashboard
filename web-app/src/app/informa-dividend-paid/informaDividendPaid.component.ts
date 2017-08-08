import { Component, ViewChild, Input, ElementRef, OnChanges } from '@angular/core';
import { WindowRef } from '../services/Window';
import { Chart } from 'chart.js';

@Component({
  selector: 'informaDividendPaid',
  templateUrl: './informaDividendPaid.component.html'
})
export class InformaDividendPaidComponent {
  @ViewChild('baseChart') private baseChart: ElementRef;

  chartHeight: number = parseInt(this.winRef.nativeWindow.innerHeight) / 2.8;
  chart;

  constructor(public winRef: WindowRef) {

  }
  @Input() data: any;
  ngOnChanges(changes: any) {
    console.log('ngOnChanges' + changes);
    if (this.chart) {
      this.chart.data.labels = []
      for (let i = 0; i < 4; i++) {
        this.chart.data.datasets[i].label = [];
        this.chart.data.datasets[i].data = [];
      }
      this.chart.update();
      for (let i = 0; i < 4; i++) {
        this.chart.data.labels[i] = changes.data.currentValue.labels[i];
        this.chart.data.datasets[i].label = changes.data.currentValue.datasets[i].label;
         for (let j = 0; j < 4; j++) {
           this.chart.data.datasets[i].data[j] = changes.data.currentValue.datasets[i].data[j];
         }
      }
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
      type: 'horizontalBar',
      data: {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: [
            chartColors.clr1,
            chartColors.clr1,
            chartColors.clr1,
            chartColors.clr1
          ]
        }, {
          label: '',
          data: [],
          backgroundColor: [
            chartColors.clr2,
            chartColors.clr2,
            chartColors.clr2,
            chartColors.clr2
          ]
        }, {
          label: '',
          data: [],
          backgroundColor: [
            chartColors.clr3,
            chartColors.clr3,
            chartColors.clr3,
            chartColors.clr3
          ]
        }, {
          label: '',
          data: [],
          backgroundColor: [
            chartColors.clr4,
            chartColors.clr4,
            chartColors.clr4,
            chartColors.clr4
          ]
        }]
      },
      options: {
        maintainAspectRatio: false,
        showAllTooltips: true,
        tooltips: {
          xAlign: 'left',
          yAlign: 'center',
          callbacks: {
            // use label callback to return the desired label
            label: function (tooltipItem, data) {
              return "£ "+tooltipItem.xLabel;
            },
            title: function (tooltipItem, data) {
              return;
            }
          }
        },
        scales: {
          xAxes: [{
            gridLines: { display:false},
            display: true,
            scaleLabel: {
              display: false,
            }
          }],
          yAxes: [{
            gridLines: { display:false},
            scaleLabel: {
              display: true,
            },
            ticks: {
                fontSize: 10
            }
          }],

        }
      }
    });
  }


}