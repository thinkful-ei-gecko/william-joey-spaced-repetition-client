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
})

export default LanguageContext;

export class LanguageProvider extends Component {
    state = {
        language: {},
        words: [],
        error: null,
        headWord: {},
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

          }
          return (
            <LanguageContext.Provider value={value}>
                {this.props.children}
            </LanguageContext.Provider>
        )
      }
}