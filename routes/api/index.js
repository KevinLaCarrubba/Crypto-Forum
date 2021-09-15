const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const cryptoRoutes = require('./crypto-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/crypto', cryptoRoutes);
router.use('/tags', tagRoutes);
router.use('/user', require("./userRoutes"));

module.exports = router;