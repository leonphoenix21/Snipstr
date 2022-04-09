const express = require('express');
const asyncHandler = require('express-async-handler');
const router = require('express').Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Albums } = require('../../db/models');

const { handleValidationErrors } = require('../../utils/validation')
const { validateCreate, validateUpdate } = require('../validations/pictures')

router.get('/', asyncHandler(async (_req, res) => {
    const albums = await Albums.findAll();
    res.json(albums);
}));


router.post('/', asyncHandler(async (req, res) => {
    console.log('the boooooooody', req.body)
    const albums = await Albums.create(req.body);
    res.json(albums);
    // return res.redirect(`/`)
}));

router.put(
    "/:id",
    asyncHandler(async function (req, res) {
        const album = req.body
        const id = album.id;
        delete album.id;
        console.log({ album, id });
        const albumS = await Albums.update(
            album,
            {
                where: { id },
                returning: true,
                plain: true
            }
        );
        res.json(albumS);
        // return await Albums.findByPk(id)
    })
);

router.delete("/delete/:id", asyncHandler(async function (req, res) {
    const id = req.params.id;
    const deleteAlbum = await Albums.findByPk(id)
    res.json({ Albums })
    return await deleteAlbum.destroy();
}));


module.exports = router;