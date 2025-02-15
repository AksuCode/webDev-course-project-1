import { renderFile } from "../deps.js";
import { redirectTo, responseDetails } from "../utility/utility.js";
import * as shopping_list_items_Service from "../services/shopping_list_items_Service.js";
import { findListWithId } from "../services/shopping_lists_Service.js";


const lookupListItems = async (request) => {
    const id = Number(((new URL(request.url)).pathname.split("/"))[2]);

    const dat = {
        items: await shopping_list_items_Service.findAllListItems(id),
        path:(new URL(request.url)).pathname,
        name: (await findListWithId(id))[0].name, 
    }

    return new Response(await renderFile("list.eta", dat), responseDetails);
}



const addListItems = async (request) => {
    const itemName  = (await request.formData()).get("name");
    const listId = Number((new URL(request.url)).pathname.split("/")[2]);
    const path = `../${listId}`;

    if (!itemName || !/\S/.test(itemName)) return redirectTo(path);
    if (await shopping_list_items_Service.collectedItemExists(listId, itemName)) return redirectTo(path);

    await shopping_list_items_Service.createListItem(listId, itemName);

    return redirectTo(path);
}



const collectItem = async (request) => {
    const id = Number(((new URL(request.url)).pathname.split("/"))[4]);
    const path = `../../../${((new URL(request.url)).pathname.split("/"))[2]}`;

    await shopping_list_items_Service.markListItemsAsCollected(id);
    return redirectTo(path);
}



const allItemCount = async (request) => {
    return await shopping_list_items_Service.itemCount();
}



export { lookupListItems, addListItems, collectItem, allItemCount }