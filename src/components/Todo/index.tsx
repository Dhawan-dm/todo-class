import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ImCross } from "react-icons/im";
import { VscCircleLargeOutline } from "react-icons/vsc";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { deleteTodo, updateTodo, completeTodo } from "../../store/actions/index";
import { reducersType } from '../../store/reducers';
import TextArea from "../TextArea";
import './style.css'
import { Dispatch } from 'redux';

interface SubmitObject {
  id: number,
  text: string
  isComplete: boolean
}

interface ListProps {
  todo: { id: number, text: string, isComplete: boolean }[],
  complete: (id: number) => void
  remove: (id: number) => void
  update: (id: number, value: string) => void
  filter: string
}

interface TodoState {
  edit: {
    id: number,
    value: string,
    isComplete: boolean
  }
}

class Todo extends Component<ListProps, TodoState> {
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
    this.props.update(this.state.edit.id, e.text)
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
      this.props.todo.map((todo: SubmitObject, index: number) => (
        <div
          className={"todo-row " + (todo.isComplete ? "complete " : "") + (todo.isComplete ? this.props.filter === "active" ? "one" : "" : "") + (!todo.isComplete ? this.props.filter === "completed" ? "two" : "" : "")}
          key={index}
        >
          <div className="todo-container" key={todo.id}>
            <div className="div-contents">
              {!todo.isComplete ? (<VscCircleLargeOutline
                onClick={() => this.props.complete(todo.id)}
              ></VscCircleLargeOutline>) :
                <AiOutlineCheckCircle onClick={() => this.props.complete(todo.id)}></AiOutlineCheckCircle>}
              <div
                className="todo-div"
                onDoubleClick={() => this.changeState(todo.id, todo.text, todo.isComplete)}
              >
                {this.state.edit.id === todo.id ? (     // update todo                         
                  <TextArea type={"update"} onSubmit={(e) => this.handleUpdate(e)} />
                ) : (
                  <div className={todo.isComplete ? "complete" : ""}>{todo.text}</div>)}

              </div>
              <ImCross
                className="todo-icon"
                onClick={() => this.props.remove(todo.id)}
              ></ImCross>
            </div>
          </div>
        </div>
      ))

    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    update: (id: number, value: string) => dispatch(updateTodo(id, value)),
    remove: (id: number) => dispatch(deleteTodo(id)),
    complete: (id: number) => dispatch(completeTodo(id))
  }
}
const mapStateToProps = (state: reducersType) => {
  return {
    todo: state.todos,
    filter: state.filter
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)