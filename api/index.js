const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/tracks", require("./tracks"));
router.use("/search", require("./search"));
router.use("/auth", require("./auth"));
router.use("/messages", require("./messages"));

router.use((req, res, next) => {
    const error = new Error("404 Not Found");
    error.status = 404;
    next(error);
});

module.exports = router;