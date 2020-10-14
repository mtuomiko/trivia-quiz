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
  private evaluation: string;

  constructor(
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.percentageCorrect = this.quizService.getPercentageCorrect();
    this.duration = this.quizService.getDuration();
    this.evaluation = this.quizService.getEvaluation();
  }

  private continue() {
    this.router.navigateByUrl('answers');
  }

}
