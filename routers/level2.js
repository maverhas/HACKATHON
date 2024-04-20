const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    console.log(req.session.level);

    if (req.session.level !== 2) {
        return res.status(403).redirect('/');
    }

    res.render('levels/2/index.ejs');
});

module.exports = router;