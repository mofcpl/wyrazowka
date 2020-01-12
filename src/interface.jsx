import style from "./interface.scss";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from 'react-redux'


const Desc = (props) =>
{
    return(
        <div id="desc">
            <div>Wybierz ilość znaków a następnie wbrowadź wybrane litery i znajdź pasujące słowa w słowniku. </div>
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
                <div>linked</div>
                <div>homepage</div>
                <div>github</div>
            </div>
        </div>
    )
}

export {Desc, Letters, Button, Counter, Words, Panel}