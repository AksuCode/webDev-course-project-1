import { sql } from "../database/database.js";



const findAllListItems = async (id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} ORDER BY collected, name`;
}



const createListItem = async (listId, name) => {
    await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${name}, ${listId})`;
}



const collectedItemExists = async (listId, name) => {
    return (await sql`SELECT COUNT(*) FROM shopping_list_items WHERE shopping_list_id = ${listId} AND collected = false AND name = ${name}`)[0].count >= 1;
}



const itemCount = async () => {
    return (await sql`SELECT COUNT(*) FROM shopping_list_items`)[0].count;
}



const markListItemsAsCollected = async (id) => {
    await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id}`;
}



export { findAllListItems, createListItem, collectedItemExists, markListItemsAsCollected, itemCount }