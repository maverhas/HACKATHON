const express = require('express');
const router = express.Router();
router.get('/course', (req, res) => {
    res.render('levels/2/course.ejs')
})
router.get('/', (req, res) => {

    if (req.session.level !== 2) {
        return res.status(403).redirect('/');
    }

    res.render('levels/2/index.ejs');
});


module.exports = router;