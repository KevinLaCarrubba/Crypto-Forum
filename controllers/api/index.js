const router = require('express').Router();
const categoryRoutes = require('./userRoutes');
const tagRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/comments', projectRoutes);

module.exports = router;