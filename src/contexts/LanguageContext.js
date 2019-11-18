import React, { Component } from 'react'


const LanguageContext = React.createContext({
    words: [],
    error: null,
    setError: () => {},
    setWords: () => {}
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
      render() {
          const value = {
              words: this.state.words,
              error: this.state.error,
              setError: this.setError,
              setWords: this.setWords,
          }
          return (
            <LanguageContext.Provider value={value}>
                {this.props.children}
            </LanguageContext.Provider>
        )
      }
}