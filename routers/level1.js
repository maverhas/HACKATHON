const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {


    if (req.session.level !== 1) {
        return res.status(403).redirect('/');
    }
    req.session.time = new Date().getTime();
    res.render('levels/1/index.ejs');
});

module.exports = router;