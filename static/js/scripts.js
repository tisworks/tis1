var _contacts = null;

$(document).ready(function() {
    carregarEventListeners();
    carregarDadosSalvos();
    //TODO: carregarDadosIniciais(); -- Iterar pelo objeto _contacts e ir montando o html com os cards cadastrados
});

class contact {
    constructor(name, lastName, email, telephone, tags, picture, isFavorite, observations, type) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.telephone = telephone;
        this.tags = tags;
        this.picture = picture;
        this.isFavorite = isFavorite;
        this.observations = observations;
        this.type = type;    
    }
}

function createcontact() {
    name = document.getElementById("name").value;
    lastName = document.getElementById("lastName").value;
    email = document.getElementById("email").value;
    telephone = document.getElementById("telephone").value;
    //TODO change according with the final implementation
    tags = ""
    //TODO change according with the final implementation
    picture = ""
    isFavorite = $('#favorite').is(':checked');
    observations = document.getElementById("observations").value;
    //TODO change according with the final implementation
    type = "";

    return new contact(name, lastName, email, telephone, tags, picture, isFavorite, observations, type)
}

function savecontactLocalStorage(contact) {
    var contactToSave = {
        'name': contact.name,
        'lastName': contact.lastName,
        'email': contact.email,
        'telephone': contact.telephone,
        'tags': contact.tags,
        'picture': contact.picture,
        'isFavorite': contact.isFavorite,
        'observations': contact.observations,
        'type': contact.type
    }

    _contacts.push(contactToSave);
    localStorage.setItem('contacts', JSON.stringify(_contacts));
    alert("Contato salvo com sucesso");
};

function carregarEventListeners(){

    $('#addContact').on('shown.bs.modal', function () {
        $('#inputBtn').trigger('focus')
    });

    $('#confirmAdd').on('click', function(){
        var newcontact = createcontact();
        savecontactLocalStorage(newcontact);
    });
}

//carrega dados default caso não tenha nenhum dado salvo. 
//Os dados default estão salvos num Json em: static/data/contactes.js
function carregarDadosSalvos(){
    if(!localStorage.contacts)
        _contacts = cadastroDefault;
    else
        _contacts = JSON.parse(localStorage.contacts);
}