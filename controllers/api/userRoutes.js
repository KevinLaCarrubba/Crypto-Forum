const router = require("express").Router();
const { User, Comment } = require("../../models");

router.get("/", async (req, res) => {
  const userData = await User.findAll().catch((err) => {
    res.json(err);
  });
  res.json(userData);
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/signup", async (req, res) => {
  // console.log("POST /signUp");
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = username;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//url endpoint: /api/users/login_user
router.get("/login_user", (req, res) => {
  // console.log("GET /login_user");
  if (req.session.logged_in === true) {
    res.status(200).json({
      user_id: req.session.user_id,
      logged_in: true,
      username: req.session.username,
    });
  } else {
    res.status(400).json({ message: "User not logged in!" });
  }
  return;
});

module.exports = router;
