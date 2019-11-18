import React from 'react';
import LanguageService from '../../services/language-service';
import LanguageContext from '../../contexts/LanguageContext';

export default class Dashboard extends React.Component {
    static contextType = LanguageContext
    
    componentDidMount() {
        LanguageService.getLanguageAndWords()
            .then(data => {
                console.log(data.language);
                this.context.setWords(data.words);
                this.context.setLanguage(data.language);
            })
            .catch(res => {
                this.context.setError(res.error);
            })
    }

    render() {
        const { words = [], language = {} } = this.context;
        return (
            <>
                <h2 className="language-h2">{language.name}</h2>
                <h3 id="words-h3">Words</h3>
                <h4 className="total-score">Total Score:{language.total_score}</h4>
                <div className="words">
                {words.map(word =>
                    <ul className='words-list' key={word.id}>
                        <li className='word-li'>{word.original}</li>
                        <li className='word-li'>correct:{word.correct_count}</li>
                        <li className='word-li'>incorrect:{word.incorrect_count}</li>
                    </ul>
                )}
                </div>
            </>
        )
    }
}