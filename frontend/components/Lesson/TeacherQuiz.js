import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Jumbotron, FormControl, FormGroup, ControlLabel, Radio, Checkbox } from 'react-bootstrap';

class TeacherQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null, 
      answer: null,
      relatedSlides: null,
      mcType: null
    }
  }

  componentWillMount() {
    var answer;
    // console.log(this.props)
    if (this.props.question.length) {
      if (this.props.mcType === false) {
        answer = this.props.answer;
      } else {
        answer = this.props.answer
        console.log(answer, 'answerrrr')
      }
      console.log(this.props.mcType, 'here is mcTyoe')
      this.setState({
        question: this.props.question,
        answer: answer,
        relatedSlides: this.props.relatedSlides,
        mcType: this.props.mcType
      }, () => {
        console.log(this.state.answer, 'where')

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
              <FormControl componentClass="textarea" placeholder={this.state.answer} disabled/>
            </FormGroup> : 
            <div>
              <FormGroup controlId="formControlsMultipleChoice">
              {this.state.mcType === 'checkbox' ? 
                  this.state.answer.map((answer, index) => {
                    if (answer.answer) {
                      return (
                        <Checkbox disabled key={index}>{`Answer: ${answer.answer} : ${answer.correctness}`}</Checkbox>
                      )
                    }
                  })
                : 
                  this.state.answer.map((answer, index) => {
                    if (answer.answer) {
                      return (
                        <Radio disabled key={index}>{`Answer: ${answer.answer} : ${answer.correctness}`}</Radio>
                      )
                    }
                  })
              } 
              </FormGroup>
            </div>
          } </div> : <div></div>
        }
      </div>
    ) 
  }
}

export default TeacherQuiz;