import React from 'react';
import LanguageService from '../../services/language-service';
import LanguageContext from '../../contexts/LanguageContext';
import Button from '../../components/Button/Button';
import './Learning.css';

export default class Dashboard extends React.Component {
    static contextType = LanguageContext

    state = {
        render: true
      };
    
    
    componentDidMount() {
        LanguageService.getHead()
        .then(headWord => {
            this.context.setHeadWord(headWord);
        })
        .catch(res => {
            this.context.setError(res.error);
        })

    }
    handleGuess = e =>{
      e.preventDefault();
      let guess = this.context.guess
      LanguageService.postGuess(guess)
      .then(res => {
      this.context.setResponse(res);
      this.setState({render: false});
    });
    }
    handleNextWord = e =>{
        LanguageService.getHead()
        .then(headWord => {
            this.context.setHeadWord(headWord);
            this.setState({render: true});
        })
        .catch(res => {
            this.context.setError(res.error);
        })


    }
    renderForm = () => {
        const { headWord = {} } = this.context;
        
       
        return (
            <>
           
                <form className="guess-form">
                    <label htmlFor="learn-guess-input">
                    What's the translation for this word?
                    </label>
                    <input name="learn-guess-input" id="learn-guess-input" type="text" required="required" 
                    onChange={e => this.context.setGuess(e.target.value)}></input>
                    <Button type="submit" 
                    id="submit-guess-button"
                    
                    onClick={this.handleGuess}
                    value={this.context.guess}
                    >
                        Submit your answer
                    </Button> 
                </form>
                
                <p id="word-count">You have answered this word correctly {headWord.wordCorrectCount} times.</p>
                <p id="word-count">You have answered this word incorrectly {headWord.wordIncorrectCount} times.</p>
              
             </>   
        )
}
    
    renderResponse = () =>{
        let { headWord = {}, response = {}} = this.context;
        if(response.isCorrect === false ){
            return(
                <div className="incorrect">
                <p>Your total score is: {response.totalScore}</p>
                <h2>`Good try, but not quite right :(`</h2>
                <p>`The correct translation for ${headWord.nextWord} was ${response.answer} and you chose ${this.context.guess}!`</p>
                <Button onClick={this.handleNextWord}>Try Another Word</Button>
                    </div>
                
            )
        }else{
            return (
                <div className="correct">
                <p>Your total score is: {response.totalScore}</p>
                <h2>You were correct! :D</h2>
                <p>`The correct translation for ${headWord.nextWord} was ${response.answer} and you chose ${this.context.guess}!`</p>
                <Button onClick={this.handleNextWord}>Try another word!</Button>
                </div>

            )
        }
    }
    render(){
        let { headWord = {}} = this.context;
        
        console.log(this.context.guess)
       return (
        <section className="learning">
        <p>Your total score is: {headWord.totalScore}</p>
         <h2>Translate the word:</h2><span id="word">{headWord.nextWord}</span>
        {this.state.render ? this.renderForm() : this.renderResponse()}
         </section>
       )

    }
}
