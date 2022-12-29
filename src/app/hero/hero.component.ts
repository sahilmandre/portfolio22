import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  isChecked: boolean = false;

  clicked(checked: boolean) {
    this.isChecked = checked;
  }
}
