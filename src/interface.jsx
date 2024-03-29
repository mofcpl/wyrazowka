import style from "./interface.scss";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from 'react-redux'


const Desc = (props) =>
{
    return(
        <div id="desc">
            <div>Wybierz ilość znaków a następnie wprowadź wybrane litery i znajdź pasujące słowa</div>
        </div>
    )
}

const Counter = (props) =>
{
    return(
        <div id="counter">
            <button onClick={ () => props.handle("DECREASE")}>mniej</button>
            {/*<input readOnly value={props.data}></input>*/}
            <button onClick={ () => props.handle("INCREASE")}>więcej</button>
        </div>
    )
}

const Letters = (props) =>
{
    const letters = props.data.map( (currentValue, index, array) => {
        return <input key={index} className="letter" onChange={(event) => props.handle(index,event)} value={props.data[index]}></input>
    });

    return(
        <div id="letters">
            {letters}
        </div>
    );
}

const Button = (props) =>
{
    return(
        <div id="button">
            <button onClick={props.handle}>znajdź</button>
        </div>
    )
}

const Words = (props) =>
{
const words = props.data.map( (currentValue, index, array) => { return <div key={index}>{currentValue}</div>})
    return(
        <div id="bottom">
            <div id="words">
                {words}
            </div>
        </div>
    )
}

const Panel = (props) =>
{
    return(
        <div id="panel">
            <div id="title">
                <div>Wyrazówka</div>
            </div>
            <div id="links">
                <a className="text" href="https://pl.linkedin.com/in/zbrogdom" target="_blank">linkedin</a>
                <a className="icon" href="https://pl.linkedin.com/in/zbrogdom" target="_blank"><i className="icon-linkedin-squared"></i></a>

                <a className="text" href="https://zbrogdom.pl" target="_blank">homepage</a>
                <a className="icon" href="https://zbrogdom.pl" target="_blank"><i className="icon-home"></i></a>

                <a className="text" href="https://github.com/mofcpl/wyrazowka" target="_blank">github</a>
                <a className="icon" href="https://github.com/mofcpl/wyrazowka" target="_blank"><i className="icon-github-circled"></i></a>
            </div>
        </div>
    )
}

const Spinner = (props) =>
{
    let tempDiv;
    
    switch(props.data)
    {
        case "READY":
        {
            tempDiv = <div></div>;
            break;
        }
        case "LOADING":
        {
            tempDiv = 
            <div id="loading">
                <div id="spinner"></div>
            </div>;
            break;
        }
        default: break;
    }
    return tempDiv;

}

export {Desc, Letters, Button, Counter, Words, Panel, Spinner}