const express = require('express');
const schema = require('../db/schema.js');
const router = express.Router();
const mongoose = require('mongoose');
const Quiz = schema.Quiz;

router.post('/quiz', (req, res) => {
  let quizCode = req.body.quizCode;
  let questions = req.body.questions;
  let answers = JSON.stringify(req.body.answers);
  console.log(answers, 'gu')
  let relatedSlides = req.body.relatedSlides;
  let lessonRef = req.body.lessonRef;
  let mcTypes = req.body.mcTypes;
  Quiz.create({
    quizCode,
    questions,
    answers,
    relatedSlides,
    lessonRef,
    mcTypes
  })
  .then((quiz) => {
    res.status(201).send(`Quiz successfully saved to database ${quiz}`);
  })
  .catch((err) => {
    res.status(404).send(`Something went wrong ${err}`);
  })
})

router.get('/quiz', (req, res) => {
  let quizCode = req.query.quizCode || 5750;
  console.log('called')
  Quiz.find({quizCode})
  .then((quiz) => {
    res.status(200).send(quiz);
  })
  .catch((err) => {
    res.status(404).send(err);
  })
})
module.exports = router;