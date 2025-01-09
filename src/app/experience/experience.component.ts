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
      subtitle: `I'm a React Developer and Front-end developer skilled in UI, HTML, CSS, and more. I worked on the UCH Studio project, supported by UK clients Aviva and Diligenta. Currently, I am working on Hobs Worklist for Malaysian Telecom.`,
      image: '../../assets/icons/star_FILL0_wght400_GRAD0_opsz48.png',
    },
    {
      title: 'V2 Solutions | V2 Force',
      subtitle:
        'I gained knowledge about Salesforce development while working as an associate software engineer at V2 Force and experienced the lifestyle of working remotely.',
      image: '../../assets/icons/star_FILL0_wght400_GRAD0_opsz48.png',
    },
    {
      title: 'Promact Infotech | Vadodara',
      subtitle:
        'I gained exposure to a variety of technologies while working as a trainee web developer, including NodeJs, Express, MongoDb, HTML, and CSS.',
      image: '../../assets/icons/star_FILL0_wght400_GRAD0_opsz48.png',
    },
  ];

  showMore: boolean = false;
  stars: number = 5;
  experienceDescription: string =
    'I have experience working with WordPress, Wix, and Heroku for web development and hosting. I also have experience with NodeJS, React, and Angular for building web applications. In addition, I am proficient in HTML, CSS, Bootstrap, and Tailwind for front-end design and development. I have also worked with MongoDb for database management.';

  mainHeadingDescription: string =
    'I have four years of experience creating websites for various clients and organizations. Proficient in multiple technologies, I am able to deliver high-quality, professional websites that meet the needs of my clients.';

  starsArray = Array(this.stars);
}
