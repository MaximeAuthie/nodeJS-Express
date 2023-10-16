class Voiture {
    constructor(marque, annee = new Date().getFullYear(), kilometrage = 0) {
        this.marque         = marque;
        this.annee          = annee;
        this.kilometrage    = kilometrage;
    }

    afficherInfos() {
        console.log("=== Informations ===");
        console.log(`> Marque : ${this.marque}`);
        console.log(`> Année  : ${this.annee}`);
        console.log(`> KM     : ${this.kilometrage}`);
    }
}

const v1 = new Voiture("Peugeot");

console.log(v1);
v1.afficherInfos();

const v2 = new Voiture("Citroën", 1990, 250000);
console.log(v2);
v2.afficherInfos();

v2.marque = "Ford";
v2.afficherInfos();