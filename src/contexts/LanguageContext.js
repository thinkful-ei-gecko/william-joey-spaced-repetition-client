import React, { Component } from 'react'


const LanguageContext = React.createContext({
    words: [],
    error: null,
    setError: () => {},
})
export default LanguageContext;

export class LanguageProvider extends Component {
    state = {
        words: [],
        error: null,
    }
    setWords = words =>{
        this.setState({words})
    }
    setError = error => {
        console.error(error)
        this.setState({ error })
      }

}