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
        'Front-end developer at with expertise in UI, Angular, HTML, CSS, etc.I work on an international project called UCH-Product that is supported by Aviva and Diligenta, two of our UK based clients.',
      image: '../../assets/icons/star_FILL0_wght400_GRAD0_opsz48.png',
    },
    {
      title: 'V2 Solutions | V2 Force',
      subtitle:
        'I gained knowledge about Salesforce development while working as an associate software engineer at V2 Force and experienced the lifestyle of working remotely.',
      image: '../../assets/icons/star_FILL0_wght400_GRAD0_opsz48.png',
    },
    {
      title: 'Promact Infotect | Vadodara',
      subtitle:
        'I gained exposure to a variety of technologies while working as a trainee web developer, including NodeJs, Express, MongoDb, HTML, and CSS.',
      image: '../../assets/icons/star_FILL0_wght400_GRAD0_opsz48.png',
    },
  ];
}
