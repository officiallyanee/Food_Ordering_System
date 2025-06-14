import express from 'express';
import { getItemPriceList , getTableStatus, placeOrder, createSubOrder} from '../controllers/customerQueries.js';
import {v4 as uuidv4} from 'uuid';

const itemListRouter = express.Router();

itemListRouter.get('/:itemList', async (req, res) => {
    const itemPriceList = await getItemPriceList(req.params['itemList']);
    let total = 0;
    itemPriceList.forEach((item) => {total = total + Number(item.price)});
    console.log(itemPriceList);
    console.log(total)
    res.render('itemList', { itemPriceList :itemPriceList, total:total, userRole: req.user.role });
})

itemListRouter.get('/tablestatus/:tableno', async (req, res) => {
    console.log("Table number: " + req.params['tableno']);
    const tableStatus =await getTableStatus(req.params['tableno']);
    console.log(tableStatus);
    res.send({tableStatus: tableStatus});
})

itemListRouter.post('/order', async (req, res) => {
    const user= req.user;
    console.log(req.body);
    const {order, itemList} = req.body;
    console.log(order, itemList);
    order["order_id"] = uuidv4();
    order["customer_id"] = user.id;
    const subOrder={
        "order_id":order["order_id"],
        "itemList":itemList
    }
    await placeOrder(order);  
    await createSubOrder(subOrder);
    res.send({redirectTo:'/orders'});
})

export default itemListRouter