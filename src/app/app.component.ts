import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bagtag';
  urls = [window.location.origin + '/tag/1', window.location.origin + '/tag/2', window.location.origin + '/tag/3'];
}
