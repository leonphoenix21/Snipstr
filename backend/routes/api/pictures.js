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

    const picture = await Picture.create(req.body);
    res.json(picture);
    // return res.redirect(`/`)
}));

router.put(
    "/:id",
    asyncHandler(async function (req, res) {
        const picture = req.body
        const id = picture.id;
        delete picture.id;
        console.log({ picture, id });
        await Picture.update(
            picture,
            {
                where: { id },
                returning: true,
                plain: true
            }
        );

        return await Picture.findByPk(id)
    })
);

router.delete("/:id", asyncHandler(async function (req, res) {
    const id = req.params.id;
    await Picture.destroy({ where: { id } });
    res.json({ Picture })
}));


module.exports = router;
