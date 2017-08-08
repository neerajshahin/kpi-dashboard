import { Component, ViewChild, Input, ElementRef, OnChanges } from '@angular/core';
import { WindowRef } from '../services/Window';
import { Chart } from 'chart.js';

@Component({
  selector: 'informaPublicationJourney',
  templateUrl: './informaPublicationJourney.component.html'
})
export class InformaPublicationJourneyComponent {
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
      for (let i = 0, l = this.chart.data.datasets.length; i < l; i++) {
        this.chart.data.datasets[i].label = [];
        this.chart.data.datasets[i].data = [];
      }
      this.chart.update();

      this.chart.data.labels = changes.data.currentValue.labels;
      for (let i = 0, l = changes.data.currentValue.datasets.length; i < l; i++) {
        this.chart.data.datasets[i].label = changes.data.currentValue.datasets[i].label;
        this.chart.data.datasets[i].data = changes.data.currentValue.datasets[i].data;
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
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: chartColors.clr1
        }, {
          label: '',
          data: [],
          backgroundColor: chartColors.clr2
        }, {
          label: '',
          data: [],
          backgroundColor: chartColors.clr3
        }],

      },
       options: {
        textBaseline : 'bottom',
        showAllTooltips: true,
        tooltips: {
          xAlign: 'center',
          yAlign: 'center',
          callbacks: {
            // use label callback to return the desired label
            label: function (tooltipItem, data) {
              return tooltipItem.yLabel+" %";
            },
            title: function (tooltipItem, data) {
              return;
            }
          }
        },
        // scaleLineColor: "white",
        scales: {
          xAxes: [{
            gridLines: { color: "#786C69" },
            stacked: true
          }],
          yAxes: [{
            gridLines: { color: "#786C69" },
            stacked: true,
            ticks: {
              beginAtZero: true,
              max: 100,
              stepSize: 10
            }
          }]
        }
      }
    });
  }

}