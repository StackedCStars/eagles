import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio, Button } from 'react-bootstrap';
import MultipleChoice from './MultipleChoice.js';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      shortAnswer: '',
      mcAnswers: [],
      relatedSlides: [],
      currentQindex: 0,
      mcType: false,
      answerCount: 0,
      type: null,
      disabled: ''
    }

    this.questionChange = this.questionChange.bind(this);
    this.shortAnswerChange = this.shortAnswerChange.bind(this);
    this.mcAnswerChange = this.mcAnswerChange.bind(this);
    this.relatedSlideChange = this.relatedSlideChange.bind(this);
    this.checkedBox = this.checkedBox.bind(this);
    this.filled = this.filled.bind(this);
    this.noMultipleChoice = this.noMultipleChoice.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
    this.saveQuestionForm = this.saveQuestionForm.bind(this);
  }

  questionChange(e) {
    this.setState({
      question: e.target.value
    });
  }

  shortAnswerChange(e) {
    this.setState({
      shortAnswer: e.target.value
    });
  }

  mcAnswerChange(e) {
    this.state.mcAnswers[e.target.index] = e.target.value;
  }

  relatedSlideChange(e) {
    this.setState({
      relatedSlides: e.target.value
    });
  }
  
  checkedBox(e) {
    this.setState({
      mcType: 'checkbox',
      answerCount: 0,
      mcAnswers: ['']
    });
  }

  filled(e) {
    this.setState({
      mcType: 'radio',
      answerCount: 0,
      mcAnswers: ['']
    });
  }

  noMultipleChoice() {
    this.setState({
      mcType: false,
      answerCount: 0,
      mcAnswers: []
    });
  }

  saveAnswer(answer, correctness) {
    let temp = this.state.mcAnswers;
    temp.push({answer, correctness})
    this.setState({
      mcAnswers: temp
    });
  }

  addOption() {
    let temp = this.state.mcAnswers;
    temp.push('');
    this.setState({
      mcAnswers: temp
    });
  }

  deleteOption(e) {
    let temp = [];
    this.state.mcAnswers.map((answer, index) => {
      if(answer !== e.target.value) {
        temp.push(answer);
      }
    });
    this.setState({
      mcAnswers: temp
    });
  }

  saveQuestionForm() {
    //send question, answers, and slides
    let q = this.state.question;
    let sA = this.state.shortAnswer;
    let mcA = this.state.mcAnswers;
    let slides = this.state.relatedSlides;
    let mc = this.state.mcType;
    console.log('questionform ', mc)
    this.setState({
      disabled: 'disabled'
    })
    this.props.onSave(q, sA, mcA, slides, mc);
  }

  render() {
    return (
      //div currentQindex
      <div className={this.state.currentQindex}>
        <Form>
          <FormGroup controlId="formControlsQuestion">
            <ControlLabel>Question</ControlLabel>
            {' '}
            <FormControl 
              type="text" 
              placeholder="Write a quiz question" 
              value={this.state.question}
              onChange={this.questionChange}
            />
          </FormGroup>
          {' '}
          <FormGroup controlId="formControlsAnswer">
            <ControlLabel>Answer</ControlLabel>
            {' '}
            <FormControl 
              type="text" 
              placeholder="Provide a short answer example" 
              value={this.state.shortAnswer}
              onChange={this.shortAnswerChange}
            />
          </FormGroup>
          { !this.state.mcType ?
            <div>
              <Button onClick={this.checkedBox}>
                Multiple Correct Answers <Checkbox></Checkbox>
              </Button>
              <Button onClick={this.filled}>
                Single Correct Answer <Radio></Radio>
              </Button>
            </div>
            :
            <div>
              {this.state.mcAnswers.map((answer, i) => {
                return (
                  <div key={answer + i}>
                    <MultipleChoice type={this.state.mcType} key={i} index={i} value={answer} answerChange={this.saveAnswer} deleteOption={this.deleteOption}/>
                  </div>
                )
              }) }
            </div>
          }
          <Button onClick={this.noMultipleChoice} > None </Button>
          {' '}
          <FormGroup controlId="formControlsRelatedSlides">
            <ControlLabel>Slides</ControlLabel>
            {' '}
            <FormControl 
              type="text" 
              placeholder="What are the related slides" 

              onChange={this.relatedSlideChange}
            />
          </FormGroup>
          <Button onClick={this.saveQuestionForm} >Save Question</Button>
        </Form>
      </div>
    )
  }
}

export default Question;

//  <Button key={answer} value={answer} onClick={this.deleteOption}>-</Button> 
// <Button onClick={this.addOption}>+</Button>