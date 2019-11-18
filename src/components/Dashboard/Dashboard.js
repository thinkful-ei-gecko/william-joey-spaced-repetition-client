import React from 'react';
import LanguageService from '../../services/language-service';
import LanguageContext from '../../contexts/LanguageContext';

export default class Dashboard extends React.Component {
    static contextType = LanguageContext
    
    componentDidMount() {
        LanguageService.getLanguageAndWords()
            .then(data => {
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
                <h2 className="language-h2">You are Learning "{language.name}"</h2>
                <h3 className="total-score">Total correct answers: {language.total_score}</h3>
                <h4 id="words-h3">Words to practice</h4>

                <div className="words">
                {words.map(word =>
                    <ul className='words-list' key={word.id}>
                        <li className='word-li'id="original">{word.original}</li>
                        <div className="score">
                            <li className='word-correct'>
                                <i className="fa fa-check"><span className='span-word'>{word.correct_count}</span></i>
                            </li>
                            <li className='word-incorrect'>
                                <i className="fa fa-times"><span className='span-word'>{word.incorrect_count}</span></i>
                            </li>
                        </div>
                    </ul>
                )}
                </div>
            </>
        )
    }
}