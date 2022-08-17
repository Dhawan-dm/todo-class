import React, { Component } from 'react'
import './TodoRadio.css'

type TextRadioProps = {
  list: (e: number) => void,
  size: number
}

type TextRadioState = {
  check: string
}

export default class TodoRadio extends Component<TextRadioProps, TextRadioState> {

  constructor(props: TextRadioProps) {
    super(props)
    this.state = { check: '' }
  }

  handleList(number: number, e: React.MouseEvent<HTMLElement>) { //taking number as the list clicked and e for id of the event
    this.props.list(number);
    if (this.state.check) {
      const remove = document.getElementById(this.state.check);
      if (remove !== null)
        remove.style.border = 'none';
    }
    let elem = document.getElementById(e.currentTarget.id);
    if (elem !== null) {
      elem.style.border = '.5px solid rgba(83, 82, 82, 0.461)';
      elem.style.borderRadius = '3px'
    }
    this.setState({ check: e.currentTarget.id });

  }

  render() {
    return (
      <div className='todo-radio'>
        <div className="item" onClick={() => this.props.list(-2)}> {this.props.size} items</div>
        <div className="todo-selection">
          <div className="radio-button" id="all" onClick={(e) => this.handleList(-2, e)}>All</div>
          <div className="radio-button" id='active' onClick={(e) => this.handleList(1, e)}>Active</div>
          <div className="radio-button" id='completed' onClick={(e) => this.handleList(2, e)}>Completed</div>
          <div className="radio-button clear-completed" onClick={() => this.props.list(-1)}>Clear Completed</div>
        </div>

      </div>
    )
  }
}
