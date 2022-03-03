var express = require('express');
var router = express.Router();
const SubjectController = require('../controllers/subject')
const Authenticate = require('../middleware/auth')
/* GET users listing. */
router.get('/', Authenticate, SubjectController.getSubjectList);

module.exports = router;
