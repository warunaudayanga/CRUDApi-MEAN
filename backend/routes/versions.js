const express = require('express');
const router = express.Router();
const Version = require('../modals/version');

router.post('', ((req, res) => {
    const version = new Version({
        name: req.body.name,
        status: req.body.status,
    });
    version.save().then(createdVersion => {
        res.status(201).json({
            versionId: createdVersion._id
        })
    })
}));

router.get('', (req, res) => {
    Version.find().then(docs => {
        res.status(200).json({
            versions: docs
        });
    })
});

router.put('/:id', (req, res) => {
    const version = new Version({
        _id: req.body.id,
        name: req.body.name,
        status: req.body.status
    });
    Version.updateOne({_id: req.params.id}, version).then(() => {
        res.status(200).end();
    })
})

router.delete('/:id', (req, res) => {
    Version.deleteOne({_id: req.params.id}).then(() => {
        res.status(200).end();
    })
})

module.exports = router;
