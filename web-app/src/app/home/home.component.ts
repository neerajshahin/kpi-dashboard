import { Component, ViewChild, ElementRef } from '@angular/core';
import { WindowRef } from '../services/Window';
import { Chart } from 'chart.js';
import { ApiDashboardServices } from '../services/dashboard.service'

import { AppState } from '../app.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>

  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html',
  providers: [ApiDashboardServices]
})
export class Home {
  @ViewChild('chart1') private chart1: ElementRef;
  @ViewChild('chart2') private chart2: ElementRef;
  @ViewChild('chart3') private chart3: ElementRef;
  @ViewChild('chart4') private chart4: ElementRef;
  @ViewChild('chart5') private chart5: ElementRef;
  @ViewChild('chart6') private chart6: ElementRef;
  @ViewChild('chart7') private chart7: ElementRef;

  //@ViewChild('myChart1') myChart1: ElementRef;
  // Set our default values
  localState = { value: '' };
  chartHeight = parseInt(this.winRef.nativeWindow.innerHeight) / 3.4;
  // TypeScript public modifiers
  constructor(public appState: AppState, public apiDashboardServices: ApiDashboardServices, public winRef: WindowRef) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    console.log('Native window obj', this.winRef.nativeWindow.innerHeight);
    let dashboardData;
    this.apiDashboardServices.getDashboardData().subscribe(response => {
      if (response.code == 200) {
        dashboardData = response;
        console.log("dashboard: " + dashboardData);
      }
    }, err => {
      console.log("failure: " + err);
    });

    Chart.pluginService.register({
      beforeRender: function (chart) {
        if (chart.config.options.showAllTooltips) {
          // create an array of tooltips
          // we can't use the chart tooltip because there is only one tooltip per chart
          chart.pluginTooltips = [];
          chart.config.data.datasets.forEach(function (dataset, i) {
            chart.getDatasetMeta(i).data.forEach(function (sector, j) {
              chart.pluginTooltips.push(new Chart.Tooltip({
                _chart: chart.chart,
                _chartInstance: chart,
                _data: chart.data,
                _options: chart.options.tooltips,
                _active: [sector]
              }, chart));
            });
          });

          // turn off normal tooltips
          chart.options.tooltips.enabled = false;
        }
      },
      afterDraw: function (chart, easing) {
        if (chart.config.options.showAllTooltips) {
          // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
          if (!chart.allTooltipsOnce) {
            if (easing !== 1)
              return;
            chart.allTooltipsOnce = true;
          }

          // turn on tooltips
          chart.options.tooltips.enabled = true;
          Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
            tooltip.initialize();
            tooltip.update();
            // we don't actually need this since we are not animating tooltips
            tooltip.pivot();
            tooltip.transition(easing).draw();
          });
          chart.options.tooltips.enabled = false;
        }
      }
    });

    // this.title.getData().subscribe(data => this.data = data);
    let salesChart = this.chart1.nativeElement.getContext('2d');
    //let setRevenueChart = this.myChart1.nativeElement.getContext('2d');
    let data = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [{
        label: 'books',
        data: [10, 19, 3, 5],
        backgroundColor: [
          'rgba(92, 184, 92, 1)',
          'rgba(92, 184, 92, 1)',
          'rgba(92, 184, 92, 1)',
          'rgba(92, 184, 92, 1)'
        ]
      },
      {
        label: 'journals',
        data: [15, 19, 3, 5],
        backgroundColor: [
          'rgba(91, 105, 188, 1)',
          'rgba(91, 105, 188, 1)',
          'rgba(91, 105, 188, 1)',
          'rgba(91, 105, 188, 1)'
        ]
      }
      ]
    };

    var myChart = new Chart(salesChart, {
      type: 'bar',
      data: data,
      options: {
        // showAllTooltips: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: "white"
            // fontSize: 10
          }
        },
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              max: 100,
              stepSize: 10,
              fontColor: "white"
            }
          }],
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              fontColor: "white"
            }
          }]
        }
      }
    });

    var piedata = {
      labels: ["T&F", "XYZ", "ABC"],
      datasets: [{
        backgroundColor: [
          "#2ecc71",
          "#3498db",
          "#95a5a6"
        ],
        data: [25, 25, 50]
      }]
    };


    var ctx = this.chart2.nativeElement.getContext('2d');
    var myChart1 = new Chart(ctx, {
      type: 'pie',
      data: piedata,
      options: {
        showAllTooltips: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: "white"
            // fontSize: 10
          }
        },
        animate: {
          animateRotate: true,
          duration: 1000,
          animateScale: true,
          animationSteps: 15
        }
      }
    });
  }
  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
