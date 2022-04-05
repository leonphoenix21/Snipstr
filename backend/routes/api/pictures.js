const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Picture } = require('../../db/models');
const { validateCreate, validateUpdate } = require('../validations/pictures')


router.get('/pictures', asyncHandler(async (_req, res) => {
    const pictures = await Picture.findAll();
    res.json(pictures);
}));

router.post('/pictures/:id', validateCreate, asyncHandler(async (req, res) => {
    const picture = await Picture.create(req.body);
    res.json(picture)
    res.json(picture);
    return res.redirect(`/pictures`)
}));

router.put(
    "/:id",
    validateUpdate,
    asyncHandler(async function (req, res) {
        const picture = await Picture.updateItem(req.body);
        return res.json(picture);
    })
);

router.delete("/:id", asyncHandler(async function (req, res) {
    const picture_id = await Picture.deleteItem(req.params.id);
    return res.json({ picture_id });
}));


module.exports = router;
