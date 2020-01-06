import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'



///////////////////////////////////////////////////////CONSTANTS///////////////////////////////////////////////////////

const SET_LETTER_NUMBER = "SET_LETTER_NUMBER"
const SET_LETTERS = "SET_LETTERS"
const SET_WORDS = "SET_WORDS"


///////////////////////////////////////////////////////DEFAULT_STORE///////////////////////////////////////////////////////

const defaultState =
{
    letterNumb: 5,
    letters: ["","","","",""],
    words: []
}

///////////////////////////////////////////////////////ACTION CREATORS///////////////////////////////////////////////////////

const setLetterNumb = (value) =>
{
    return {type: SET_LETTER_NUMBER, value: value}
}

const setLetters = (value) =>
{
    return {type: SET_LETTERS, value: value}
}

const setWords = (value) =>
{
    return {type: SET_WORDS, value: value}
}

///////////////////////////////////////////////////////REDUCER///////////////////////////////////////////////////////

const reducer = (state = defaultState, action) =>
{

    switch(action.type)
    {
        case SET_LETTER_NUMBER:     {return Object.assign({},state, {letterNumb: action.value});}
        case SET_WORDS:             {return Object.assign({},state, {words: action.value});}
        case SET_LETTERS:             {return Object.assign({},state, {letters: action.value});}
        
        default: return defaultState;
    }
}

const store = createStore(reducer);

export {store, setLetterNumb, setWords, setLetters}