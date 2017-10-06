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
      studentAnswers: null
    }
    this.answerChange = this.answerChange 
  }

  componentWillMount() {
    var answer;
    if (this.props.question.length) {
      if (this.props.mcType === false) {
        answer = this.props.answer;
      } else {
        answer = this.props.answer
      }
      this.setState({
        question: this.props.question,
        answer: answer,
        relatedSlides: this.props.relatedSlides,
        mcType: this.props.mcType,
        studentAnswers: this.props.student
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
                        <Checkbox disabled key={index} value={answer.correctness} onChange={this.answerChange}>{`Answer: ${answer.answer} : ${answer.correctness}`}</Checkbox>
                      )
                    }
                  })
                : 
                  this.state.answer.map((answer, index) => {
                    if (answer.answer) {
                      return (
                        <Radio disabled key={index} value={answer.correctness} onChange={this.answerChange}>{`Answer: ${answer.answer} : ${answer.correctness}`}</Radio>
                      )
                    }
                  })
              } 
              </FormGroup>
            </div>
          } <h4>{`You answered: ${this.state.studentAnswers}`}</h4></div> : <div></div>
        }
      </div>
    ) 
  }
}

export default Results;