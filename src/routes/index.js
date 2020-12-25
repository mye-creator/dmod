const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render("public/index");
});

module.exports = router;