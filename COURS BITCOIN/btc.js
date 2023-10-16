const axios = require('axios');

async function main() {

    try {
        //? Instancier la constante "currency" avec une condition ternaire
        const currency = process.argv[2] ? process.argv[2].toUpperCase() : "USD";

        //? On créé une constante data qui, grace à la destructuration d'objet, nous permet de précupérer uniquement le sous-objet "data" de la réponse
        const { data } = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        
        //? Créer une nouvelle erreur si la devise est inconnue
        if (!data.bpi[currency]) {
            throw new Error('Devise inconnue');
        }

        const rate = data.bpi[currency].rate;
        const updatedAt = data.time.updated;
        console.log(`> Un BTC = ${rate} ${currency} (${updatedAt})`);
    
    //? Intercepter l'erreur créée ou n'importe quelle autre erreu
    } catch (error) {
        console.log(error.toString());
    }   
}
        

main();