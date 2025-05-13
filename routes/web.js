import express from 'express';
import ShopController from '../controllers/shopControllers.js';
const router = express.Router();

router.get('/', ShopController.getAllShop ); //working fine And tested

router.post('/', ShopController.createShop ); //working fine And tested
router.get('/:id', ShopController.getsingleShopById ); //working fine And tested
router.put('/:id', ShopController.updateShopById); //working fine And tested
router.delete('/:id', ShopController.deleteShopById); //working fine And tested

router.patch('/:id', ShopController.partialupdateShop); //working fine And tested
export default router;
