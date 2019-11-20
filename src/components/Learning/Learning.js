import React from 'react';
import LanguageService from '../../services/language-service';
import LanguageContext from '../../contexts/LanguageContext';
import Button from '../../components/Button/Button';
import './Learning.css';

export default class Dashboard extends React.Component {
    static contextType = LanguageContext
    
    
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
      LanguageService.postGuess(this.context.guess).then(res => {
      this.context.setResponse(res);
      this.context.setRenderForm(false);
    });
    }
    handleNextWord = e =>{
        LanguageService.getHead()
        .then(headWord => {
            this.context.setHeadWord(headWord);
            this.context.setRender=Form(true);
        })
        .catch(res => {
            this.context.setError(res.error);
        })


    }
    

    handleSubmit = e =>{
        e.preventDefault()
        let guess = e.target['learn-guess-input'].value
        LanguageService.postGuess(guess)
    }
    renderForm = () => {
        const { headWord = {} } = this.context;
        
       
        return (
            <>
           
                <form className="guess-form">
                    <label htmlFor="learn-guess-input">
                    What's the translation for this word?
                    </label>
                    <input name="learn-guess-input" id="learn-guess-input" type="text" required="required"></input>
                    <Button type="submit" id="submit-guess-button"onClick={this.handleSubmit}>Submit your answer</Button> 
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
        let { headWord = {}, setRenderForm = null} = this.context;
       return (
        <section className="learning">
        <p>Your total score is: {headWord.totalScore}</p>
         <h2>Translate the word:</h2><span id="word">{headWord.nextWord}</span>
        {setRenderForm ? this.renderForm() : this.renderResponse()}
         </section>
       )

    }
}
