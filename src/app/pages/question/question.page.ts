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

  private answerColors(i) {
    if (this.isCorrectAnswerSelected(i)) {
      return 'success'; // correct answer
    }
    if (this.isWrongAnswerSelected(i)) {
      return 'danger';
    }
    return 'maximumblue'; // default color when no answer selected
  }


  private continue() {
    if (this.quizService.isFinished()) {
      this.router.navigateByUrl('results');
    } else {
      this.quizService.nextQuestion();
    }
  }

  private isCorrectAnswerSelected(i) {
    if (!this.quizService.getHasAnswered()) {
      return false;
    }
    const question = this.quizService.getActiveQuestion();
    if (question.answers[i] === question.correctAnswer && this.quizService.getCurrentAnswerIndex() === i) {
      return true;
    }
    return false;
  }

  private isWrongAnswerSelected(i) {
    if (!this.quizService.getHasAnswered()) {
      return false;
    }
    const question = this.quizService.getActiveQuestion();
    if (question.answers[i] !== question.correctAnswer && this.quizService.getCurrentAnswerIndex() === i) {
      return true;
    }
    return false;
  }

}
