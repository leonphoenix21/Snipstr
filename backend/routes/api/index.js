const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const pictureRouter = require('./pictures.js')
const albumRouter = require('./album.js')


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/picture', pictureRouter);
router.use('/albums', albumRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

router.get(
    '/restore-user',
    restoreUser,
    (req, res) => {
        return res.json(req.user);
    }
);

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});


router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user });
}));

router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);






module.exports = router;