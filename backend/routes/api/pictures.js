const express = require('express');
const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Picture } = require('../../db/models');


const { handleValidationErrors } = require('../../utils/validation')
const { validateCreate, validateUpdate } = require('../validations/pictures')


router.get('/', asyncHandler(async (_req, res) => {
    const pictures = await Picture.findAll();
    res.json(pictures);
}));

router.post('/', asyncHandler(async (req, res) => {
    // console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
    // console.log(req.body)
    // const { name, url, user_id } = req.body;
    // const picture = await Picture.build({
    //     name,
    //     url,
    //     user_id
    // })
    // await picture.save();
    // res.redirect('/application')
    const picture = await Picture.create(req.body);
    res.json(picture);
    // return res.redirect(`/`)
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
