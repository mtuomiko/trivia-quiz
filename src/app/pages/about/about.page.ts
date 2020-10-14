import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
  }

  openLink(url: string) {
    const browser = this.iab.create(url, '_system');
  }

}
