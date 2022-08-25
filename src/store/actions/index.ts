import { ActionTypes } from "../actionTypes";

interface actionTypes {
  id: number;
  text: string;
  isComplete: boolean;
}

export const addTodo = (x: actionTypes) => {
  return {
    type: ActionTypes.ADD_TODO,
    payload: {
      id: x.id,
      text: x.text,
      isComplete: x.isComplete,
    },
  };
};
export const deleteTodo = (id: number) => {
  return {
    type: ActionTypes.DELETE_TODO,
    payload: {
      id: id,
      text: "",
      isComplete: false,
    },
  };
};
export const updateTodo = (payloadId: number, payloadValue: string) => {
  return {
    type: ActionTypes.UPDATE_TODO,
    payload: {
      id: payloadId,
      text: payloadValue,
      isComplete: false,
    },
  };
};
export const completeTodo = (id: number) => {
  return {
    type: ActionTypes.COMPLETE_TODO,
    payload: {
      id: id,
      text: "",
      isComplete: false,
    },
  };
};
export const requiredList = (text: string) => {
  return {
    type: ActionTypes.REQUIRED_TODO,
    payload: {
      id: -1,
      text: text,
      isComplete: false,
    },
  };
};
export const checkTodo = (e: boolean) => {
  return {
    type: ActionTypes.CHECK_ALL,
    payload: {
      id: -1,
      text: "",
      isComplete: e,
    },
  };
};
