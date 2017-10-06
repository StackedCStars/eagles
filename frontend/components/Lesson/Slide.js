import React from 'react';
import { Button } from 'react-bootstrap';
import Quiz from './Quiz.js';

class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getQuizCode: false,
      quizCode: null
    }
  }
  
  goToQuiz(e) {
    let code = e.target.value;
    this.setState({
      quizCode: code
    })
  }

  render() {
    return (
      <div>
      {!this.state.quizCode ? 
        (<div style={slideContainerStyle}>
          <h1>{ this.props.slideData.name || 'No Slide Name' }</h1>
          <div className="youtubeVideoContainer">
          { this.props.videoIdOfClickedOnVideo ? (
            <iframe style={{width: 500, height: 350, float: "left"}} className="youtubeVideo" src={ 'https://www.youtube.com/embed/' + this.props.videoIdOfClickedOnVideo} allowFullScreen></iframe>
          ) : (
            <div></div>
          )}
            <p className="slideText">{this.props.slideData.text}</p>
          </div>
          <div>
              <p>{this.props.slideData.quizUrl}</p>
          </div>
          <div className="slideButtons"  style={{float: "right"}}>
            <Button type="button" onClick={() => this.props.previousSlideClick(this.props.index)}>Previous Slide</Button>
            <Button type="button" onClick={() => this.props.nextSlideClick(this.props.index)}>Next Slide</Button><br></br>
            <progress value={this.props.index} max={this.props.totalLength}>Progress</progress>
            { this.props.role === 'teacher' ?
              ( <div className='teacherOptions'>
                <Button type="button" onClick={this.goToQuiz.bind(this)}>Quiz</Button>
                <Button type="button" onClick={() => this.props.exitClick()}>Exit</Button>
              </div> )
              : ( this.props.complete && !this.state.getQuizCode ? (
                  <Button type="button" onClick={() => this.setState({getQuizCode: true})}>Quiz</Button>
                ) : this.state.getQuizCode ? 
                (  <FormGroup controlId="formControlsShortAnswer">
                    <ControlLabel>Quiz Code</ControlLabel>
                    <FormControl componentClass="text" value={this.state.quizCode} placeholder="Enter Quiz Code" />
                    <Button onSubmit={this.goToQuiz.bind(this)}>Get Quiz</Button>
                  </FormGroup> ) : ''
              )

            }
          </div>
        </div>) : 
        <Quiz quizCode={this.state.quizCode} role={this.props.role} />
        }
      </div>
    );
  }
}

const slideContainerStyle = {
  border: "solid black 1px",
  borderRadius: "10px",
  width: "65%",
  margin: 'auto',
  textAlign: "center"
}

export default Slide;
