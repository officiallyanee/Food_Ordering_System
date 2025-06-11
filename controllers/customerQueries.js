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
    const [rows] = await db.query(`
        SELECT category
        FROM category_list
    `);
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
