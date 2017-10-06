import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Jumbotron, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import QuestionView from './Question.js';

class QuizView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      answers: null,
      relatedSlides: null,
      lessonRef: null,
      complete: false,
      mcTypes: null
    }
  }

  componentDidMount() {
    //get a entered quizcode as prop
    let quizCode = this.props.quizCode;
    //axios.get everything about quiz
    axios.get('/quiz', {params: {quizCode: 3698}})
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
        }, () => {
          console.log('hiiii', this.state)
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    return (
      <div className="student-question">
        <Jumbotron>
          {this.state.questions && !this.state.complete ? 
            this.state.questions.map((question, index) => {
              return (
                <QuestionView key={index}
                  question={question} 
                  answer={this.state.answers[index]}
                  relatedSlides={this.state.answers[index]}
                  mcType={this.state.mcTypes[index]}
                />
              )
            }) : <div></div>
          }
        </Jumbotron>
      </div>
    )
  }
}

export default QuizView;
