import React, { Component } from 'react'
import { ImCross } from "react-icons/im";
import { VscCircleLargeOutline } from "react-icons/vsc";
import { AiOutlineCheckCircle } from "react-icons/ai";
import TextArea from "../TextArea/TextArea";
import './Todo.css'

type SubmitObject = {
  id: number,
  text: string
  isComplete: boolean
}

type ListProps = {
  todos: any,
  completeTodo: (id: number) => void
  deleteTodo: (id: number) => void
  updateTodo: (id: number, value: string) => void
  checkAll: () => void
  show: "active"|"all"|"completed"|"clear"
}

type TodoState = {
  edit: {
    id: number,
    value: string,
    isComplete: boolean
  }
}

export default class Todo extends Component<ListProps, TodoState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {
      edit: {
        id: -1,
        value: "",
        isComplete: false
      }
    }
  }

  handleUpdate(e: { id: number, text: string, isComplete: boolean }) {
    this.props.updateTodo(this.state.edit.id, e.text);
    this.setState({
      edit: {
        id: -1,
        value: "",
        isComplete: false,
      }
    })
  }

  changeState(newId: number, newVal: string, newBool: boolean) {
    this.setState({
      edit: {
        id: newId,
        value: newVal,
        isComplete: newBool
      }
    })
  }

  render() {
    return (
      this.props.todos.map((todo: SubmitObject, index: number) => (
        <div
          className={"todo-row " + (todo.isComplete ? "complete " : "") + (todo.isComplete ? this.props.show === "active" ? "one" : "" : "") + (!todo.isComplete ? this.props.show === "completed" ? "two" : "" : "")}
          key={index}
        >
          <div className="todo-container" key={todo.id}>
            <div className="div-contents">
              {!todo.isComplete ? (<VscCircleLargeOutline
                onClick={() => this.props.completeTodo(todo.id)}
              ></VscCircleLargeOutline>) :
                <AiOutlineCheckCircle onClick={() => this.props.completeTodo(todo.id)}></AiOutlineCheckCircle>}
              <div
                className="todo-div"
                onDoubleClick={() => this.changeState(todo.id, todo.text, todo.isComplete)}
              >
                {this.state.edit.id === todo.id ? (     // update todo                         
                  <TextArea edit={this.state.edit} onSubmit={(e) => this.handleUpdate(e)} checkAll={() => this.props.checkAll()} />
                ) : (
                  <div className={todo.isComplete ? "complete" : ""}>{todo.text}</div>)}

              </div>
              <ImCross
                className="todo-icon"
                onClick={() => this.props.deleteTodo(todo.id)}
              ></ImCross>
            </div>
          </div>
        </div>
      ))

    )
  }
}
