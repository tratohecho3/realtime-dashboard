import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  constructor(public analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.analyticsService.getNumberOfViewers().subscribe(data => {
      console.log(data, '===data');
    });
  }
}
