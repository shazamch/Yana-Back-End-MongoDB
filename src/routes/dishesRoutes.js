const express = require('express');
const router = express.Router();
const dishesController = require('../controllers/dishesController');

router.post('/', dishesController.createDish);
router.get('/', dishesController.getAllDishes);
router.get('/:id', dishesController.getDishById);
router.put('/:id', dishesController.updateDish);
router.delete('/:id', dishesController.deleteDish);
                                                                                                                                                                                         
module.exports = router;
  