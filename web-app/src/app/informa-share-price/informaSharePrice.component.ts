import { Component, ViewChild, Input, ElementRef, OnChanges } from '@angular/core';
import { WindowRef } from '../services/Window';
import { Chart } from 'chart.js';

@Component({
    selector: 'informaSharePrice',
    templateUrl: './informaSharePrice.component.html'
})
export class InformaSharePriceComponent {
    @ViewChild('baseChart') private baseChart: ElementRef;

    chartHeight: number = parseInt(this.winRef.nativeWindow.innerHeight) / 2.8;
    chart;

    constructor(public winRef: WindowRef) {

    }
    @Input() data: any;
    ngOnChanges(changes: any) {
        console.log('ngOnChanges' + changes);
        if (this.chart) {
            this.chart.data.labels = [];
            for (let i = 0; i < 4; i++) {
                this.chart.data.datasets[i].label = [];
                this.chart.data.datasets[i].data = [];
            }
            this.chart.update();
            for (let i = 0; i < 7; i++) {
                this.chart.data.labels[i] = changes.data.currentValue.labels[i];
                for (let j = 0; j < 4; j++) {
                    this.chart.data.datasets[j].data = changes.data.currentValue.datasets[j].data;
                    this.chart.data.datasets[j].label = changes.data.currentValue.datasets[j].label;
                }
            }
            this.chart.update(3000);
        }
        //level:dates
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
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: '',
                    data: [],
                    backgroundColor: [chartColors.clr1],
                    borderColor: chartColors.clr1,
                    borderDash: [5, 5],
                    fill: false
                },
                {
                    label: '',
                    data: [],
                    backgroundColor: [chartColors.clr2],
                    borderColor: chartColors.clr2,
                    borderDash: [5, 5],
                    fill: false,
                },
                {
                    label: '',
                    data: [],
                    backgroundColor: [chartColors.clr3],
                    borderColor: chartColors.clr3,
                    borderDash: [5, 5],
                    fill: false,
                },
                {
                    label: '',
                    data: [],
                    backgroundColor: [chartColors.clr4],
                    borderColor: chartColors.clr4,
                    borderDash: [5, 5],
                    fill: false,
                }
                ]
            },
            options: {
                maintainAspectRatio: false,
                // showAllTooltips: true,
                // textAline: 'center',
                // textBAseLine: 'bottom',
                "animation": {
                    "duration": 1,
                    "onComplete": function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.fillStyle = 'rgb(0,0,0)';
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'bottom';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = "£" + dataset.data[index];
                                ctx.fillText(data, bar._model.x - 5, bar._model.y - 5);
                            });
                        });
                    }
                },
                // tooltips: {
                //     xAlign: 'right',
                //     yAlign: 'center',
                //     callbacks: {
                //         // use label callback to return the desired label
                //         label: function (tooltipItem, data) {
                //             return "£ "+tooltipItem.yLabel;
                //         },
                //         title: function (tooltipItem, data) {
                //             return;
                //         }
                //     }
                // },
                scales: {
                    xAxes: [{
                        gridLines: { drawBorder :false,display: false },
                        stacked: false,
                        ticks: {
                            beginAtZero: false,
                            fontColor: "#000",
                        }
                    }],
                    yAxes: [{
                        gridLines: { drawBorder :false,display: false },
                        display: true,
                        stacked: false,
                        ticks: {
                            display: false,
                            beginAtZero: false,
                            //max: 800,
                            //stepSize: 50,
                            fontColor: "#000",
                        }
                    }]
                },
            }
        });
    }

}

