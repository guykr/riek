import React from 'react';
import ReactDOM from 'react-dom';
import RIEBase from './RIEBase';

export default class RIEStatefulBase extends RIEBase {
    constructor(props){
        super(props);
    }

    startEditing = () => {
        this.setState({editing: true});
    };

    finishEditing = () => {
        let newValue = ReactDOM.findDOMNode(this.refs.input).value;
        this.doValidations(newValue);
        if(!this.state.invalid && this.props.value !== newValue) {
            this.commit(newValue);
        }
        this.cancelEditing();
    };

    cancelEditing = () => {
        this.setState({editing: false, invalid: false});
    };

    keyDown = (event) => {
        if(event.keyCode === 13) { this.finishEditing() }           // Enter
        else if (event.keyCode === 27) { this.cancelEditing() }     // Escape
    };

    textChanged = (event) => {
        this.doValidations(event.target.value.trim());
    };

    componentDidUpdate = (prevProps, prevState) => {
        const inputElem = ReactDOM.findDOMNode(this.refs.input);
        const prevEditing = prevProps.hasOwnProperty('editing') ? prevProps.editing : prevState.editing;
        if (this.editing && !prevEditing) {
            inputElem.focus();
            this.selectInputText(inputElem);
        } else if (this.editing && prevProps.text != this.props.text) {
            this.finishEditing();
        }
    };

    renderEditingComponent = () => {
        return <input
            disabled={this.loading}
            className={this.makeClassString()}
            defaultValue={this.props.value}
            onInput={this.textChanged}
            onBlur={this.finishEditing}
            ref="input"
            onKeyDown={this.keyDown}
            {...this.props.editProps} />;
    };

    renderNormalComponent = () => {
        return <span
            tabIndex="0"
            className={this.makeClassString()}
            onFocus={this.startEditing}
            onClick={this.startEditing}
            {...this.props.defaultProps}>{this.state.newValue || this.props.value || this.props.placeholder}</span>;
    };

    elementBlur = (event) => {
        this.finishEditing();
    };

    elementClick = (event) => {
        this.startEditing();
        event.target.element.focus();
    };

    render = () => {
        if(this.editing) {
            return this.renderEditingComponent();
        } else {
            return this.renderNormalComponent();
        }
    };
}
