import { renderFile, serve } from "../deps.js";
import { redirectTo, responseDetails } from "../utility/utility.js";
import * as shopping_lists_Service from "../services/shopping_lists_Service.js";

const addShoppinglist = async (request) => {
    const formdat = await request.formData();
    await shopping_lists_Service.createShoppinglist(formdat.get("name"));

    return redirectTo("/lists");
}

const lookupShoppinglists = async () => {

    const dat = {
        lists: await shopping_lists_Service.findAllActiveShoppinglists(),
    }

    return new Response(await renderFile("lists.eta", dat), responseDetails);
}

export { addShoppinglist, lookupShoppinglists }