/* 
 * Met en forme dans la vue les données reçues
 * Certaines fonctions sont appellées au succès des requêtes ajax. Les appels
 * sont effectués dans le fichier consulting_requests.
 */

// BOOKS
var table = null;
/**
 * Fabrique le rendu ( <table> ) 
 * et l'insère dans la zone prévue ( <div id="content"> )
 * L'algorithme est découpé en trois parties.
 * @param {type} books
 */
function createTableBooks(books) {
    // Préparation de la balise table
    table = document.createElement("table");
    $(CONTENT).empty();
    $(CONTENT).append(table);
    // Construction du tableau, l'entête puis le contenu
    $(table).append(getHeaderLineForTableBook());
    generateContentForTableBook(books);
    $(table).addClass("col-xs-10 col-xs-offset-1 books");
}

/**
 * Pour chaque livre de la liste, la fonction va créer une ligne et l'affecter
 * à la table
 * @param {type} books liste des livres reçus va la requête ajax
 */
function generateContentForTableBook(books) {
    $.each(books, function () {
        $(table).append(getLineForTableBook(this));
    });
}
/**
 * Retourne une ligne correspondant à une livre
 * Cette ligne est clickable et génère un appel de fonction
 * Prend en paramètre un objet de type book
 * @param {type} book
 */
function getLineForTableBook(book) {

    var line = document.createElement("tr");
    var idBook = document.createElement("td");
    var titleBook = document.createElement("td");
    var authorSurname = document.createElement("td");
    //affectation des cellules dans la ligne + mise en place du texte à afficher
    $(line).append($(idBook).text(book.id));
    $(line).append($(titleBook).text(book.title));
    $(line).append($(authorSurname).text(book.author.firstname + " " + book.author.surname));
    $(line).click(function () {
        getBookCopies(book.id);
        $currentBook = book;
    });
    return line;
}
/**
 * Création de la ligne d'en-tête de notre table.
 * Elle retourne la ligne afin qu'elle y soit insérée.
 */
function getHeaderLineForTableBook() {
    // création des balises
    var line = document.createElement("tr");
    var idBook = document.createElement("th");
    var titleBook = document.createElement("th");
    var authorSurname = document.createElement("th");
    //affectation des textes + affectation des classes
    $(idBook).text("ID").addClass("col-xs-1");
    $(titleBook).text("Title").addClass("col-xs-8");
    $(authorSurname).text("Author").addClass("col-xs-3");
    //insertion des th dans la ligne
    $(line).append(idBook);
    $(line).append(titleBook);
    $(line).append(authorSurname);

    return line;
}

/**
 * Fabrique la table contenant la liste des copies des exemplaires du livre
 * que l'on a requêté.
 * @param {type} copies
 * @returns {undefined}
 */
function createTableCopies(copies) {
    if (listOfStates === null) {
        getStates();
    }
    if (listOfStatus === null) {
        getStatus();
    }
    table = document.createElement("table");
    $(CONTENT).empty();
    $(CONTENT).append(table);
    $(table).append(getHeaderLineForTableCopies());
    $(table).append(getEmptyLineForTableCopies(copies[0].book));
    getContentForTableCopies(copies);
    $(table).addClass("col-xs-10 col-xs-offset-1 books");
}

function getContentForTableCopies(copies) {
    $.each(copies, function () {
        $(table).append(getLineForTableCopy(this));
    });
}

function getSelect(list, selectedId) {
    var select = document.createElement("select");
    $.each(list, function () {
        var opt = document.createElement("option");
        $(opt).val(this.id).text(this.name);
        if (selectedId !== null) {
            if (this.id === selectedId) {
                $(opt).attr("selected", "selected");
            }
        }
        $(select).append(opt);
    });
    $(select).change(function () {

    });
    return select;
}

function getLineForTableCopy(copy) {
    var line = document.createElement("tr");
    var idCopy = document.createElement("td");
    var stateCopy = document.createElement("td");
    var statusCopy = document.createElement("td");
    var priceCopy = document.createElement("td");
    var ctrlCopy = document.createElement("td");

    $(idCopy).text(copy.id);
    $(line).append(idCopy);

    //creation balise select avec les options dedans
    var selectState = getSelect(listOfStates, copy.state.id);
    $(selectState).change(function () {
        updateStateOfCopy(copy.id, $(this).val());
    });
    $(stateCopy).append(selectState);
    $(line).append(stateCopy);

    var selectStatus = getSelect(listOfStatus, copy.status.id);
    $(selectStatus).change(function () {
        updateStatusOfCopy(copy.id, $(this).val());
    });
    $(statusCopy).append(selectStatus);
    $(line).append(statusCopy);

    var inputNb = document.createElement("input");
    $(inputNb).attr({
        type: "decimal"
    }).val(copy.price);
    $(inputNb).change(function () {
        updatePriceOfCopy(copy.id, $(this).val());
    });
    $(priceCopy).append(inputNb);
    $(line).append(priceCopy);

    $(ctrlCopy).text("");
    $(line).append(ctrlCopy);

    return line;
}

function getEmptyLineForTableCopies() {
    var line = document.createElement("tr");
    var idCopy = document.createElement("td");
    var stateCopy = document.createElement("td");
    var statusCopy = document.createElement("td");
    var priceCopy = document.createElement("td");
    var ctrlCopy = document.createElement("td");

    $(idCopy).text("");
    $(line).append(idCopy);

    //creation balise select avec les options dedans
    var selectState = getSelect(listOfStates, null);
    $(stateCopy).append(selectState);
    $(line).append(stateCopy);

    var selectStatus = getSelect(listOfStatus, null);
    $(statusCopy).append(selectStatus);
    $(line).append(statusCopy);

    var inputNb = document.createElement("input");
    $(inputNb).attr({
        "type": "decimal"
    }).val(0);
    $(priceCopy).append(inputNb);
    $(line).append(priceCopy);

    var button = document.createElement("button");
    $(button).click(function () {
        var copy = {
            "state": $(selectState).val(),
            "status": $(selectStatus).val(),
            "price": $(inputNb).val()
        };
        addCopy(copy);
    });
    $(ctrlCopy).append($(button).text("Ajouter"));
    $(line).append(ctrlCopy);

    return line;
}

function getHeaderLineForTableCopies() {
    var line = document.createElement("tr");
    var idCopy = document.createElement("th");
    var stateCopy = document.createElement("th");
    var statusCopy = document.createElement("th");
    var priceCopy = document.createElement("th");
    var ctrlCopy = document.createElement("th");

    $(idCopy).text("ID").addClass("col-xs-1");
    $(line).append(idCopy);
    $(stateCopy).text("State").addClass("col-xs-3");
    $(line).append(stateCopy);
    $(statusCopy).text("Status").addClass("col-xs-3");
    $(line).append(statusCopy);
    $(priceCopy).text("Price").addClass("col-xs-3");
    $(line).append(priceCopy);
    $(ctrlCopy).text("").addClass("col-xs-2");
    $(line).append(ctrlCopy);

    return line;
}