var express = require('express');
var router = express.Router();
const ExamController = require('../controllers/exams')
const QuestionPaperController = require('../controllers/question-paper')
const Authenticate = require('../middleware/auth')
/* GET users listing. */
router.post('/', Authenticate, ExamController.createExam);
router.post('/create-question-paper', Authenticate, QuestionPaperController.createQuestionPaper);
router.post('/get-question-paper', Authenticate, QuestionPaperController.getQuestionPaper)
router.post('/submit-exam', Authenticate, QuestionPaperController.submitExamForResult)
router.get('/get-exams', Authenticate, ExamController.getExams)
module.exports = router;



