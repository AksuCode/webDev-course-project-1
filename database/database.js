import pstg from "../deps";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = pstg(Deno.env.get("DATABASE_URL"));
} else {
  sql = pstg({});
}

export { sql };