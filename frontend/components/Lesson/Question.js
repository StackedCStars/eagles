import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Jumbotron, FormControl, FormGroup, ControlLabel, Radio, Checkbox } from 'react-bootstrap';

class QuestionView extends React.Component {
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
              <FormControl componentClass="testarea" placeholder="Type your answer here" />
            </FormGroup> : 
            <div>
              <FormGroup controlId="formControlsMultipleChoice">
              {this.state.mcType === 'checkbox' ? 
                  this.state.answer.map((answer) => {
                    if (answer.answer) {
                      return (
                        <Checkbox>{answer.answer}</Checkbox>
                      )
                    }
                  })
                : 
                  this.state.answer.map((answer) => {
                    if (answer.answer) {
                      return (
                        <Radio>{answer.answer}</Radio>
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

export default QuestionView;