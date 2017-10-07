// describe('Addition', () => {
//   it('knows that 2 and 2 make 4', () => {
//     expect(2 + 2).toBe(4);
//   });
// });
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15'
import QuestionView from '../components/Lesson/Question.js';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme'; 

Enzyme.configure({ adapter: new Adapter() })

// describe('Rendering the QuestionView component with props', () => {
//   it('should render without throwing an error', () => {
//     expect(shallow(<QuestionView 
//       question="What is 2+2?" 
//       answer="4"
//       relatedSlides="1"
//       mcType="false"
//       saveAnswer={() => {console.log(saved)}}/>).contains(<h3></h3>)).toBe(true);
//   })
//   it('should render with throwing an error', () => {
//     expect(shallow(<QuestionView />).contains(<h3></h3>)).toBe(false);
//   })
// })
test('QuestionView renders with props', () => {
  const component = shallow(
    <QuestionView 
      question="What is 2+2?" 
      answer="4"
      relatedSlides="1"
      mcType="false"
      saveAnswer={() => {console.log(saved)}}
    />
  );
  // let tree = component.toJSON();
  expect(component).toMatchSnapshot();
})
// test('Search renders correctly', () => {
//   const component = shallow(<UnwrappedSearch searchTerm="" shows={preload.shows} />);
//   expect(component).toMatchSnapshot();
// })