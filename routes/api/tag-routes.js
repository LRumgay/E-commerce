const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = Tag.findAll({
      include:[{model: Product, through: ProductTag}],
    });
    res.status(200).json(tags);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag}],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
   Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json({ message: 'New tag added!'});

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    Tag.update(req.body, {
      where: { id: req.params.id }
    });
    res.status(200).json({ message: 'This tag has been updated.'})
  } catch (err){
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Category.destroy({
    where:{
      id:req.params.id
    }
  })
  .then((tag)=> res.json(tag))
  .catch((err)=> res.json (err))
});

module.exports = router;
