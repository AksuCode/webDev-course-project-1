import { renderFile, serve } from "./deps";
import { redirectTo, responseDetails } from "./utility/utility";
import * as shopping_lists_Service from "../services/shopping_lists_Service";

const addShoppinglist = async (request) => {
    const url = new URL(request.url);
    await shopping_lists_Service.createShoppinglist(url.searchParams("name"));

    return redirectTo("/lists");
}

const lookupShoppinglists = async () => {

    const dat = {
        lists: await shopping_lists_Service.findAllActiveShoppinglists(),
    }

    return new Response(await renderFile("lists.eta", dat), responseDetails);
}

export { addShoppinglist, lookupShoppinglists }