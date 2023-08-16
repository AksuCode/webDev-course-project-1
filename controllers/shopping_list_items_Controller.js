import { renderFile } from "../deps.js";
import { redirectTo, responseDetails } from "../utility/utility.js";
import * as shopping_list_items_Service from "../services/shopping_list_items_Service.js";



const lookupListItems = async (request) => {
    const id = Number(((new URL(request.url)).pathname.split("/"))[2]);

    const dat = {
        items: await shopping_list_items_Service.findAllListItems(id),
    }

    return new Response(await renderFile("list.eta", dat), responseDetails);
}