import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private quizService: QuizService,
    private router: Router,
  ) { }

  public startQuiz() {
    this.router.navigateByUrl('question');
  }

  ngOnInit(): void {
    this.quizService.getDefaultQuestions();
  }

}
