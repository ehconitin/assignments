import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(
  username: string,
  password: string,
  name: string
) {
  try {
    const createQuery = `INSERT INTO users (username, password, name) VALUES ($1,$2,$3);`;
    const values = [username, password, name];
    const result = client.query(createQuery, values);
    console.log(result);
  } catch (error) {
    console.log("Error", error);
  }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  try {
    const getUserQuery = `SELECT * FROM users WHERE id = $1`;
    const res = await client.query(getUserQuery, [userId]);
    if (res.rows.length > 0) {
      console.log("User found");
      return res.rows[0];
    } else {
      console.log("User not found");
      return null;
    }
  } catch (err) {
    console.log("Error", err);
  }
}
