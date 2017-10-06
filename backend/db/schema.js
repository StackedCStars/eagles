/*
Schemas for each part.
user,tutorial,lesson,slide
//don't mind the {type:String, required: true} it could just be String

stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
*/

const mongoose = require(`mongoose`);
var Schema = mongoose.Schema;

var classSchema = new Schema({
  name: String,
  teacher: String,
  lessons: String
})
var Class = mongoose.model('Class', classSchema);

var applicationSchema = new Schema({
  class: String,
  teacher: String,
  student: String,
  reason: String,
  status: Boolean
})
var Application = mongoose.model('Application', applicationSchema);

var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  lessons: [String],
  favorites: [String],
  createdLessons:[String],
  email: String,
  role: String,
  classes: [String]
});
var User = mongoose.model('User', userSchema);

let quizSchema = new Schema({
  quizCode: String,
  questions: [String],
  answers: [String],
  relatedSlides: [String],
  lessonRef: String,
  mcTypes: [String]
})
let Quiz = mongoose.model('Quiz', quizSchema);

//////////////////

var lessonSchema = new Schema({
  name: {type: String, required: true},
  userRef: String,
  description: String,
  keyWords: [String],
  slides: [String],
  likes: Number,
  userLikes: [String]
});
var Lesson = mongoose.model('Lesson', lessonSchema);

//////////////////

let slideSchema = new Schema({
  name: String,
  lessonRef: String,
  youTubeUrl: String,
  text: String,
  quizUrl: String,
  youTubeThumbnailUrl: String,
  youTubeTags: [String]
});
let Slide = mongoose.model('Slide', slideSchema);

module.exports = {
  User: User,
  Lesson: Lesson,
  Slide: Slide,
  Class: Class,
  Application: Application,
  Quiz: Quiz
}
