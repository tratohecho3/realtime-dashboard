import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(public wsService: WebsocketService) {}

  getNumberOfViewers() {
    return this.wsService.listen('number-of-viewers');
  }
}
