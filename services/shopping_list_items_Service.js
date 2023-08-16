import { sql } from "../database/database.js";



const findAllListItems = async (id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id}`;
}



export { findAllListItems }