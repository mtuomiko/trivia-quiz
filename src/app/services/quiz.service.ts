import { Injectable } from '@angular/core';
import { Question } from '../models/question';

const levels = [
  'You got everything right',
  'You got nearly everything right',
  'You got some right',
  'You got none right',
];
const speedLevels = [
  'you were fast',
  'you could have been faster',
];

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
  private currentAnswerIndex: number;
  private userAnswers: string[];

  constructor() {

  }

  public init() {
    this.questionCounter = 1;
    this.startTime = new Date();
    this.hasAnswered = false;
    this.correctAnswers = 0;
    this.userAnswers = [];
  }

  public async loadQuestions() {
    const resultJson = await fetch('../../assets/data/mythology_questions.json');
    const result = await resultJson.json();
    const resultQuestions = result.results;
    this.shuffleArray(resultQuestions);
    const randomQuestions = resultQuestions.slice(0, 5);
    const modifiedQuestions = randomQuestions.map(q => this.modifyQuestion(q));
    this.questions = modifiedQuestions;
  }

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
    return (this.endTime.getTime() - this.startTime.getTime()) / 1000;
  }

  public getHasAnswered() {
    return this.hasAnswered;
  }

  public getCurrentAnswerIndex() {
    return this.currentAnswerIndex;
  }

  public getUserAnswers() {
    return this.userAnswers;
  }

  public checkAnswer(i) {
    if (this.hasAnswered) {
      return
    }
    this.hasAnswered = true;
    this.currentAnswerIndex = i;
    this.userAnswers.push(this.getActiveQuestion().answers[i]);
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

  public getPercentageCorrect() {
    return this.getCorrectAnswers() / this.getNumberOfQuestions();
  }

  public getEvaluation() {
    let result = '';
    let levelIndex = null;
    const fast = (this.getDuration() < (this.getNumberOfQuestions() * 10)) ? true : false;
    if (this.getPercentageCorrect() >= 1) {
      levelIndex = 0;
    } else if (this.getPercentageCorrect() >= 0.8) {
      levelIndex = 1;
    } else if (this.getPercentageCorrect() >= 0.4) {
      levelIndex = 2;
    } else {
      levelIndex = 3;
    }
    result += levels[levelIndex] + ' and ';
    result += fast ? speedLevels[0] : speedLevels[1];
    result += '.'
    return result;
  }
}
