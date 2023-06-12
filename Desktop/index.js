// Liste de données
// -- A SUPPRIMER
const liste = ["Élément 1", "Élément 2", "Élément 3"];

// Récupérer l'élément de conteneur de la liste
const listeContainer = document.getElementById("liste-container");

// Récupérer le formulaire et le champ de saisie
const form = document.getElementById("ajout-form");
const elementInput = document.getElementById("element-input");

// Récupérer le bouton pour afficher/disparaître le formulaire
const toggleFormButton = document.getElementById("toggle-form-button");

// Variable pour suivre l'index de l'élément en cours de modification
let indexModification = null;

// Générer les éléments de la liste et les ajouter au conteneur
async function afficherListe() {
    listeContainer.innerHTML = "";

    const response = await fetch("http://localhost:3000/pizzas");
    const items = await response.json();

    items.forEach((element, index) => {
        const li = document.createElement("li");

        const contenuDiv = document.createElement("div");
        contenuDiv.textContent = element.name;
        li.appendChild(contenuDiv);

        const boutonsDiv = document.createElement("div");

        const modifyButton = document.createElement("button");

        modifyButton.innerHTML = '<i class="fas fa-edit"></i>';
        modifyButton.classList.add("modify-button");
        modifyButton.addEventListener("click", () => {
            // Logique de modification de la ligne
            elementInput.value = element.name;
            indexModification = index;
        });
        boutonsDiv.appendChild(modifyButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            // Logique de suppression de la ligne
            liste.splice(index, 1); // Supprimer l'élément du tableau
            

            afficherListe(); // Mettre à jour l'affichage de la liste
        });
        boutonsDiv.appendChild(deleteButton);

        li.appendChild(boutonsDiv);

        listeContainer.appendChild(li);
    });
}

afficherListe(); // Afficher la liste initiale

// Gérer la soumission du formulaire pour ajouter/modifier un élément
const ajoutModifButton = document.getElementById("ajout-modif-button");
ajoutModifButton.addEventListener("click", () => {
    const nouvelElement = elementInput.value;

    if (indexModification !== null) {
        // Modifier l'élément existant
        liste[indexModification] = nouvelElement;
        indexModification = null; // Réinitialiser l'index de modification
    } else {
        // Ajouter un nouvel élément à la liste
        liste.push(nouvelElement);
    }

    elementInput.value = ""; // Effacer le champ de saisie
    afficherListe(); // Mettre à jour l'affichage de la liste
});