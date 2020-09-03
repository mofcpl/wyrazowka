import "@babel/polyfill";
import $ from "jquery";

import style from "./style.scss";
import "./fontello/css/fontello.css"

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from 'react-redux'

import {store, setLetterNumb, setWords, setLetters, setStatus} from "./redux-store.js"
import {Panel, Desc, Letters, Button, Counter, Words, Spinner} from "./interface.jsx"

class App extends React.Component
{
    constructor(props)
    {
        super(props);
    
        this.handleChangeLetter = this.handleChangeLetter.bind(this);
        this.handleChangeLetterNumb = this.handleChangeLetterNumb.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.findWords = this.findWords.bind(this);
    }

    handleChangeLetterNumb(type)
    {

        let tempArray = [...this.props.state.letters];

        switch(type)
        {
            case "INCREASE":
            {
                console.log("dodawanie");
                if(this.props.state.letters.length < 21) tempArray.push("");
                break;
            }
            case "DECREASE":
            {
                console.log("odejmowanie");
                if(this.props.state.letters.length > 2) tempArray.pop(); 
                break;
            }
            default: break;
        }

        this.props.submitSetLetters(tempArray);

    }

    handleChangeLetter(index, event)
    {
        const reg = /[a-zA-Z]?/;
        
        if(event.target.value.length >= 0 && event.target.value.length < 2 && reg.test(event.target.value))
        {
            let tempArray = this.props.state.letters;
            tempArray[index] = event.target.value.toLowerCase();
            this.props.submitSetLetters(tempArray);
        }
    }

    async findWords(word)
    {
        this.props.submitSetStatus("LOADING");

        const response = await fetch("https://wyrazowka.pl/dictionary", 
        {
            headers: {"Content-type": "application/json; charset=UTF-8"},
            method: "post", 
            body: JSON.stringify(this.props.state.letters)
        });
        
        const data = await response.json();
        this.props.submitSetWords(data);

        this.props.submitSetStatus("READY");
        $([document.documentElement, document.body]).animate({scrollTop: $("#bottom").offset().top}, 1000);
    }

    handleButton()
    {
        if(this.props.state.letters.join("").length !== 0) this.findWords();
    }

    render()
    {
        return(
        <div id="container">
            <div id="top">
                <Panel />
                <div id="main">
                    <Desc />
                    <Counter handle={this.handleChangeLetterNumb} data={this.props.state.letters.length}/>
                    <Letters handle={this.handleChangeLetter} data={this.props.state.letters} />
                    <Button handle={this.handleButton} />
                </div>
                <Spinner data={this.props.state.status} />
            </div>

            <Words data={this.props.state.words} />
        </div>
        );
    }
}

const mapStateToProps = (state) => 
{
    return {state};
};

const mapDispatchToProps = (dispatch) => 
{
    return {
        submitSetLetterNumb: (value) =>           {dispatch(setLetterNumb(value))},
        submitSetWords: (value) =>                {dispatch(setWords(value))},
        submitSetLetters: (value) =>              {dispatch(setLetters(value))},
        submitSetStatus: (value) =>               {dispatch(setStatus(value))}
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

class AppWrapper extends React.Component 
{
    render() {
      return (
        <Provider store={store}>
          <Container/>
        </Provider>
      );
    }
};

ReactDOM.render(<AppWrapper />, document.querySelector("#app"))

