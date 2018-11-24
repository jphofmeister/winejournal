const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// require for uploading
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryKeys = require('../../config/cloudinary-keys');
cloudinary.config(cloudinaryKeys);
const cloudinaryStorage = require("multer-storage-cloudinary");

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "wine-journal-images",
    allowedFormats: ["jpg", "png"]
});

const upload = multer({ storage });

//module.exports = upload;

//wine model
const Wine = require('../../models/Wine');
//user model
const User = require('../../models/User');

//validation
const validateWineInput = require('../../validation/wine');

// @route   GET api/wine/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => {
    res.json({ msg: "Wine Works" });
});

// @route   GET api/wine
// @desc    get all wine
// @access  Public
router.get('/', (req, res) => {
    Wine.find()
        //.sort({ date: -1 })
        .then(wine => res.json(wine))
        .catch(err => res.status(404).json({ nowinefound: 'No wine found' }));
});

// @route   GET api/wine/:id
// @desc    get wine by id
// @access  Public
router.get('/:id', (req, res) => {
    Wine.findById(req.params.id)
        .then(wine => res.json(wine))
        .catch(err => res.status(404).json({ nowinefound: 'No wine found with that id' }));
});

// @route   POST api/wine
// @desc    create wine
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    upload.any('wineImage'),
    (req, res) => {
        const { errors, isValid } = validateWineInput(req.body);

        //check validation 
        if (!isValid) {
            return res.status(400).json(errors);
        }

        // Get fields
        const newWine = {};
        newWine.user = req.user.id;
        if (req.body.wineName) newWine.wineName = req.body.wineName;
        if (req.body.winery) newWine.winery = req.body.winery;
        if (req.body.wineType) newWine.wineType = req.body.wineType;
        if (req.body.notes) newWine.notes = req.body.notes;
        // Varietal - Spilt into array 
        if (typeof req.body.varietal !== 'undefined') {
            newWine.varietal = req.body.varietal.split(',');
        }
        if (req.body.tasteDate) newWine.tasteDate = req.body.tasteDate;
        if (req.body.tasteLocation) newWine.tasteLocation = req.body.tasteLocation;
        if (req.body.rating) newWine.rating = req.body.rating;
        if (req.body.alcoholContent) newWine.alcoholContent = req.body.alcoholContent;
        if (req.body.price) newWine.price = req.body.price;
        if (req.body.vintage) newWine.vintage = req.body.vintage;
        if (req.file) {
            if (req.file.url) newWine.wineImageUrl = req.file.url;
            if (req.file.public_id) newWine.wineImageId = req.file.public_id;
        }

        // Create
        new Wine(newWine).save().then(wine => res.json(wine));

    });

// @route   PUT api/wine/:id
// @desc    edit wine
// @access  Private
router.put('/:id', passport.authenticate('jwt', { session: false }), upload.single('wineImage'), (req, res) => {
    const { errors, isValid } = validateWineInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Get fields
    const updatedWine = {};
    updatedWine.user = req.user.id;
    if (req.body.wineName) updatedWine.wineName = req.body.wineName;
    if (req.body.winery) updatedWine.winery = req.body.winery;
    if (req.body.wineType) updatedWine.wineType = req.body.wineType;
    if (req.body.notes) updatedWine.notes = req.body.notes;
    // Varietal - Spilt into array
    if (typeof req.body.varietal !== 'undefined') {
        updatedWine.varietal = req.body.varietal.split(',');
    }
    if (req.body.tasteDate) updatedWine.tasteDate = req.body.tasteDate;
    if (req.body.tasteLocation) updatedWine.tasteLocation = req.body.tasteLocation;
    if (req.body.rating) updatedWine.rating = req.body.rating;
    if (req.body.alcoholContent) updatedWine.alcoholContent = req.body.alcoholContent;
    if (req.body.price) updatedWine.price = req.body.price;
    if (req.body.vintage) updatedWine.vintage = req.body.vintage;
    if (req.body.wineImage) newWine.wineImage = req.file.filename;

    Wine.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedWine },
        { new: true }
    ).then(wine => res.json(wine))
        .catch(err => res.status(404).json(err));
});


// @route   DELETE api/wine/:id
// @desc    delete wine
// @access  Private 
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Wine.findOne({ wine: req.body.wineName })
        .then(wine => {
            Wine.findById(req.params.id)
                .then(wine => {
                    //check for wine owner
                    // if (wine.user.toString() !== req.user.id) {
                    //     return res.status(401).json({ notauthorized: 'User not authorized' });
                    // }
                    if (wine.wineImageId) {
                        cloudinary.v2.uploader.destroy(wine.wineImageId);
                    }

                    //Delete
                    wine.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ nowinefound: 'No wine found' }));
        })
});


module.exports = router;