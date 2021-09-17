const router = require("express").Router();
const { watchlist } = require("../../models");
const withAuth = require("../../helpers/utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newWatchlist = await Watchlist.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWatchlist);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const watchlistData = await Watchlist.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!watchlistData) {
      res.status(404).json({ message: "No watchlist found with this id!" });
      return;
    }

    res.status(200).json(watchlistData);
  } catch (err) {
    res.status(500).json(err);
  }
});
