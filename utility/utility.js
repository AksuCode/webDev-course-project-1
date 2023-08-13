import { configure } from "../deps";

configure({
  views: `${Deno.cwd()}/../views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`-`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

export { redirectTo, responseDetails }