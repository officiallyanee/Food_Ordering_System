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

export async function getRefreshToken(refreshToken){
    const sql = "SELECT * FROM sessions WHERE refresh_token = ?";
    const result = await db.query(sql, [refreshToken]);
    return result[0];
}

export async function postRefreshToken(user_id,refreshToken){
    const salt = bcrypt.genSaltSync(10);
    const refresh_token_hash = await bcrypt.hash(refreshToken, salt);
    const sql = "INSERT INTO sessions (`refresh_token_hash`, `user_id`) VALUES (?)";
    const values = [refresh_token_hash, user_id];
    await db.query(sql, [values]);
}

export async function revokeRefreshToken(user_id){
    const sql = `UPDATE FROM sessions 
                SET revoked = 1
                WHERE user_id= ? && revoked = 0`;
    await db.query(sql, [user_id]);
}