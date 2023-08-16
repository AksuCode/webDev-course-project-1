import { sql } from "../database/database.js";



const findAllListItems = async (id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} ORDER BY collected, name`;
}



const createListItem = async (name) => {
    await sql`INSERT INTO shopping_list_items (name) VALUES (${name})`;
}



const itemCount = async (name) => {
    return (await sql`SELECT COUNT(*) FROM shopping_list_items WHERE name = ${name}`)[0].count;
}


const markListItemsAsCollected = async (id) => {
    await sql`UPDATE shopping_list_items SET collected = false WHERE id = ${id}`;
}



export { findAllListItems, createListItem, itemCount, markListItemsAsCollected }