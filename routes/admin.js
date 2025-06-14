import express from 'express';
import {getAllOrders, updatePaymentStatus} from '../controllers/adminQueries.js'
const adminRouter = express.Router();

adminRouter.get('/',async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit =parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const {total, orders }= await getAllOrders(offset,limit,search);
    console.log("orders got");
    console.log(orders);
    res.render('admin',{
        orders:orders,
        totalPages: Math.ceil(total /8),
        currentPage: page,
        limit: limit,
        search: search,
        userRole: req.user.role
    });
});

adminRouter.patch('/payment',async (req, res)=>{
    const {orderID} = req.body;
    await updatePaymentStatus(orderID);
    res.status(200).send({redirectTo:'/admin'});
})

export default adminRouter