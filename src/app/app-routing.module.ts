import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'question',
    loadChildren: () => import('./pages/question/question.module').then(m => m.QuestionPageModule)
  },
  {
    path: 'results',
    loadChildren: () => import('./pages/results/results.module').then(m => m.ResultsPageModule)
  },
  {
    path: 'answers',
    loadChildren: () => import('./pages/answers/answers.module').then(m => m.AnswersPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
