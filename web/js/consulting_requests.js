/**
 * Requête ajax de type GET
 */

function getBooks() {
    $.ajax({
        url: URL + "consulting/books",
        async: true,
        type: "GET",
        datatype: "json",
        success: function (datas) {
            createTableBooks(datas);
        },
        error: function () {
            alert("Problème");  
        }
    });
}

/**
 * Emet une requète ajax afin de récupérer tous les exmemplaires du bouquin dont
 * l'id est passée en paramètre.
 * @param {type} id
 * @returns {undefined}
 */
function getBookCopies(id) {
    $.ajax({
        url: URL + "consulting/books/" + id + "/copies",
        async: true,
        type: "GET",
        datatype: "json",
        success: function(copies) {
            createTableCopies(copies);
        },
        error: function () {
            alert("pas ok");
        }
    });
}

function getStates() {
        $.ajax({
        url: URL + "consulting/states",
        async: false,
        type: "GET",
        datatype: "json",
        success: function(states) {
            listOfStates = states;
        },
        error: function () {
            alert("pas ok");
        }
    });
}

function getStatus() {
        $.ajax({
        url: URL + "consulting/status",
        async: false,
        type: "GET",
        datatype: "json",
        success: function(status) {
            listOfStatus = status;
        },
        error: function () {
            alert("pas ok");
        }
    });
}

function updateStateOfCopy(id, value) {
        $.ajax({
        url: URL + "administration/copies/"+id+"/state",
        async: true,
        type: "PUT",
        datatype: "json",
        data: {"stateId" : value},
        success: function(copy) {

        },
        error: function () {
            alert("pas ok");
        }
    });
}

function updateStatusOfCopy(id, value) {
        $.ajax({
        url: URL + "administration/copies/"+id+"/status",
        async: true,
        type: "PUT",
        datatype: "json",
        data: {"statusId" : value},
        success: function(copy) {

        },
        error: function () {
            alert("pas ok");
        }
    });
}

function updatePriceOfCopy(id,value) {
    $.ajax({
        url: URL + "administration/copies/"+id+"/price",
        async: true,
        type: "PUT",
        datatype: "json",
        data: {"price" : value},
        success: function(copy) {
            
        },
        error: function(){
            alert("erreur");
        }
    });
}

function addCopy(copy) {
    $.ajax({
        url: URL + "administration/books/" + currentBook.id + "/copy",
        async: true,
        type: "POST",
        datatype: "json",
        data: copy,
        success: function(c) {
            $(table).append(getLineForTableCopy(c))
        },
        error: function(){
            alert("erreur");
        }
    });
}
