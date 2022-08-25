import { ActionTypes } from "../actionTypes/index";
import { Actions } from "./type";

export interface reducersType {
  todos: {
    id: number;
    text: string;
    isComplete: boolean;
  }[];
  filter: string;
}
const intialState: reducersType = {
  todos: [],
  filter: "all",
};

const reducer = (state = intialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO: {
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    }
    case ActionTypes.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          if (todo.id !== action.payload.id) {
            return todo;
          }
        }),
      };
    }
    case ActionTypes.UPDATE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.text = action.payload.text;
          }
          return todo;
        }),
      };
    }
    case ActionTypes.COMPLETE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.isComplete = !todo.isComplete;
          }
          return todo;
        }),
      };
    }
    case ActionTypes.REQUIRED_TODO: {
      if (action.payload.text === "clear") {
        let newTodos = state.todos.filter((todo) => {
          if (!todo.isComplete) {
            return todo;
          }
        });
        return {
          ...state,
          todos: newTodos,
        };
      }
      return {
        ...state,
        filter: action.payload.text,
      };
    }
    case ActionTypes.CHECK_ALL: {
      if (!action.payload.isComplete) {
        return {
          ...state,
          todos: state.todos.map((todo) => {
            if (!todo.isComplete) {
              todo.isComplete = !todo.isComplete;
            }
            return todo; // check all todos
          }),
        };
      } else {
        return {
          ...state,
          todos: state.todos.map((todo) => {
            if (todo.isComplete) {
              todo.isComplete = !todo.isComplete;
            }
            return todo; //uncheck all todos
          }),
        };
      }
    }
    default:
      return state;
  }
};

export default reducer;
