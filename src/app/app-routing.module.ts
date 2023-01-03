import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ExperienceComponent } from './experience/experience.component';
import { HeroComponent } from './hero/hero.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'home',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: 'about',
  //       component: AboutUsComponent,
  //     },
  //   ],
  // },
  // { path: 'home', component: HeroComponent },
  // { path: 'about', component: AboutUsComponent },
  // { path: 'projects', component: ProjectsComponent },
  // { path: 'experience', component: ExperienceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
