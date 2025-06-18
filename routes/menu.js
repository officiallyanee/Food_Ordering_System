import {getItemsByCategory,getAllCategories,getItemPriceList} from '../controllers/customerQueries.js' 
import express from 'express';
import {v4 as uuidv4} from 'uuid';
const menuRouter = express.Router();

menuRouter.get('/', async (req, res) => {
    const result = await getItemsByCategory('Starters');
    const categories = await getAllCategories();
    res.render('menu',{
        items:result,
        categories:categories,
        userRole: req.user.role,
        currentPageName: 'menu'
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


export default menuRouter