import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(public wsService: WebsocketService, private http: HttpClient) {}

  getNumberOfViewersRealTime() {
    return this.wsService.listen('number-of-viewers');
  }

  getData() {
    return this.http.get(`${environment.wsUrl}/games/analytics`);
  }
}
