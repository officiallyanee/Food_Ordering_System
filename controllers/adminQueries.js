import {db} from "../config/connection.js"

export async function getAllOrders(offset = 0, limit = 8, search) {
    const searchSql = `
    SELECT COUNT(*) as total 
    FROM orders 
    INNER JOIN login_details ON orders.customer_id = login_details.user_id
    WHERE login_details.name LIKE ?`;

    const [[{ total }]] = await db.query(searchSql, [`%${search}%`]);

    const dataSql = `
    SELECT orders.*, login_details.name 
    FROM orders 
    INNER JOIN login_details ON orders.customer_id = login_details.user_id
    WHERE login_details.name LIKE ?
    ORDER BY (payment_status = 'pending') DESC, orders.ordered_time DESC
    LIMIT ? OFFSET ?`;

    const [orders] = await db.query(dataSql, [`%${search}%`, limit, offset]);

    for (const order of orders) {
        const [subOrders] = await db.query(`
            SELECT sub_orders.item_id, sub_orders.quantity, item_list.name, sub_orders.chef_id 
            FROM sub_orders 
            INNER JOIN item_list ON sub_orders.item_id = item_list.item_id 
            WHERE order_id = ?`, [order.order_id]);

        order.subOrders = subOrders;
    }

    return { total, orders };
}


export async function updatePaymentStatus(order_id){
    const sql = "UPDATE orders SET payment_status = 'paid' WHERE order_id = ?";
    await db.query(sql, [order_id]);
}

