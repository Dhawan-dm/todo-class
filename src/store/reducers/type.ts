import {
  addTodo,
  deleteTodo,
  updateTodo,
  requiredList,
  completeTodo,
  checkTodo,
} from "../actions/index";

export type Actions = ReturnType<
  | typeof addTodo
  | typeof deleteTodo
  | typeof updateTodo
  | typeof completeTodo
  | typeof requiredList
  | typeof checkTodo
>;
