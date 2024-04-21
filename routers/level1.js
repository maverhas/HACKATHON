const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    console.log(req.session.level);

    if (req.session.level !== 1) {
        return res.status(403).redirect('/');
    }
    req.session.time = new Date().getTime();
    console.log(req.session.time)
    res.render('levels/1/index.ejs');
});

module.exports = router;