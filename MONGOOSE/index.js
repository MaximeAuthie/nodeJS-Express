//? On importe Mongoose
const mongoose = require('mongoose');

//? On importe le model User
const User = require('../MONGOOSE/models/User');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/exemple-mongoose');
    console.log('Connexion ok');

    // const user1 = new User({
    //     email: 'jean@emeple.org',
    //     firstName: "Jean",
    //     lastName: "Dupont",
    //     age: 39
    // })

    // console.log(user1);

    // await user1.save();

    const user2 = await User.create({
        email: "alic@exemple.org",
        firstName: "Alice",
        age: 25
    })

    console.log(user2);

    mongoose.disconnect();
}

main();