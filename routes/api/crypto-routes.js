const router = require('express').Router();
const { Crypto, Category, Tag, CryptoTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  Crypto.findAll({
    include: [
      Category,
      {
        model: Tag,
        through: CryptoTag
      }
    ]
  })
  .then((crypto) => res.json(crypto))
  .catch((err) => res.status(400).json(err))
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', (req, res) => {
  Crypto.findOne({
    where: {
      id: req.params.id
    },
    include: [
      Category,
      {
        model: Tag,
        through: CryptoTag
      }
    ]
  })
  .then((crypto) => res.json(crypto))
  .catch((err) => res.status(400).json(err))
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Crypto.create(req.body)
    .then((crypto) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const cryptoTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            crypto_id: crypto.id,
            tag_id,
          };
        });
        return CryptoTag.bulkCreate(cryptoTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(crypto);
    })
    .then((cryptoTagIds) => res.status(200).json(cryptoTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Crypto.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((crypto) => {
      // find all associated tags from ProductTag
      return CryptoTag.findAll({ where: { crypto_id: req.params.id } });
    })
    .then((cryptoTags) => {
      // get list of current tag_ids
      const cryptoTagIds = cryptoTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newCryptoTags = req.body.tagIds
        .filter((tag_id) => !cryptoTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            crypto_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const cryptoTagsToRemove = cryptoTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        CryptoTag.destroy({ where: { id: cryptoTagsToRemove } }),
        CryptoTag.bulkCreate(newCryptoTags),
      ]);
    })
    .then((updatedCryptoTags) => res.json(updatedCryptoTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Crypto.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((crypto) => res.status(200).json(crypto))
  .catch((err) => res.status(400).json(err))
});

module.exports = router;
