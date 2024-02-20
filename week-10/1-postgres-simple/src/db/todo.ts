import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  try {
    const createTodoQuery = `INSERT INTO todos (user_id, title, description) VALUES ($1,$2,$3) RETURNING title, description, done, id`;
    const values = [userId, title, description];
    const result = await client.query(createTodoQuery, values);
    console.log(result.rows);
    return result.rows[0];
  } catch (error) {
    console.log("Error", error);
  }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  try {
    const updateTodoQuery = `
        UPDATE todos
        SET done = $1
        WHERE id = $2
        RETURNING title, description, done, id
        `;
    const values = [true, todoId];
    const result = await client.query(updateTodoQuery, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
interface Todo {
  title: string;
  description: string;
  done: boolean;
  id: number;
  user_id: number;
}
export async function getTodos(userId: number): Promise<Todo[]> {
  try {
    const getTodosQuery = `SELECT * FROM todos WHERE user_id = $1`;
    const values = [userId];
    const result = await client.query(getTodosQuery, values);
    return result.rows;
  } catch (error) {
    return [];
  }
}
