const express = require('express');
const router = express.Router();
const favDishController = require('../controllers/favDishController');

router.post('/', favDishController.addFavDish);
router.get('/', favDishController.getAllFavDishes);
router.get('/:id', favDishController.getFavDishById);
router.put('/:id', favDishController.updateFavDish);
router.delete('/:id', favDishController.deleteFavDish);

module.exports = router;
