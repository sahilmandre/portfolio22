import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent {
  aboutHeadingTitle: string = 'Dedicated towards the world of web.';
  aboutHeadingDescription: string =
    'I construct websites and internet presence for businesses and individuals so that you can get the best results in the least amount of time.';
}
