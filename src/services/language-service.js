import TokenService from '../services/token-service'
import config from '../config'

const LanguageService = {

    async getLanguageAndWords(){
        const res = await fetch(`${config.API_ENDPOINT}/language`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
        });
        return await ((!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json());
    },
    async getHead(){
        
            const res = await fetch(`${config.API_ENDPOINT}/language/head`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
        });
        return await ((!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json());
        
    },
    async postGuess(guess) {
        const res = await fetch(`${config.API_ENDPOINT}/api/language/guess`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(guess),
        });
        return await ((!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json());
      },
}

export default LanguageService