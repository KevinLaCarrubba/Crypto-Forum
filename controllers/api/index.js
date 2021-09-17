const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const projectRoutes = require('./projectRoutes');
const watclistRoutes = require('./watchlistRoutes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/project', projectRoutes);
router.use('/watchlist', watclistRoutes);

module.exports = router;