const { Router } = require('express');
const { validateUserCreateRequest } = require("./validators/UserValidator");

const UsersController = require('./controllers/UsersController');

const router = Router();

router.get('/api/v2/users', UsersController.getUsers);
router.post('/api/v2/users',  validateUserCreateRequest(), UsersController.createUser);
router.get('/api/v2/users/:email', UsersController.getUser);
router.patch('/api/v2/users/:email', UsersController.updateUser);
router.delete('/api/v2/users/:email', UsersController.deleteUser);



module.exports = router;