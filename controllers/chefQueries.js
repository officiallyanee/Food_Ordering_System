import {db} from "../config/connection.js"

export async function getAllPendingOrders(){
    const sql = "SELECT * FROM orders WHERE received_time IS NULL";
    const [orders] = await db.query(sql);
    for(const order of orders){
        const sql = `SELECT sub_orders.item_id, sub_orders.quantity, item_list.name, sub_orders.chef_id 
                     FROM sub_orders 
                     INNER JOIN item_list ON sub_orders.item_id = item_list.item_id 
                     WHERE order_id = ?`;
        const [subOrders] = await db.query(sql, [order.order_id]);
        order.subOrders = subOrders;
    }
    return orders;
}

export async function updateChef(order_id, item_id, chef_id, status){
    const sql = "UPDATE sub_orders SET chef_id = ? WHERE order_id = ? AND item_id = ?";
    await db.query(sql, [chef_id, order_id, item_id]);
}