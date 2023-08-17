import { renderFile, serve } from "./deps.js";
import { redirectTo, responseDetails } from "./utility/utility.js";
import * as listsControllers from "./controllers/shopping_lists_Controller.js";
import * as listItemControllers from "./controllers/shopping_list_items_Controller.js";
import { allItemCount } from "./controllers/shopping_list_items_Controller.js";
import { allListCount } from "./controllers/shopping_lists_Controller.js";



const handleRequest = async (request) => {

  const method = request.method;
  const path = (new URL(request.url)).pathname;

  
  if (path === "/") {

    const dat = {
      stats: [await allListCount(), await allItemCount()],
    }

    return new Response(await renderFile("main.eta", dat), responseDetails);
  }

  else if (method === "GET" && path === "/lists") {
    return await listsControllers.lookupShoppinglists();
  }

  else if (method === "POST" && path === "/lists") {
    return await listsControllers.addShoppinglist(request);
  }

  else if (method === "POST" && (path.match("/lists/[0-9]+/items/[0-9]+/collect") !== null)) {
    return await listItemControllers.collectItem(request);
  }

  else if (method === "POST" && (path.match("/lists/[0-9]+/deactivate") !== null)) {
    return await listsControllers.deactivateList(request);
  }

  else if (method === "POST" && (path.match("/lists/[0-9]+/items") !== null)) {
    return await listItemControllers.addListItems(request);
  }

  else if (method === "GET" && (path.match("/lists/[0-9]+") !== null)) {
    return await listItemControllers.lookupListItems(request);
  }

  else {
    return redirectTo("/");
  }


};


serve(handleRequest, { port: 7777 });