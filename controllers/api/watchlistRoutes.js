const router = require("express").Router();
const { User, Watchlist } = require("../../models");
const withAuth = require("../../helpers/utils/auth");

//url endpoints: /api/watchlist/:id
// router.get("/:id", withAuth, async (req, res) => {

router.get("/:id", withAuth, async (req, res) => {
  // console.log("GET /watchlist/:id", req.params.id);
  try {
    const userData = await User.findByPk(req.params.id, {
      include: Watchlist,
    });

    if (!userData) {
      res.status(400).json({ message: "Data not found!" });
      return;
    }

    res.status(200).json(userData);
    return;
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newWatchlist = await Watchlist.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newWatchlist);
  } catch (err) {
    {
      console.log(err);
      res.status(400).json(err);
    }
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleteWatchList = await Watchlist.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deleteWatchList) {
      res
        .status(404)
        .json({ message: "No watchlist item found with this id!" });
      return;
    }

    res.status(200).json(deleteWatchList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
