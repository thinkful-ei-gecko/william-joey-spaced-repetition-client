import React, { Component } from 'react'


const LanguageContext = React.createContext({
    language: {},
    words: [],
    error: null,
    headWord: {},
    setError: () => {},
    setWords: () => {},
    setLanguage: () => {},
    setHeadWord: () => {},
    setResponse: () => {},
    setRenderForm: () => {},
    renderForm: true,
    guess: '',
    response: {}
})

export default LanguageContext;

export class LanguageProvider extends Component {
    state = {
        language: {},
        words: [],
        error: null,
        headWord: {},
        renderForm: true,
        guess: '',
        response: {}
    }
   setRenderForm = renderForm =>{
       this.setState({renderForm})
   }
    setLanguage = language => {
        this.setState({ language })
    }
    setWords = words =>{
        this.setState({ words })
    }
    setError = error => {
        console.error(error)
        this.setState({ error })
      }
    setHeadWord = headWord => {
        this.setState({headWord})
    }
    setResponse = response =>{
        this.setState({response})
    }
      render() {
          const value = {
              language: this.state.language,
              words: this.state.words,
              error: this.state.error,
              setError: this.setError,
              setWords: this.setWords,
              setLanguage: this.setLanguage,
              headWord: this.state.headWord,
              setHeadWord: this.setHeadWord,
              renderForm: this.state.renderForm,
              setRenderForm: this.setRenderForm,
              guess: this.state.guess,
              response: this.state.response,
              

          }
          return (
            <LanguageContext.Provider value={value}>
                {this.props.children}
            </LanguageContext.Provider>
        )
      }
}