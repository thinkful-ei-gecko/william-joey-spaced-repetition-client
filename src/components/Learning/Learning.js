import React from 'react';
import LanguageService from '../../services/language-service';
import LanguageContext from '../../contexts/LanguageContext';
import Button from '../../components/Button/Button';
import './Learning.css';

export default class Dashboard extends React.Component {
    static contextType = LanguageContext

    state = {
        render: true,
        isDisabled: false
      };
    buttonTimeout = e =>{
        e.preventDefault();
        this.setState({
            isDisabled: true
        });
        setTimeout(() => this.setState({isDisabled: false}), 3000)
    }
    
    
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
      LanguageService.postGuess(this.context.guess)
      .then(res => {
      this.context.setResponse(res);
      this.setState({render: false});
    })
     
    }
    handleNextWord = e =>{
        LanguageService.getHead()
        .then(headWord => {
            this.context.setHeadWord(headWord);
            this.setState({render: true});
            this.context.setGuess('');
        })
        .catch(res => {
            this.context.setError(res.error);
        })


    }
    renderForm = () => {
        const { headWord = {} } = this.context;
        
       
        return (
            <>
            <p id='total-score-form'>Your total score is: {headWord.totalScore}</p>
         <h2 id='translate-word'>Translate the word:</h2><span id="word">{headWord.nextWord}</span>
           
                <form className="guess-form" onSubmit={this.handleGuess}>
                    <label htmlFor="learn-guess-input">
                    What's the translation for this word?
                    </label>
                    <input name="learn-guess-input" id="learn-guess-input" type="text" required="required" 
                    value={this.context.guess}
                    onChange={e => this.context.setGuess(e.target.value)}></input>
                    <Button type="submit" 
                    id="submit-guess-button"
                    
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
        
            return(
                <div className="response">
                
                {response.isCorrect ? <h2 id="isCorrect">You were correct! :D</h2> : <h2 id="notCorrect">Good try, but not quite right :(</h2>}
                <div className='DisplayScore'>
                <p >Your total score is: {response.totalScore}</p>
                </div>
                <div className='DisplayFeedback'>
                <p id="guess-answer">The correct translation for <b>{headWord.nextWord}</b> was <b>{response.answer}</b> and you chose <b>{this.context.guess}</b>!</p>
                </div>
                <Button disabled={this.buttonTimeout} onClick={this.handleNextWord}>Try another word!</Button>
                    </div>
                
            )
        
        
    }
    render(){
        
        console.log(this.context.guess)
       return (
        <section className="learning">
        
        {this.state.render ? this.renderForm() : this.renderResponse()}
         </section>
       )

    }
}
