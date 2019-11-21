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
    postGuess: async (guess) => {
        const res = await fetch(`${config.API_ENDPOINT}/language/guess`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({guess})
        });
        console.log(res);
        if (!res.ok) {
            return res.json().then(err => Promise.reject(err));
        }
        else {
            return res.json();
        }
      }
    
    }

export default LanguageService