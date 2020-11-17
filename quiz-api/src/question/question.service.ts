import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDTO, CreateAnswerDTO, EditQuestionDTO, EditAnswerDTO } from './dto';
import { Answer, Question } from './entities';

@Injectable()
export class QuestionService {

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>
  ) {}

  async createOneQuestion(dto: CreateQuestionDTO) {
    const { answers, ...question } = dto;
    const savedQuestion = await this.questionRepository.save(question);
    const newAnswers = this.answerRepository.create(answers);
    newAnswers.map(answer => answer.question = savedQuestion);

    await this.answerRepository.save(newAnswers);
    return await this.questionRepository.findOne(savedQuestion.id);
  }

  async getManyQuestions() {
    return this.questionRepository.find();
  }

  async getOneQuestion(id: number) {
    const question = await this.questionRepository.findOne(id);
    if (!question) {
      throw new NotFoundException('QUESTION WITH ID DOES NOT EXIST')
    }
    return question;
  }

  async getOneAnswer(id: number) {
    const answer = await this.answerRepository.findOne(id);
    if (!answer) {
      throw new NotFoundException('ANSWER WITH ID DOES NOT EXIST')
    }
    return answer;
  }

  async addAnswer(questionId: number, dto: CreateAnswerDTO) {
    const question = await this.getOneQuestion(questionId);
    const answer = this.answerRepository.create({...dto, question});
    return await this.answerRepository.save(answer);
  }

  async editQuestion(id: number, dto: EditQuestionDTO) {
    const question = this.getOneQuestion(id);
    const editedQuestion = Object.assign(question, dto);
    return await this.questionRepository.save(editedQuestion);
  }

  async editAnswer(id: number, dto: EditAnswerDTO) {
    const answer = this.getOneAnswer(id);
    const editedAnswer = Object.assign(answer, dto);
    return await this.answerRepository.save(editedAnswer);
  }

  async deleteQuestion(id: number) {
    const question = await this.getOneQuestion(id);
    return await this.questionRepository.remove(question);
  }

  async deleteAnswer(id: number) {
    const answer = await this.getOneAnswer(id);
    return await this.answerRepository.remove(answer);
  }

}