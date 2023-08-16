import { renderFile } from "../deps.js";
import { redirectTo, responseDetails } from "../utility/utility.js";
import * as shopping_lists_Service from "../services/shopping_lists_Service.js";



const addShoppinglist = async (request) => {
    const listName  = (await request.formData()).get("name");

    if (!listName) return redirectTo("/lists");
    if (await shopping_lists_Service.listCount(listName) >= 1) return redirectTo("/lists");

    await shopping_lists_Service.createShoppinglist(listName);

    return redirectTo("/lists");
}



const lookupShoppinglists = async () => {

    const dat = {
        lists: await shopping_lists_Service.findAllActiveShoppinglists(),
    }

    return new Response(await renderFile("lists.eta", dat), responseDetails);
}



const deactivateList = async (request) => {
    const id = Number(((new URL(request.url)).pathname.split("/"))[2]);
    await shopping_lists_Service.listMarkListActiveAsFalse(id);
    return redirectTo("/lists");
}



export { addShoppinglist, lookupShoppinglists, deactivateList }