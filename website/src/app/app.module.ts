import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

import { AppComponent } from './app.component';
import { environment } from '../environments/environment.prod';
import { FooterComponent } from './components/footer/footer.component';
import { GraphComponent } from './components/graph/graph.component';
@NgModule({
  declarations: [AppComponent, FooterComponent, GraphComponent],
  imports: [BrowserModule, SocketIoModule.forRoot(config)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
