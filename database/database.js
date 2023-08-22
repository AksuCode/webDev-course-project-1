import { postgres }from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
  console.log("Env sql chosen.");
} else {
  sql = postgres({});
  console.log("Local sql chosen.");
}

export { sql };