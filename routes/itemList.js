import express from 'express';
import { getItemPriceList , getTableStatus, placeOrder, createSubOrder, getCustomerTableNo} from '../controllers/customerQueries.js';
import {v4 as uuidv4} from 'uuid';

const itemListRouter = express.Router();

itemListRouter.get('/', async (req, res) => {
    res.render('itemList', { userRole: req.user.role, currentPageName: 'itemList' });
})

itemListRouter.get('/itempricelist/:itemList', async (req, res) => {
    const itemPriceList = await getItemPriceList(decodeURIComponent(req.params['itemList']));
    let total = 0;
    itemPriceList.forEach((item) => {total = total + Number(item.price)});
    res.send({itemPriceList: itemPriceList, total:total});
})

itemListRouter.get('/tablestatus/:tableno', async (req, res) => {
    const tableStatus =await getTableStatus(req.params['tableno']);
    res.send({tableStatus: tableStatus});
})

itemListRouter.get('/customerTableNo', async (req, res) => {
    const customer_id= req.user.id;
    const customerTableNo =await getCustomerTableNo(customer_id);
    res.send({customerTableNo: customerTableNo});
})

itemListRouter.post('/order', async (req, res) => {
    const user= req.user;
    const {order, itemListObj} = req.body;
    order["order_id"] = uuidv4();
    order["customer_id"] = user.id;
    const itemListMap = new Map(Object.entries(itemListObj));
    const itemList = Array.from(itemListMap, ([id, qty]) => ({ id, qty }));
    const subOrder={
        "order_id":order["order_id"],
        "itemList":itemList
    }
    await placeOrder(order);  
    await createSubOrder(subOrder);
    res.send({redirectTo:'/orders'});
})

export default itemListRouter