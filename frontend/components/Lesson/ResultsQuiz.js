import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Jumbotron, FormControl, FormGroup, ControlLabel, Radio, Checkbox } from 'react-bootstrap';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      answer: null,
      relatedSlides: null,
      mcType: null,
      studentAnswers: null,
      correct: 'na'
    }
  }

  componentWillMount() {
    let correct;
    let answer = this.props.answer;
    if (this.props.question.length) {
      if (this.props.mcType === 'radio'){
        let answers = this.props.answer.filter(answer => answer.correctness === 'correct').map(answers => answers.answer)
        if (answers[0] === this.props.student){
          correct = 'correct-answer';
        } else {
          correct = 'incorrect-answer'
        }
      } else if (this.props.mcType === 'checkbox'){
        let answers = this.props.answer.filter(answer => answer.correctness === 'correct').map(answers => answers.answer);
        let testAnswers = this.props.student.split(',').map(answer => answer.trim())
        let checkCheckbox = testAnswers.every(sAnswer => answers.indexOf(sAnswer.trim()) >= 0)
        if (checkCheckbox && testAnswers.length === answers.length){
          correct = 'correct-answer';
        } else {
          correct = 'incorrect-answer'
        }
      }
      this.setState({
        question: this.props.question,
        answer: answer,
        relatedSlides: this.props.relatedSlides,
        mcType: this.props.mcType,
        studentAnswers: this.props.student,
        correct: correct
      }, () => {
        console.log('this.state', this.state)
      })
    }
  }

  render() {
    return (
      <div className="question-view">
        {this.state.question ?
        <div>
          <h3>{this.state.question}</h3>
          {this.state.mcType === "false" ?
            <FormGroup controlId="formControlsShortAnswer">
              <ControlLabel>Short Answer</ControlLabel>
              <FormControl
                componentClass="textarea"
                defaultValue={`Correct answer: ${this.state.answer}`}
                disabled
              />
            </FormGroup> :
            <div>
              <FormGroup controlId="formControlsMultipleChoice">
              {this.state.mcType === 'checkbox' ?
                  this.state.answer.map((answer, index) => {
                    if (answer.answer) {
                      return (
                        <Checkbox disabled key={index} value={answer.correctness} onChange={this.answerChange}>{`Answer: ${answer.answer} :   `}<strong>{`${answer.correctness}`}</strong></Checkbox>
                      )
                    }
                  })
                :
                  this.state.answer.map((answer, index) => {
                    if (answer.answer) {
                      return (
                        <Radio disabled key={index} value={answer.correctness} onChange={this.answerChange}>{`Answer: ${answer.answer} :   `}<strong>{`${answer.correctness}`}</strong></Radio>
                      )
                    }
                  })
              }
              </FormGroup>
            </div>
          } <h4 className={this.state.correct}>{`You answered: ${this.state.studentAnswers}`}</h4></div> : <div></div>
        }
      </div>
    )
  }
}

export default Results;
