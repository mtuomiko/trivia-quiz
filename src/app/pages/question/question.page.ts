import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {


  constructor(
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.quizService.init();
  }

  private continue() {
    if (this.quizService.isFinished()) {
      this.router.navigateByUrl('results');
    } else {
      this.quizService.nextQuestion();
    }
  }

}
