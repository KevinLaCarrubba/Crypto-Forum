const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const cryptoRoutes = require('./');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/', cryptoRoutes);
router.use('/tags', tagRoutes);

module.exports = router;