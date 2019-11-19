import React from 'react';
import LanguageService from '../../services/language-service';
import LanguageContext from '../../contexts/LanguageContext';
import Button from '../../components/Button/Button';

export default class Dashboard extends React.Component {
    static contextType = LanguageContext
    state ={
        correct: null,
    }
    
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

    handleSubmit = e =>{
        e.preventDefault()
        let guess = e.target['guess'].value
        LanguageService.postGuess(guess)
    }
    // guessResponse = () =>{
    //     const { words = [], language = {} } = this.context;
    //     if(this.state.correct === false ){
    //         return(
    //             <div className="incorrect">
    //             <p>Your total score is: {incorrectFixture.totalScore}</p>
    //             <h2>`Good try, but not quite right :(`</h2>
    //             <p>`The correct translation for ${languageHeadFixture.nextWord} was ${incorrectFixture.answer} and you chose ${guess}!`</p>
    //             <Button>Try Another Word</Button>
    //                 </div>
                
    //         )
    //     }else if(this.state.correct === true){
    //         return (
    //             <div className="correct">
    //             <p>Your total score is: {incorrectFixture.totalScore}</p>
    //             <h2>You were correct! :D</h2>
    //             <p>`The correct translation for ${languageHeadFixture.nextWord} was ${incorrectFixture.answer} and you chose ${guess}!`</p>
    //             <Button>Try another word!</Button>
    //             </div>

    //         )
    //     }else{
    //         return <></>
    //     }
    // }
    render() {
        const { words = [], language = {} } = this.context;
        
       
        return (
            <section>
                <h2>Translate the word: {words[0].original}</h2>
                <p>Your total score is: {language.total_score}</p>
                <form>
                    <label htmlFor="guess">
                    What's the translation for this word?
                    </label>
                    <input name="guess" id="guess" type="text" required="required"></input>
                    <Button type="submit" onClick={this.handleSubmit()}>Submit your answer</Button> 
                </form>
                <h4>You have answered this word correctly {words[0].correct_count} times</h4>
                <h4>You have answered this word incorrectly {words[0].incorrect_count} times</h4>
                {/* {this.guessResponse()} */}
            </section>
        )
}
}