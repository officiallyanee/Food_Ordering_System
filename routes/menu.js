import {getItemsByCategory,getAllCategories,getItemPriceList} from '../controllers/customerQueries.js' 
import express from 'express';
import { mapToJson, jsonToMap } from '../utils/conversion.js';
const menuRouter = express.Router();

menuRouter.get('/', async (req, res) => {
    const result = await getItemsByCategory('Starters');
    const categories = await getAllCategories();
    res.render('menu',{
        items:result,
        categories:categories
    });
}) 

menuRouter.get('/:category', async (req, res) => {
    const result = await getItemsByCategory(req.params['category']);
    const categories = await getAllCategories();
    res.send({
        items:result,
        categories:categories
    });
})

menuRouter.get('/itemList/:itemList', async (req, res) => {
    console.log(req.params);
    const itemPriceList = await getItemPriceList(req.params['itemList']);
    let total = 0;
    itemPriceList.forEach((item) => {total = total + Number(item.price)});
    console.log(itemPriceList);
    console.log(total)
    res.render('itemList', { itemPriceList :itemPriceList, total:total});
})

export default menuRouter