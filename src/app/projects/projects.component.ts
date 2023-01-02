import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  projectDescription: string = '';

  projectContent = [
    {
      title: 'The Collection of',
      heading: 'My Projects',
      description:
        'Check out the projects I have built to see my web development skills and experience. I have created numerous websites and web applications for various clients. My work showcases the quality and capability of my skills.',
    },
  ];

  cardCollection_1 = [
    {
      title: 'Hulu Clone',
      imgSrc: '../../assets/images/projectImages/hulu.png',
      cardDesc: 'React + Tailwind Css',
      redirectTo: 'https://huluclone-gq08qulf2-sahilmandre.vercel.app/',
    },
    {
      title: 'Design SympoSium',
      imgSrc: '../../assets/images/projectImages/designSymposium.jpg',
      cardDesc: 'Wordpress + Custom SCSS',
      redirectTo: 'https://designsymposium.in/',
    },
  ];

  cardCollection_2 = [
    {
      title: 'Portfolio 2021',
      imgSrc: '../../assets/images/projectImages/portfolio2021.jpg',
      cardDesc: 'React + Html + CSS',
      redirectTo: 'https://potfolio-sahil.web.app/',
    },
    {
      title: 'BootStrap Demo',
      imgSrc: '../../assets/images/projectImages/bsdemo.jpg',
      cardDesc: 'Html + CSS + Bootstrap',
      redirectTo: 'https://sahilmandre.github.io/bootstrapdemo/',
    },
  ];
}
