import React, { Component } from 'react'
import Textarea from "../TextArea/TextArea";
import Todo from '../Todo/Todo';
import TodoRadio from '../TodoRadio/TodoRadio';
import './List.css'


type AppProps = {

}
type ListState = {
  todos: {
    id: number,
    text: string,
    isComplete: boolean
  }[],
  show: number,
  check: number,
  size : number
}
export default class List extends Component<AppProps, ListState> {
  edit = {
    id: -1,
    value: '',
    isComplete: false
  }
  constructor(props: AppProps) {
    super(props);
    this.state = {
      todos: [],
      show: -2,
      check: 0,
      size:0
    }
  }
  addTodo(e: { id: number, text: string, isComplete: boolean }) {
    if (!e.text) {
      return;
    }
    const newTodo = [e, ...this.state.todos];                 // add todo
    this.setState({ todos: newTodo, size:this.state.size + 1});
  }
  updatedTodo(id: number, value: string) {
    let editedTodo = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.text = value
      }
      return todo;
    })                                            // update todo
    this.setState({ todos: editedTodo });
  }
  deleteTodo(id: number) {
    let newTodos = this.state.todos.filter((todo) => {
      if (todo.id !== id) {
        return todo;
      }
    })                                            // remove todo
    this.setState({ todos: newTodos, size:this.state.size - 1 });
  }
  completeTodo(id: number) {
    let checkedTodo = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    })                                            // check uncheck todo
    this.setState({ todos: checkedTodo });
  }
  requiredList(radio: number) {
    if (radio === -1) {
      let newTodos = this.state.todos.filter((todo) => {
        if (!todo.isComplete) {
          return todo;
        }
      })
      this.setState({ todos: newTodos })
    }
    else {                                        //filter todo
      this.setState({ show: radio });
    }
    console.log(radio);
    
  }
  checkAll() {
    let completeTodo = this.state.todos.map((todo) => {
      if (!todo.isComplete) {
        todo.isComplete = !todo.isComplete;
        this.setState({ check: 1 });
      }
      return todo;                                 // check all todos
    })
    if (this.state.check === 1) {
      this.uncheckAll();
    }
    console.log(this.state.check);
    this.setState({ todos: completeTodo});
  }
  uncheckAll() {
    let incompleteTodo = this.state.todos.map((todo) => {
      if (todo.isComplete) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    })                                            // uncheck all todos
    this.setState({ todos: incompleteTodo });
    this.setState({check:0})
  }
  render() {
    return (
      <div className='container'>
        <Textarea edit={this.edit} onSubmit={(e) => this.addTodo(e)} checkAll = {()=>this.checkAll()}/>
        <Todo todos={this.state.todos} completeTodo={(e) => this.completeTodo(e)} deleteTodo={(e) => this.deleteTodo(e)} updateTodo={(id, value) => this.updatedTodo(id, value)} show={this.state.show} checkAll = {()=>this.checkAll()}/>
        {this.state.todos.length ? (<TodoRadio list={(e) => this.requiredList(e)} size = {this.state.size} />) : (<div></div>)}
      </div>
    )
  }
}
