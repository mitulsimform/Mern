var express = require('express');
var router = express.Router();
const GradeController = require('../controllers/grade')

/* GET users listing. */
router.get('/', GradeController.getSubjectList);

module.exports = router;



