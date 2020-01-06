import style from "./interface.scss";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from 'react-redux'

const Title = (props) =>
{
    return(
        <div id="title">
            <h1>Wyrazówka</h1>
        </div>
    )
}

const Desc = (props) =>
{
    return(
        <div id="desc">
            <h2>Wybierz ilość znaków a następnie wbrowadź wybrane litery i znajdź pasujące słowa w słowniku. </h2>
        </div>
    )
}

const Counter = (props) =>
{
    return(
        <div id="counter">
            <button onClick={ () => props.handle("DECREASE")}>-</button>
            <input readOnly value={props.data}></input>
            <button onClick={ () => props.handle("INCREASE")}>+</button>
        </div>
    )
}

const Letters = (props) =>
{
    const letters = props.data.map( ((currentValue, index, array) => {
        return <input key={index} className="letter" onChange={(event) => props.handle(index,event)} value={props.data[index]}></input>
    }))

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
            <button onClick={props.handle}>Znajdź wyrazy</button>
        </div>
    )
}

const Words = (props) =>
{
    return(
        <div id="words">
        </div>
    )
}

const Footer = (props) =>
{
    return(
        <div id="footer">
        </div>
    )
}

export {Title, Desc, Letters, Button, Counter, Words, Footer}