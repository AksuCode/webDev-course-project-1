import { sql } from "../database/database.js";

const createShoppinglist = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
}

const findAllActiveShoppinglists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
}

export { createShoppinglist, findAllActiveShoppinglists }