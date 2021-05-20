const express = require('express');
const bcrypt  =require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modals/user');
const authSecret = 'secret_code';

const router = express.Router();

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(result => {
                res.status(201).json({
                    result: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    })
});

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({
                    error: 'authentication failed'
                })
            }
            return {valid: bcrypt.compare(req.body.password, user.password), user: user}
        })
        .then((result) => {
            if(!result.valid) {
                return res.status(401).json({
                    error: 'authentication failed'
                })
            }
            const token = jwt.sign(
                {email: result.user.email, userId: result.user._id},
                authSecret,
                {expiresIn: '1h'}
            )
            res.status(200).json({
                token: token
            })
        })
        .catch(() => {
            res.status(401).json({
                error: 'authentication failed'
            })
        });
})

module.exports = router;