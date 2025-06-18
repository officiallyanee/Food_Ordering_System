import express from 'express';
import { getOrders, updateReceiveTime } from '../controllers/customerQueries.js';

const ordersRouter = express.Router();

ordersRouter.get('/',async (req, res)=>{
    const orders = await getOrders(req.user.id);
    res.render('orders',{
        orders:orders,
        userRole: req.user.role,
        currentPageName: 'orders'
    });
});

ordersRouter.post('/',async (req, res)=>{
    const {orderID, received_time} = req.body;
    await updateReceiveTime(orderID, received_time);
    res.send({redirectTo:'/orders'});
})
export default ordersRouter