import { sql } from "../database/database.js";



const createShoppinglist = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
}



const findAllActiveShoppinglists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true ORDER BY name`;
}



const activeListExists = async (name) => {
    return (await sql`SELECT COUNT(*) FROM shopping_lists WHERE active = true AND name = ${name}`)[0].count >= 1;
}



const listCount = async () => {
    return (await sql`SELECT COUNT(*) FROM shopping_lists`)[0].count;
}
 


const listMarkListActiveAsFalse = async (id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
}

const findListWithId = async (id) => {
    return await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;
}

export { createShoppinglist, findAllActiveShoppinglists, listCount, listMarkListActiveAsFalse, activeListExists, findListWithId }