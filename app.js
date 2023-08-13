import { renderFile, serve } from "./deps";
import { redirectTo, responseDetails } from "./utility/utility";
import * as listsControllers from "./controllers/shopping_lists_Controller";
import * as listItemControllers from "./controllers/shopping_list_items_Controller";


const handleRequest = async (request) => {

  const method = request.method;
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/") {
    return new Response(await renderFile("main.eta"), responseDetails);
  }

  else if (mehtod === "GET" && path === "/lists") {
    return await listsControllers.lookupShoppinglists();
  }

  else if (mehtod === "POST" && path === "/lists") {
    return await listsControllers.addShoppinglist(request);
  }

  else if (false) {

  }

  else if (false) {

  }

  else {
    redirectTo("/");
  }


};


serve(handleRequest, { port: 7777 });