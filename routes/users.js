const express = require('express');

const router = express.Router();
const UserService = require('../services/user_service');
const HTTPReqParamError = require('../error/http_request_param_error');

/* GET users listing. */
router.get('/', (req, res) => {
    (async () => {
        throw new HTTPReqParamError('page', '请指定页面', 'page can not be empty')
        const users = await UserService.getAllUsers();
        res.locals.users = users;
    })()
    .then(() => {
        res.render('users');
    })
    .catch((e) => {
        console.log(e)
    })
});

router.post('/', (req, res) => {
    const { firstName, lastName, age } = req.body;
    const u = UserService.addNewUsers(firstName, lastName, age);
    res.json(u);
});

router.get('/:userId', (req, res) => {
    const user = UserService.getUserById(Number(req.params.userId));
    res.locals.user = user;
    res.render('user');
});

router.post('/:userId/subscription', (req, res, next) => {
    try {
        const sub = UserService.createSubScription(Number(req.params.userId), req.body.url);
        res.json(sub);
    } catch (e) {
        next(e);
    }
});

module.exports = router;