const router = require("express").Router();
const { User, Watchlist } = require("../../models");
const withAuth = require("../../helpers/utils/auth");

//url endpoints: /api/watchlist/:id
// router.get("/:id", withAuth, async (req, res) => {
router.get("/:id", async (req, res) => {
  console.log("GET /watchlist/:id", req.params.id);
  try {
    const userData = await User.findByPk(
      req.params.id,
      { include: Watchlist }
    );

    if (!userData) {
      res.status(400).json({ message: "Data not found!" });
      return;
    }

    console.log(userData);
    res.status(200).json(userData);
    return;
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
