import React from 'react';
import LanguageService from '../services/language-service';
import LanguageContext from '../../contexts/LanguageContext'

export default class Dashboard extends React.Component {
    static contextType = LanguageContext
    componentDidMount(){
        LanguageService.getLanguageAndWords()
            .then(this.context.setWords)
            .catch(this.context.setError)

    }
    renderWords(){
        const { words = []} = this.context
    }
}