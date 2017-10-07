import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Jumbotron, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import StudentQuiz from './Question.js';
import TeacherQuiz from './TeacherQuiz.js';
import Results from './ResultsQuiz.js';

class QuizView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      answers: null,
      relatedSlides: null,
      lessonRef: null,
      results: false,
      mcTypes: null,
      studentAnswers: ['']
    }
    this.saveAnswer = this.saveAnswer.bind(this);
  }

  componentDidMount() {
    //get a entered quizcode as prop
    let quizCode = this.props.quizCode;
    //axios.get everything about quiz
    axios.get('/quiz', {params: {quizCode: quizCode}})
      .then((response) => {
        let answers = response.data[0].answers
        answers = JSON.parse(answers)
        console.log('where is the answer', answers )
        this.setState({
          questions: response.data[0].questions,
          answers: answers,
          relatedSlides: response.data[0].relatedSlides,
          lessonRef: response.data[0].lessonRef,
          mcTypes: response.data[0].mcTypes
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  saveAnswer(studentAnswers) {
    let answered = this.state.studentAnswers;
    answered.push(studentAnswers);
    this.setState({ studentAnswers: answered });
  }

  render() {
    return (
      <div className="student-question">
        <Jumbotron>
          {this.state.questions && !this.state.results ? 
            <div>
              {this.state.questions.map((question, index) => {
                return (this.props.role === 'teacher' ? 
                (
                  <TeacherQuiz key={index}
                    question={question} 
                    answer={this.state.answers[index]}
                    relatedSlides={this.state.relatedSlides[index]}
                    mcType={this.state.mcTypes[index]}
                  />
                ) :
                (
                  <StudentQuiz key={index}
                    question={question} 
                    answer={this.state.answers[index]}
                    relatedSlides={this.state.relatedSlides[index]}
                    mcType={this.state.mcTypes[index]}
                    saveAnswer={this.saveAnswer}
                  />
              ))
            })} <h1> </h1> <Button onClick={() => this.setState({results: true})}>I'm Done!</Button>
            </div> : this.state.results ? 
              this.state.questions.map((question, index) => {
                return (
                  <Results key={index}
                    question={question} 
                    answer={this.state.answers[index]}
                    relatedSlides={this.state.relatedSlides[index]}
                    mcType={this.state.mcTypes[index]}
                    student={this.state.studentAnswers[index]}
                  />
                )}
              ) : <div></div>
          }
        </Jumbotron>
      </div>
    )
  }
}

export default QuizView;
