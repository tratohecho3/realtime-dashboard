import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { Subscription } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
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

  ngOnInit() {
    this.getData();
    this.analyticsSubscription = this.analyticsService
      .getNumberOfViewersRealTime()
      .subscribe((data: any) => {
        this.lineChartData = data.lineChartData;
        this.lineChartLabels = data.lineChartLabels;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.analyticsSubscription.unsubscribe();
  }

  public updateChart(): void {
    this.chart.update();
  }

  public getData() {
    this.analyticsService.getData().subscribe((data: any) => {
      this.games = data;
      this.lineChartData = this.graphService.transformData(data);
      this.isLoaded = true;
    });
  }
}
