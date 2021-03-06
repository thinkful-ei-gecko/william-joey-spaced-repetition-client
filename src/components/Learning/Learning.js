import React from "react";
import LanguageService from "../../services/language-service";
import LanguageContext from "../../contexts/LanguageContext";
import Button from "../../components/Button/Button";
import "./Learning.css";

export default class Dashboard extends React.Component {
  static contextType = LanguageContext;

  state = {
    render: true,
    isDisabled: false
  };

  buttonTimeout = e => {
    e.preventDefault();
    this.setState({
      isDisabled: true
    });
  };

  componentDidMount() {
    LanguageService.getHead()
      .then(headWord => {
        this.context.setHeadWord(headWord);
      })
      .catch(res => {
        this.context.setError(res.error);
      });
  }

  handleGuess = e => {
    e.preventDefault();
    this.setState({ isDisabled: true });
    LanguageService.postGuess(this.context.guess).then(res => {
      this.context.setResponse(res);
      this.setState({ render: false, isDisabled: false });
    });
  };

  handleNextWord = e => {
    LanguageService.getHead()
      .then(headWord => {
        this.context.setHeadWord(headWord);
        this.setState({ render: true });
        this.context.setGuess('');
      })
      .catch(res => {
        this.context.setError(res.error);
      });
  };

  renderForm = () => {
    const { headWord = {}, response = {} } = this.context;
    return (
      <>
        <p id='total-score-form' aria-live="polite">Your total score is: {!response.totalScore ? headWord.totalScore : response.totalScore}</p>
        <h2 id='translate-word'>Translate the word:</h2><span id="word" aria-live="polite">{!response.nextWord ? headWord.nextWord : response.nextWord}</span>

        <form className="guess-form" onSubmit={e => this.handleGuess(e)}>
          <fieldset className="guess-fieldset">
            <label htmlFor="learn-guess-input" aria-label="What's the translation for this word?">
              What's the translation for this word?
            </label>
            <input
              name="learn-guess-input"
              id="learn-guess-input"
              type="text"
              aria-required="true"
              placeholder="Enter the English translation.."
              required
              value={this.context.guess}
              onChange={e => this.context.setGuess(e.target.value)}
            />
          </fieldset>
          <Button
            type="submit"
            id="submit-guess-button"
            disabled={this.state.isDisabled}
          >
            Submit your answer
          </Button>
        </form>

        <p id="word-count1" aria-live="polite">
          You have answered this word correctly {headWord.wordCorrectCount}{" "}
          times.
        </p>
        <p id="word-count2" aria-live="polite">
          You have answered this word incorrectly {headWord.wordIncorrectCount}{" "}
          times.
        </p>
      </>
    );
  };

  renderResponse = () => {
    let { headWord = {}, response = {} } = this.context;
    let incorrectResponse = 'Good try, but not quite right :('
    return (
      <div className="response" aria-live="polite">
        {response.isCorrect ? (
          <h2 id="isCorrect">You were correct! :D</h2>
        ) : (
          <h2 id="notCorrect">{incorrectResponse}</h2>
        )}
        <div className="DisplayScore" aria-live="polite">
          <p>Your total score is: {response.totalScore}</p>
        </div>
        <div className="DisplayFeedback">
          <p id="guess-answer" aria-live="polite">
            The correct translation for <b>{headWord.nextWord}</b> was{" "}
            <b>{response.answer}</b> and you chose <b>{this.context.guess}</b>!
          </p>
        </div>
        <Button onClick={this.handleNextWord}>Try another word!</Button>
      </div>
    );
  };

  render() {
    return (
      <section className="learning" aria-live="polite">
        {this.state.render ? this.renderForm() : this.renderResponse()}
      </section>
    );
  }
}
