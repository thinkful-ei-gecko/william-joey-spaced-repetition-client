import React from "react";
import LanguageService from "../../services/language-service";
import LanguageContext from "../../contexts/LanguageContext";

export default class Dashboard extends React.Component {
  static contextType = LanguageContext;

  componentDidMount() {
    LanguageService.getLanguageAndWords()
      .then(data => {
        this.context.setWords(data.words);
        this.context.setLanguage(data.language);
        this.context.setGuess('');
        this.context.setResponse({})
      })
      .catch(res => {
        this.context.setError(res.error);
      });
  }

  render() {
    const { words = [], language = {} } = this.context;
    return (
      <>
        <h2 className="language-h2">You are Learning "{language.name}"</h2>
        <h3 id="words-h3">Words to practice</h3>
        <h4 className="total-score">
          Total correct answers: {language.total_score}
        </h4>

        <div className="words">
          <ul className="words-ul">

            {words.map(word => (
              <li key={word.id} id={word.id} className="words-list" aria-live="polite">
                <h4 className="original">{word.original}</h4>
                <div className="score">
                  <p className="score-p">
                    correct answer count: {word.correct_count}
                  </p>
                  <p className="score-p">
                    incorrect answer count: {word.incorrect_count}
                  </p>
                </div>
              </li>
            ))}
            
          </ul>
        </div>
      </>
    );
  }
}