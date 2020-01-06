import "@babel/polyfill";

import style from "./style.scss";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from 'react-redux'

import {store, setLetterNumb, setWords, setLetters} from "./redux-store.js"
import {Title, Desc, Letters, Button, Counter, Words, Footer} from "./interface.jsx"

class App extends React.Component
{
    constructor(props)
    {
        super(props);
    
        this.handleChangeLetter = this.handleChangeLetter.bind(this);
        this.handleChangeLetterNumb = this.handleChangeLetterNumb.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    handleChangeLetterNumb(type)
    {

        let tempArray = [...this.props.state.letters];

        switch(type)
        {
            case "INCREASE":
            {
                if(this.props.state.letters.length < 21)
                {
                    tempArray.push("");
                    break;
                }
            }
            case "DECREASE":
            {
                if(this.props.state.letters.length > 2)
                {
                    tempArray.pop();
                    break;
                }
            }
            default: break;
        }

        this.props.submitSetLetters(tempArray);

    }

    handleChangeLetter(index, event)
    {
        if(event.target.value.length >= 0 && event.target.value.length < 2)
        {
            let tempArray = this.props.state.letters;
            tempArray[index] = event.target.value;
            this.props.submitSetLetters(tempArray);
        }
        
    }

    handleButton()
    {
        console.log("button was pushed");
    }

    render()
    {
        return(
        <div id="container">
            <Title />
            <Desc />
            <Counter handle={this.handleChangeLetterNumb} data={this.props.state.letters.length}/>
            <Letters handle={this.handleChangeLetter} data={this.props.state.letters} />
            <Button handle={this.handleButton} />
            <Words />
            <Footer />
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
        submitSetLetters: (value) =>              {dispatch(setLetters(value))}
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

