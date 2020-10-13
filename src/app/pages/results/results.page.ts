import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  private percentageCorrect: number;
  private duration: number;

  constructor(
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.percentageCorrect = this.quizService.getCorrectAnswers() / this.quizService.getNumberOfQuestions();
    this.duration = this.quizService.getDuration() / 1000;
  }

  private continue() {
    this.router.navigateByUrl('answers');
  }
}
