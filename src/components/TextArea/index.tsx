import React, { Component } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { checkTodo } from "../../store/actions/index";
import './style.css'

interface SubmitObject{
    id: number,
    text: string,
    isComplete: boolean
}

interface TextAreaProps{
    onSubmit: (e: SubmitObject) => void,
    type: string
    check: (e: boolean) => void
}

interface TextAreaState{
    input: string,
    check: boolean
}

export class TextArea extends Component<TextAreaProps, TextAreaState> {

    constructor(props: TextAreaProps) {
        super(props)
        this.state = { 
            input: '',
            check : false 
        }
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({ input: e.currentTarget.value })
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.onSubmit({
            id: Math.floor(Math.random() * 1000), //setting a unique id of todo
            text: this.state.input,
            isComplete: false
        })
        this.setState({ input: '' })
    }
    handleCheck(){
        if(this.state.check === false)
        {
            this.props.check(false);
            this.setState({check:true});
        }
        else
        {
            this.props.check(true);
            this.setState({check:false});
        }
    }

    render() {
        return (
            <form className="todo-form" onSubmit={(e) => this.handleSubmit(e)}>
                <div className={this.props.type !== "add" ? "input-edit" : "input-container"}>
                    <span className="material-symbols-outlined" onClick={() => this.handleCheck()}>
                        <IoIosArrowDown></IoIosArrowDown>
                    </span>
                    <input
                        type="text"
                        placeholder={this.props.type=== "add" ? "what needs to be done" : ""}
                        className="todo-input"
                        autoComplete="off"
                        value={this.state.input}
                        name='text'
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
            </form>
        )
    }
}

const mapsDispatchToProps = (dispatch: Dispatch) => {
    return {
        check:(e: boolean)=>dispatch(checkTodo(e))
    }
}
export default connect(null, mapsDispatchToProps)(TextArea)
