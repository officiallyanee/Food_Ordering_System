import {db} from "../config/connection.js"

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