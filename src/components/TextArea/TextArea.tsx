import React, { Component } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import './TextArea.css'

type SubmitObject = {
    id: number,
    text: string,
    isComplete: boolean
}

type TextAreaProps = {
    onSubmit: (e: SubmitObject) => void,
    edit: {
        id: number,
        value: string,
        isComplete: boolean
    }
    checkAll: () => void
}

type TextAreaState = {
    input: string

}

export default class TextArea extends Component<TextAreaProps, TextAreaState> {

    constructor(props: TextAreaProps) {
        super(props)
        this.state = { input: '' }
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
        this.setState({input:''})
    }

    render() {
        return (
            <form className="todo-form" onSubmit={(e) => this.handleSubmit(e)}>
                <div className={this.props.edit.id !== -1 ? "input-edit" : "input-container"}>
                    <span className="material-symbols-outlined" onClick={() => this.props.checkAll()}>
                        <IoIosArrowDown></IoIosArrowDown>
                    </span>
                    <input
                        type="text"
                        placeholder={this.props.edit.id ? "what needs to be done" : ""}
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

