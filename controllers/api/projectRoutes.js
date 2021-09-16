const router = require('express').Router();
const { Project, User } = require('../../models');
const withAuth = require('./../../helpers/utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const projectData = await Project.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const projects = projectData.map((project) => project.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.json(projects);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

// without handlebar, the info from backend is separete fromthe HTML,
// now we need a projectroutes to send the info, then homeroutes would send HTML page and nothing else