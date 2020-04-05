import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(public wsService: WebsocketService, private http: HttpClient) {}

  getNumberOfViewersRealTime() {
    return this.wsService.listen('number-of-viewers');
  }

  getData() {
    return this.http.get('http://localhost:5000/games/analytics2');
  }
}
