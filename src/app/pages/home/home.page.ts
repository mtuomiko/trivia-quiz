import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private quizService: QuizService,
    private router: Router,
  ) { }

  public async startQuiz() {
    await this.quizService.loadQuestions();
    this.router.navigateByUrl('question');
  }

  public goToAbout() {
    this.router.navigateByUrl('about');
  }
}
