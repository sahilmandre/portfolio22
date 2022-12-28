import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  cards: {
    title: string;
    subtitle: string;
    image: string;
  }[] = [
    {
      title: 'Tata Consultancy Services',
      subtitle:
        'Front end developer at TCS, specialization in UI, Angular, Html, css',
      image: '../../assets/icons/star_FILL0_wght400_GRAD0_opsz48.png',
    },
    {
      title: 'Tata Consultancy Services',
      subtitle:
        'Front end developer at TCS, specialization in UI, Angular, Html, css',
      image: '../../assets/icons/star_FILL0_wght400_GRAD0_opsz48.png',
    },
    {
      title: 'Tata Consultancy Services',
      subtitle:
        'Front end developer at TCS, specialization in UI, Angular, Html, css',
      image: '../../assets/icons/star_FILL0_wght400_GRAD0_opsz48.png',
    },
  ];
}
