//? On importe Mongoose
const mongoose = require('mongoose');

//? On importe le model User
const User = require('../MONGOOSE/models/User');

//? On importe le model Post
const Post = require('../MONGOOSE/models/Post');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/exemple-mongoose');
    console.log('Connexion ok');

    //! CREER DES DOCUMENTS

    // const user1 = new User({
    //     email: 'jean@emeple.org',
    //     firstName: "Jean",
    //     lastName: "Dupont",
    //     age: 39
    // })

    // console.log(user1);

    // await user1.save();

    // const user2 = await User.create({
    //     email: "alic@exemple.org",
    //     firstName: "Alice",
    //     age: 25
    // });

    // console.log(user2);

    //! RECUPERER DES DOCUMENTS

    // const users = await User.find();
    // console.log(users);

    // const jean = await User.findById("653e9d429850d89ceb76b925");
    // console.log(jean);

    // const alice = await User.find({
    //     firstName: "Alice",
    //     age: {$gte: 25}
    // });
    // console.log(alice);

    // const filtres = await User
    //     .find({
    //         age: {$gt: 18},
    //         $or: [
    //             {firstName: "Jean"},
    //             {age: { $lt:30}}
    //         ],
    //     })
    //     .select('firstName email -_id')
    //     .sort({firstName: "asc"});

    // console.log("filtre : " + filtres);

    //! METTRE A JOUR DES DOCUMENTS

    // const aliceUpdate = await User.findById("653ea0aec8fcba519c7947a1");
    // console.log("Alice Update : " + aliceUpdate);

    // aliceUpdate.lastName = "Dubois";
    // // console.log(aliceUpdate);

    // await aliceUpdate.save();
    // // console.log(aliceUpdate);

    // const jeanUpadate = await User.findByIdAndUpdate('653e9d429850d89ceb76b925', { lastName: 'Dupond'}, {new: true});

    // console.log("jeanUpdate :" + jeanUpadate);


    // const res = await User.updateMany({age: {$gte:18}}, {lastName:"Test"});
    // console.log(res);

    //! SUPPRIMER UN DOCUMENT

    // const aliceDelete = await User.findOne({email: "alic@exemple.org"});
    // console.log("Alice Update : " + aliceDelete);

    // const res = await aliceDelete.deleteOne();
    // console.log("Res :" + res);

    // const res = await User.findByIdAndDelete("65427d4406f441c3474d678c");
    // console.log(res);

    // const result = await User.deleteMany({age: {$lt:100}});
    // console.log(result);


    //! CREER DES LIENS ENTRE LES COLLECTIONS

    // //? Récupérer les utilisateurs
    // const jean = await User.findOne({ firstName: "Jean" });
    const alice = await User.findOne({ firstName: "Alice" });
    // console.log(jean, alice);

    // //? Créer les articles (posts)
    // await Post.create({
    //     title: "Nouvelle version de Node.js",
    //     content: "...",
    //     status: "Publié",
    //     author: jean._id // ici, on passe l'ID de jean dans la propriété author
    // });

    // await Post.create({
    //     title: "Créer un formulaire en HTML",
    //     content: "...",
    //     status: "Brouillon",
    //     author: alice._id
    // });
    
    // const posts = await Post.find().populate('author');
    // console.log(posts);


    //! GERER LES TIMESTAMPS

    // await Post.create({
    //     title: "Débuter en CSS",
    //     content: "...",
    //     status: "Brouillon",
    //     author: alice._id
    // });

    await Post.updateMany({}, {content: "vide"});
    
    //! DECONNECTER LA BDD


    mongoose.disconnect();
}

main();