import { connect } from 'react-redux';
import { Component } from 'react'
import { Dispatch } from 'redux';
import { reducersType } from '../../store/reducers';
import Textarea from "../TextArea";
import Todo from '../Todo';
import TodoRadio from '../TodoRadio';
import './style.css'
import { addTodo } from '../../store/actions';

interface SubmitObject {
  id: number,
  text: string,
  isComplete: boolean
}
interface AppProps {
  todo: {
    id: number,
    text: string,
    isComplete: boolean
  }[],
  add: (e: SubmitObject) => void
}
class List extends Component<AppProps> {

  checkAll() { }

  render() {
    return (
      <div className='container'>
        <Textarea type={"add"} onSubmit={(e) => this.props.add(e)} />
        <Todo />
        {this.props.todo.length ? (<TodoRadio size={this.props.todo.length} />) : (<div></div>)}
      </div>
    )
  }
}

const mapStateToProps = (state: reducersType) => {
  return {
    todo: state.todos,
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    add: (e: SubmitObject) => dispatch(addTodo(e)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(List)