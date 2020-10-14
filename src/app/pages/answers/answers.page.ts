import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
})
export class AnswersPage implements OnInit {

  private questions: any[];

  constructor(
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.questions = [];
    this.initializeQuestions();
  }

  private initializeQuestions() {
    const serviceQuestions = this.quizService.getQuestions();
    const userAnswers = this.quizService.getUserAnswers();

    for (let i = 0; i < serviceQuestions.length; i++) {
      const guess = (userAnswers[i] !== serviceQuestions[i].correctAnswer) ? `${userAnswers[i]}` : '';
      const question = {
        question: serviceQuestions[i].question,
        guess: guess,
        answer: serviceQuestions[i].correctAnswer
      };
      this.questions.push(question);
    }
  }

  private endQuiz() {
    this.router.navigateByUrl('home');
  }
}
