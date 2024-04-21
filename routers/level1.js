const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    if (req.session.level !== 2) {
        return res.status(403).redirect('/');
    }

    res.cookie('person_age', 20, {
        maxAge: 30 *24 * 60 * 60 * 1000,
        httpOnly: true
    });

    res.cookie('person_nationality', 'Portugese', {
        maxAge: 30 *24 * 60 * 60 * 1000,
        httpOnly: true
    });

    req.session.time = new Date().getTime();
    res.render('levels/1/index.ejs');
});

router.post('/submit', (req, res) => {
    let magic_number = -1;
    if (req.query.magic_number) {
        magic_number = req.query.magic_number;
    }

    console.log("Magic: ", req.query.magic_number);
    const expected = (((20 * 114) * 2280) % 255)
    console.log("Magic: ", parseInt(expected));
    if (parseInt(magic_number) !== parseInt(expected)) {
        return res.status(400).json({
            error: true,
            reason: 'wrong code'
        });
    }

    return res.status(200).json({
        code: '8034'
    });
});

module.exports = router;