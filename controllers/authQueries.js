import {db} from "../config/connection.js"
import bcrypt from 'bcrypt';

export async function postUserDetails(user){
    const sql = "INSERT INTO login_details (`user_id`,`name`, `email`, `pwd_hash`, `role`) VALUES (?)";
    const values = [user.user_id, user.name, user.email, user.pwd_store, user.role];
    await db.query(sql, [values]);
}

export async function getUserDetails(name){
    const sql = "SELECT * FROM login_details WHERE name = ?";
    const [result] = await db.query(sql, [name]);
    return result[0];
}

