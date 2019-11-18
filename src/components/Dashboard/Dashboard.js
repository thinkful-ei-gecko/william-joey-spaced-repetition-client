import React from 'react';
import LanguageService from '../../services/language-service';
import LanguageContext from '../../contexts/LanguageContext';

export default class Dashboard extends React.Component {
    static contextType = LanguageContext
    
    componentDidMount() {
        LanguageService.getLanguageAndWords()
            .then(words => {
                this.context.setWords(words)
            })
            .catch(res => {
                this.context.setError(res.error)
            })
    }

    render() {
        const { words = [] } = this.context;
        return (
            <>
                <h2 id="words-h2">Words</h2>

                {words.map(word =>
                    <ul className='words-list' key={word.id}>
                        <li className='word-li'>{word.translation}</li>
                        <li className='word-li'>{word.original}</li>
                    </ul>
                )}

            </>
        )
    }
}