import express from 'express';
import { getOrders, updateReceiveTime } from '../controllers/customerQueries.js';

const ordersRouter = express.Router();

ordersRouter.get('/',async (req, res)=>{
    const orders = await getOrders(req.user.id);
    console.log("orders got");
    res.render('orders',{
        orders:orders,
        userRole: req.user.role
    });
});

ordersRouter.post('/',async (req, res)=>{
    console.log(req.body);
    const {orderID, received_time} = req.body;
    console.log(orderID, received_time);
    await updateReceiveTime(orderID, received_time);
    res.send({redirectTo:'/orders'});
})
export default ordersRouter