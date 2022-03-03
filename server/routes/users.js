var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/users')
const Authenticate = require('../middleware/auth')
/* GET users listing. */
router.get('/:type', Authenticate, UsersController.getUsers);
router.post('/create', Authenticate, UsersController.createUsers);
router.post('/sign-in', UsersController.signInUser)



module.exports = router;
