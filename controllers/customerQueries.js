import {db} from "../config/connection.js"
import { mapToJson, jsonToMap } from "../utils/conversion.js";

export async function getItemsByCategory(category){
    const [rows] = await db.query(`
        WITH CategoryNames AS (
            SELECT c.item_id, cl.category
            FROM categories c
            JOIN category_list cl ON c.category_id = cl.category_id  
            WHERE cl.category = ?
        )
        SELECT item_list.*,CategoryNames.category
        FROM item_list
        INNER JOIN CategoryNames ON item_list.item_id = CategoryNames.item_id
        `, [category]);
    return rows;
}

export async function getAllCategories(){
    const [rows] = await db.query(`SELECT category FROM category_list`);
    return rows;
}

export async function getItemPriceList(itemListJson){
    const itemPriceList =[];
    const itemListMap = jsonToMap(itemListJson);
    console.log(itemListMap);
    const sql = "SELECT name, price_per_item FROM item_list WHERE item_id = ?";
    for( const [itemId, itemQty] of itemListMap){
        const [[itemPrice]] = await db.query(sql, [itemId]);
        console.log(itemPrice);
        itemPriceList.push({id:itemId, name:itemPrice.name, qty:itemQty, price:(itemPrice.price_per_item)*itemQty});
        console.log(itemPriceList)
    };
    return itemPriceList;
}

export async function getTableStatus(tableno){
    const sql = "SELECT payment_status FROM orders WHERE payment_status = 'pending' AND table_no = ?";
    const [[tableStatus]] = await db.query(sql, [tableno]);
    console.log(tableStatus);
    if(tableStatus === null || tableStatus === undefined || tableStatus == {}){
        return true;
    }
    else{
        return false;
    }
}

export async function placeOrder(order){
    const sql= "INSERT INTO orders (`order_id`,`customer_id`, `table_no`,`specifications`,`ordered_time`, `total_fare`, `payment_status`) VALUES (?)"
    const values = [order.order_id, order.customer_id, order.table_no, order.specifications, order.ordered_time, order.total_fare, order.payment_status];
    await db.query(sql, [values]);
}

export async function createSubOrder(subOrder){
    const sql= "INSERT INTO sub_orders (`order_id`, `item_id`, `quantity`) VALUES (?)"
    const items= subOrder.itemList;
    for (const item of items) {
        const values = [subOrder.order_id, item.id, item.qty];
        await db.query(sql, [values]);
    }
}

export async function getOrders(user_id){
    const sql = "SELECT * FROM orders WHERE received_time IS NULL AND customer_id = ?";
    const [orders] = await db.query(sql, [user_id]);
    for(const order of orders){
        const sql = `SELECT sub_orders.item_id, sub_orders.quantity, item_list.name 
                     FROM sub_orders 
                     INNER JOIN item_list ON sub_orders.item_id = item_list.item_id 
                     WHERE order_id = ?`;
        const [subOrders] = await db.query(sql, [order.order_id]);
        order.subOrders = subOrders;
    }
    return orders;
}
 
export async function updateReceiveTime(order_id, received_time){
    console.log(order_id, received_time);
    const sql = "UPDATE orders SET received_time = ? WHERE order_id = ?";
    await db.query(sql, [received_time, order_id]);
    console.log("Received time updated");
}