import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { Subscription } from 'rxjs';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Label, Color } from 'ng2-charts';
import { GAMES, GameAnalytics } from '../../../../../global/gamesMetadata';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnDestroy {
  analyticsSubscription: Subscription;
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public isLoaded = false;
  public games: GameAnalytics[];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(
    public analyticsService: AnalyticsService,
    public graphService: GraphService
  ) {
    this.games = GAMES;
    this.lineChartLabels = GAMES.map(game => game.name);
    this.lineChartData = [
      {
        data: [],
        label: 'Number of Viewers (Realtime)'
      }
    ];
  }
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    title: {
      fontColor: 'white'
    },
    legend: {
      labels: {
        fontColor: 'white'
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [
        {
          id: 'x-axis-0',
          ticks: {
            fontColor: 'white'
          }
        }
      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: 'white'
          }
        }
      ]
    },
    animation: { duration: 0 },
    annotation: {
      annotations: [{}]
    }
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgb(148,159,177,0.2)',
      borderColor: 'white',
      pointBackgroundColor: 'white',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'white'
    }
  ];
  ngOnInit() {
    this.getData();
    this.analyticsSubscription = this.analyticsService
      .getNumberOfViewersRealTime()
      .subscribe((data: any) => {
        this.games = data;
        this.lineChartData = this.graphService.transformData(data);
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.analyticsSubscription.unsubscribe();
  }

  public updateChart(): void {
    this.chart.update(0);
  }

  public getData() {
    this.analyticsService.getData().subscribe((data: any) => {
      this.games = data;
      this.lineChartData = this.graphService.transformData(data);
      this.isLoaded = true;
    });
  }
}
