const express = require('express');
const router = express.Router();
const fileRouter = require('./files.routes');

router.get('/', (req, res) => {
    console.log('Menu inicio');
    res.json({
        status: 'Api Works'
    });
});

module.exports = router;