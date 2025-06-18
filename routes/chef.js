import express from 'express';
import {getAllPendingOrders, updateChef} from '../controllers/chefQueries.js'
const chefRouter = express.Router();

chefRouter.get('/', async (req, res) => {
    const orders= await getAllPendingOrders();
    res.render('pendingOrders',{
        orders:orders,
        userRole: req.user.role,
        currentPage: 'chef'
    });
});

chefRouter.patch('/', async (req, res) => {
    const {orderId,itemId} = req.body;
    const chefId = req.user.id;
    await updateChef(orderId, itemId, chefId);
    res.status(200).send({chefId:chefId});
})
export default chefRouter