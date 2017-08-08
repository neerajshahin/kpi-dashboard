import { Component, ViewChild, ElementRef, Output } from '@angular/core';
import { WindowRef } from '../services/Window';
import { Chart } from 'chart.js';
import { ApiDashboardServices } from '../services/dashboard.service'
import { Observable } from 'rxjs/Rx';
import { AppState } from '../app.service';
import { JSON_DATA } from '../dummy/data';

@Component({
  selector: 'home',  // <home></home>
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html',
  providers: [ApiDashboardServices]
})
export class Home {
  // Set our default values
  localState = { value: '' };
  chartHeight = parseInt(this.winRef.nativeWindow.innerHeight) / 3.4;
  private revenue: any;
  private dividend: any;
  private revenueByType: any;
  private revenueByRegion: any;
  private revenuebyRegionDivLevel: any;
  private publicationJourney: any;
  private sharePrice: any;

  private isCardClicked: boolean;
  private clickedCard: any;
  private clickedCanvasHeight: string;
  private clickedCanvas: any;
  private expandIcon: any;

  // TypeScript public modifiers
  constructor(public appState: AppState, public apiDashboardServices: ApiDashboardServices, public winRef: WindowRef, public eleRef: ElementRef) {
    this.setChartPlugin();

  }

  ngOnInit() {
    let data;
    // =JSON_DATA.DATA;
    // this.setDashBoardData(data);
    this.apiDashboardServices.getDashboardData().subscribe(response => {
      if (response.status == 200) {
        data = response.data.data;
        console.log("dashboard: " + data);
        this.setDashBoardData(data);
      }
    }, err => {
      console.log("failure: " + err);
    });

    //Observable : calling service in every 10 sec to update latest data into dashboard
    Observable.interval(8000).subscribe(x => {
      this.setDashBoardData(data);
      this.apiDashboardServices.getDashboardData().subscribe(response => {
        if (response.status == 200) {
          data = response.data.DATA;
          console.log("dashboard: " + data);
          this.setDashBoardData(data);
        }
      }, err => {
        console.log("failure: " + err);
      });
    });

  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  //return chart
  setDashBoardData(data) {
    if (data) {
      this.revenue = this.getInformaRevenue(data.InformaRevenue);
      this.dividend = this.getInformaDividend(data.Dividend);
      this.revenueByType = this.getInformaRevenueByType(data.RevenueByType);
      this.revenueByRegion = this.getInformaRevenueByRegion(data.RevenueByRegion);
      this.revenuebyRegionDivLevel = this.getInformaRevenuebyRegionDivLevel(data.RevenueByRegion);
      this.publicationJourney = this.getInformaPublicationJourney(data.PublicationJourney);
      this.sharePrice = this.getInformaSharePrice(data.SharePrice);
    }
  }

  //return revenue by type data
  getInformaRevenue(revenue: any) {
    let division_keys = Object.keys(revenue.Divisioninfo);
    let labels = [];
    let datasets = [];
    let revenueData = {};
    for (let key of division_keys) {
      labels.push(revenue.Divisioninfo[key]);
    }
    for (let revType of this.getKeys(revenue.Revenue)) {
      let dataLabel = revType;
      let data = [];
      let dataset = [];
      for (let key of division_keys) {
        data.push(revenue.Revenue[revType][key]);
      }
      dataset['label'] = dataLabel;
      dataset['data'] = data;
      datasets.push(dataset);
    }
    revenueData['labels'] = labels;
    revenueData['datasets'] = datasets;
    return revenueData;
  }

  //return informa dividend data
  getInformaDividend(dividend: any) {
    let company_keys = Object.keys(dividend.Companynfo);
    let labels = [];
    let datasets = [];
    let dividendData = {};
    for (let key of company_keys) {
      labels.push(dividend.Companynfo[key]);
    }
    for (let year of this.getKeys(dividend.Years)) {
      let dataLabel = year;
      let data = [];
      let dataset = [];
      for (let key of company_keys) {
        data.push(dividend.Years[year][key]);
      }
      dataset['label'] = dataLabel;
      dataset['data'] = data;
      datasets.push(dataset);
    }
    dividendData['labels'] = labels;
    dividendData['datasets'] = datasets;
    return dividendData;
  }


  //return revenue by type data
  getInformaRevenueByType(revenueByType: any) {
    let labels = Object.keys(revenueByType.Revenuebytype);
    let data = [];
    let revenueByTypeData = {};
    for (let i = 0; i < labels.length; i++) {
      if ('Total' != labels[i]) {
        let total = revenueByType.Revenuebytype.Total[labels[i].replace(/\s/g, '')];
        data.push(total);
      } else {
        labels.splice(i, 1);
      }
    }
    revenueByTypeData['labels'] = labels;
    revenueByTypeData['data'] = data;
    return revenueByTypeData;
  }


  //return revenue by region data
  getInformaRevenueByRegion(revenueByRegion: any) {
    let region_keys = Object.keys(revenueByRegion.RegionInfo);
    let labels = [];
    let data = [];
    let revenueByRegionData = {}
    for (let key of region_keys) {
      labels.push(revenueByRegion.RegionInfo[key]);
      data.push(revenueByRegion.Region.Total[key]);
    }
    revenueByRegionData['labels'] = labels;
    revenueByRegionData['data'] = data;
    return revenueByRegionData;
  }

  //return revenue by region division level data
  getInformaRevenuebyRegionDivLevel(revenue: any) {
    let division_keys = Object.keys(revenue.Divisioninfo);
    let labels = [];
    let datasets = [];
    let revenueData = {};
    for (let key of division_keys) {
      labels.push(revenue.Divisioninfo[key]);
    }
    for (let region of this.getKeys(revenue.Region)) {
      if ('Total' != region) {
        let dataLabel = region;
        let data = [];
        let dataset = [];
        for (let key of division_keys) {
          data.push(revenue.Region[region][key]);
        }
        dataset['label'] = dataLabel;
        dataset['data'] = data;
        datasets.push(dataset);
      }
    }
    revenueData['labels'] = labels;
    revenueData['datasets'] = datasets;
    return revenueData;
  }

  //return publication journey data
  getInformaPublicationJourney(publicationJourney: any) {
    let division_keys = this.getKeys(publicationJourney.Journeyinfo);
    let labels = [];
    let datasets = [];
    let revenueData = {};
    for (let key of division_keys) {
      labels.push(publicationJourney.Journeyinfo[key]);
    }
    for (let journry of this.getKeys(publicationJourney.Journey)) {
      let dataLabel = journry;
      let data = [];
      let dataset = [];
      for (let key of division_keys) {
        data.push(publicationJourney.Journey[journry][key]);
      }
      dataset['label'] = dataLabel;
      dataset['data'] = data;
      datasets.push(dataset);
    }
    revenueData['labels'] = labels;
    revenueData['datasets'] = datasets;
    return revenueData;
  }


  //return informa share price data
  getInformaSharePrice(sharePrice: any) {
    let daysCount = parseInt(sharePrice.DaysCount);
    let companiesCount = parseInt(sharePrice.DaysCount);
    let days_key = Object.keys(sharePrice.Dates);
    let companey_key = Object.keys(sharePrice.CompanyInfo);
    let share_key = Object.keys(sharePrice.shareprice);
    let labels = [];
    let company = [];
    let shareprice = [];
    let shareData = {};
    for (let i = 0; i < companiesCount; i++) {
      let companyshareprice = [];
      for (let j = 0; j < daysCount; j++) {
        companyshareprice[j] = sharePrice.shareprice[share_key[j]][companey_key[i]];
      }
      shareprice[i] = companyshareprice;
    }
    let datasets = [];
    for (let i = 0; i < daysCount; i++) {
      labels[i] = sharePrice.Dates[days_key[i]];
      let dataLabel = sharePrice.CompanyInfo[companey_key[i]];
      let data = [];
      data["label"] = dataLabel;
      data["data"] = shareprice[i];
      datasets[i] = data;
    }
    shareData['labels'] = labels.reverse();
    shareData['datasets'] = datasets;
    return shareData;
  }

  //return jsonObject keys array
  getKeys(json: any) {
    let arr_sources = Object.keys(json);
    return arr_sources;
  }


  //set defult behavior for charts using chart plugin service
  setChartPlugin() {

    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#000';
    Chart.defaults.global.legend.fontColor = '#000';
    


    Chart.pluginService.register({
      beforeRender: function (chart) {
        chart.options.legend.labels.boxWidth = 10;
        chart.options.legend.labels.padding = 5;
        chart.options.legend.position = "bottom";
        chart.options.legend.labels.fontSize = 12;
        chart.options.legend.labels.fontColor = "black";
        chart.options.maintainAspectRatio = false;


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
          chart.options.tooltips.displayColors = false;
          chart.options.tooltips.backgroundColor = "transparent";
          chart.options.tooltips.bodyFontColor = "black";

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

  }

  // should exopand div on click of expand icon
  onExpandClick = function (event) {
    if (!this.clicked) {
      this.expandIcon = event.currentTarget;
      this.expandIcon.classList.remove("fa-expand");
      this.expandIcon.classList.add("fa-compress");
      // getting card container-node
      this.clickedCard = this.expandIcon.parentNode.parentNode.parentNode;
      this.clickedCard.classList.add("fullscreen");
      this.clickedCanvas = this.clickedCard.getElementsByTagName("canvas")[0];
      this.clickedCanvasHeight = this.clickedCanvas.style.height;
      this.clickedCanvas.style.height = "80vh";
      this.clicked = true;
    } else {
      this.expandIcon.classList.remove("fa-compress");
      this.expandIcon.classList.add("fa-expand");
      this.clickedCard.classList.remove("fullscreen");
      this.clickedCanvas.style.height = this.clickedCanvasHeight;
      this.clicked = false;
    }
  }
}

/**
 * [Chart.PieceLabel.js]{@link https://github.com/emn178/Chart.PieceLabel.js}
 *
 * @version 0.7.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2017
 * @license MIT
 */
(function () {
  function PieceLabel() {
    this.drawDataset = this.drawDataset.bind(this);
  }

  PieceLabel.prototype.beforeDatasetsUpdate = function (chartInstance) {
    if (this.parseOptions(chartInstance) && this.position === 'outside') {
      var padding = this.fontSize * 1.5 + 2;
      chartInstance.chartArea.top += padding;
      chartInstance.chartArea.bottom -= padding;
    }
  };

  PieceLabel.prototype.afterDatasetsDraw = function (chartInstance) {
    if (!this.parseOptions(chartInstance)) {
      return;
    }
    this.labelBounds = [];
    chartInstance.config.data.datasets.forEach(this.drawDataset);
  };

  PieceLabel.prototype.drawDataset = function (dataset) {
    var ctx = this.ctx;
    var chartInstance = this.chartInstance;
    var meta = dataset._meta[Object.keys(dataset._meta)[0]];
    var totalPercentage = 0;
    for (var i = 0; i < meta.data.length; i++) {
      var element = meta.data[i],
        view = element._view, text;

      //Skips label creation if value is zero and showZero is set
      if (view.circumference === 0 && !this.showZero) {
        continue;
      }
      switch (this.render) {
        case 'value':
          var value = dataset.data[i];
          if (this.format) {
            value = this.format(value);
          }
          text = value.toString();
          break;
        case 'label':
          text = chartInstance.config.data.labels[i];
          break;
        case 'percentage':
        default:
          var percentage = view.circumference / this.options.circumference * 100;
          percentage = parseFloat(percentage.toFixed(this.precision));
          totalPercentage += percentage;
          if (totalPercentage > 100) {
            percentage -= totalPercentage - 100;
            // After adjusting the percentage, need to trim the numbers after decimal points again, otherwise it may not show
            // on chart due to very long number after decimal point.
            percentage = parseFloat(percentage.toFixed(this.precision));
          }
          text = percentage + '%';
          break;
      }
      if (typeof this.render === 'function') {
        text = this.render({
          label: chartInstance.config.data.labels[i],
          value: dataset.data[i],
          percentage: percentage
        });
      }
      ctx.save();
      ctx.beginPath();
      ctx.font = Chart.helpers.fontString(this.fontSize, this.fontStyle, this.fontFamily);
      var position, innerRadius, arcOffset;
      if (this.position === 'outside' ||
        this.position === 'border' && chartInstance.config.type === 'pie') {
        innerRadius = view.outerRadius / 2;
        var rangeFromCentre, offset = this.fontSize + 2,
          centreAngle = view.startAngle + ((view.endAngle - view.startAngle) / 2);
        if (this.position === 'border') {
          rangeFromCentre = (view.outerRadius - innerRadius) / 2 + innerRadius;
        } else if (this.position === 'outside') {
          rangeFromCentre = (view.outerRadius - innerRadius) + innerRadius + offset;
        }
        position = {
          x: view.x + (Math.cos(centreAngle) * rangeFromCentre),
          y: view.y + (Math.sin(centreAngle) * rangeFromCentre)
        };
        if (this.position === 'outside') {
          if (position.x < view.x) {
            position.x -= offset;
          } else {
            position.x += offset;
          }
          arcOffset = view.outerRadius + offset;
        }
      } else {
        innerRadius = view.innerRadius;
        position = element.tooltipPosition();
      }

      var fontColor = this.fontColor;
      if (typeof this.fontColor !== 'string') {
        fontColor = this.fontColor[i] || this.options.defaultFontColor;
      }
      if (this.arc) {
        if (!arcOffset) {
          arcOffset = (innerRadius + view.outerRadius) / 2;
        }
        ctx.fillStyle = fontColor;
        ctx.textBaseline = 'middle';
        this.drawArcText(text, arcOffset, view, this.overlap);
      } else {
        var drawable, mertrics = ctx.measureText(text),
          left = position.x - mertrics.width / 2,
          right = position.x + mertrics.width / 2,
          top = position.y - this.fontSize / 2,
          bottom = position.y + this.fontSize / 2;
        if (this.overlap) {
          drawable = true;
        } else if (this.position === 'outside') {
          drawable = this.checkTextBound(left, right, top, bottom);
        } else {
          drawable = element.inRange(left, top) && element.inRange(left, bottom) &&
            element.inRange(right, top) && element.inRange(right, bottom);
        }
        if (drawable) {
          ctx.fillStyle = fontColor;
          ctx.textBaseline = 'top';
          ctx.textAlign = 'center';
          ctx.fillText(text, position.x, position.y - this.fontSize / 2);
        }
      }
      ctx.restore();
    }
  };

  PieceLabel.prototype.parseOptions = function (chartInstance) {
    var pieceLabel = chartInstance.options.pieceLabel;
    if (pieceLabel) {
      this.chartInstance = chartInstance;
      this.ctx = chartInstance.chart.ctx;
      this.options = chartInstance.config.options;
      this.render = pieceLabel.render || pieceLabel.mode;
      this.position = pieceLabel.position || 'default';
      this.arc = pieceLabel.arc;
      this.format = pieceLabel.format;
      this.precision = pieceLabel.precision || 0;
      this.fontSize = pieceLabel.fontSize || this.options.defaultFontSize;
      this.fontColor = pieceLabel.fontColor || this.options.defaultFontColor;
      this.fontStyle = pieceLabel.fontStyle || this.options.defaultFontStyle;
      this.fontFamily = pieceLabel.fontFamily || this.options.defaultFontFamily;
      this.hasTooltip = chartInstance.tooltip._active && chartInstance.tooltip._active.length;
      this.showZero = pieceLabel.showZero;
      this.overlap = pieceLabel.overlap;
      return true;
    } else {
      return false;
    }
  };

  PieceLabel.prototype.checkTextBound = function (left, right, top, bottom) {
    var labelBounds = this.labelBounds;
    for (var i = 0; i < labelBounds.length; ++i) {
      var bound = labelBounds[i];
      var potins = [
        [left, top],
        [left, bottom],
        [right, top],
        [right, bottom]
      ];
      for (var j = 0; j < potins.length; ++j) {
        var x = potins[j][0];
        var y = potins[j][1];
        if (x >= bound.left && x <= bound.right && y >= bound.top && y <= bound.bottom) {
          return false;
        }
      }
      potins = [
        [bound.left, bound.top],
        [bound.left, bound.bottom],
        [bound.right, bound.top],
        [bound.right, bound.bottom]
      ];
      for (var j = 0; j < potins.length; ++j) {
        var x = potins[j][0];
        var y = potins[j][1];
        if (x >= left && x <= right && y >= top && y <= bottom) {
          return false;
        }
      }
    }
    labelBounds.push({
      left: left,
      right: right,
      top: top,
      bottom: bottom
    });
    return true;
  };

  PieceLabel.prototype.drawArcText = function (str, radius, view, overlap) {
    var ctx = this.ctx,
      centerX = view.x,
      centerY = view.y,
      startAngle = view.startAngle,
      endAngle = view.endAngle;

    ctx.save();
    ctx.translate(centerX, centerY);
    var angleSize = endAngle - startAngle;
    startAngle += Math.PI / 2;
    endAngle += Math.PI / 2;
    var mertrics = ctx.measureText(str);
    startAngle += (endAngle - (mertrics.width / radius + startAngle)) / 2;
    if (!overlap && endAngle - startAngle > angleSize) {
      ctx.restore();
      return;
    }
    ctx.rotate(startAngle);
    for (var i = 0; i < str.length; i++) {
      var char = str.charAt(i);
      mertrics = ctx.measureText(char);
      ctx.save();
      ctx.translate(0, -1 * radius);
      ctx.fillText(char, 0, 0);
      ctx.restore();
      ctx.rotate(mertrics.width / radius);
    }
    ctx.restore();
  };

  Chart.pluginService.register({
    beforeInit: function (chartInstance) {
      chartInstance.pieceLabel = new PieceLabel();
    },
    beforeDatasetsUpdate: function (chartInstance) {
      chartInstance.pieceLabel.beforeDatasetsUpdate(chartInstance);
    },
    afterDatasetsDraw: function (chartInstance) {
      chartInstance.pieceLabel.afterDatasetsDraw(chartInstance);
    }
  });
})();

