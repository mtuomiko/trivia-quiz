import { Injectable } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private questions: Question[];
  private questionCounter: number;
  private startTime: Date;
  private endTime: Date;
  private hasAnswered: boolean;
  private correctAnswers: number;

  constructor() {

  }

  public init() {
    this.questionCounter = 1;
    this.startTime = new Date();
    this.hasAnswered = false;
    this.correctAnswers = 0;
  }

  public async getDefaultQuestions() {
    const resultJson = await fetch('../../assets/data/mythology_questions.json');
    const result = await resultJson.json();
    const resultQuestions = result.results;
    this.shuffleArray(resultQuestions);
    const randomQuestions = resultQuestions.slice(0, 5);
    const modifiedQuestions = randomQuestions.map(q => this.modifyQuestion(q));
    this.questions = modifiedQuestions;
    console.log(this.questions);
  }

  // private createCorrectIndex(q) {
  //   const { correct_answer, incorrect_answers, ...modifiedQuestion } = q;
  //   const wrongAnswerCount = incorrect_answers.length;
  //   modifiedQuestion.answers = incorrect_answers.concat([correct_answer]);
  //   modifiedQuestion.correctIndex = wrongAnswerCount;
  //   return modifiedQuestion;
  // }

  private modifyQuestion(q) {
    const { correct_answer, incorrect_answers, ...modifiedQuestion } = q;
    modifiedQuestion.answers = incorrect_answers.concat([correct_answer]);

    modifiedQuestion.answers = modifiedQuestion.answers.map(a => this.unescapeHTML(a));
    modifiedQuestion.correctAnswer = this.unescapeHTML(correct_answer);
    modifiedQuestion.question = this.unescapeHTML(modifiedQuestion.question);

    this.shuffleArray(modifiedQuestion.answers);
    return modifiedQuestion;
  }

  private unescapeHTML(string) {
    var elt = document.createElement("span");
    elt.innerHTML = string;
    return elt.innerText;
  }

  // In place Durstenfeld shuffle 
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  private shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  public getQuestionCounter() {
    return this.questionCounter;
  }

  public getCorrectAnswers() {
    return this.correctAnswers;
  }

  public getQuestions() {
    return this.questions;
  }

  public getActiveQuestion() {
    return this.questions[this.questionCounter - 1];
  }

  public getNumberOfQuestions() {
    return this.questions.length;
  }

  public getDuration() {
    return this.endTime.getTime() - this.startTime.getTime();
  }

  public checkAnswer(i) {
    this.hasAnswered = true;
    if (this.getActiveQuestion().answers[i] === this.getActiveQuestion().correctAnswer) {
      this.correctAnswers++;
    }
    if (this.questionCounter === this.questions.length) {
      this.endTime = new Date();
    }
  }

  public isFinished() {
    return this.questionCounter === this.questions.length
  }

  public nextQuestion() {
    this.questionCounter++;
    this.hasAnswered = false;
  }
}
