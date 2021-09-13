const router = require('express').Router();
const { Category, Crypto } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [Crypto]
  }) 
  .then((categories) => res.json(categories)) 
  .catch((err) => res.status(500).json(err))
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Crypto]
  })
  .then((category) => res.json(category))
  .catch((err) => res.status(400).json(err))
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
 Category.destroy({
   where: {
     id: req.params.id
   }
 })
 .then((category) => res.status(200).json(category))
 .catch((err) => res.status(400).json(err))
});

module.exports = router;