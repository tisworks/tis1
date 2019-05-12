var _contacts = null;

$(document).ready(function() {
    loadEventListeners();
    loadSavedData();
    //TODO: carregarDadosIniciais(); -- Iterar pelo objeto _contacts e ir montando o html com os cards cadastrados
});

class Contact {
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

function createContact() {
    name = document.getElementById("name").value;
    lastName = document.getElementById("lastName").value;
    email = document.getElementById("email").value;
    telephone = document.getElementById("telephone").value;
    //TODO Alterar de acordo com a implementacao final
    tags = "";
    //TODO Alterar de acordo com a implementacao final
    picture = "";
    isFavorite = $('#favorite').is(':checked');
    observations = document.getElementById("observations").value;
    //TODO Alterar de acordo com a implementacao final
    type = "";

    return new Contact(name, lastName, email, telephone, tags, picture, isFavorite, observations, type);
}

function saveContactLocalStorage(contact) {
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

function loadEventListeners() {

    $('#addContact').on('shown.bs.modal', function() {
        $('#addBtn').trigger('focus')
    });

    $('#confirmAdd').on('click', function() {
        var newContact = createContact();
        saveContactLocalStorage(newContact);
    });
}

//Carrega dados default caso não tenha nenhum dado salvo.
//Os dados default estão salvos num Json em: data/contacts.js
function loadSavedData() {
    if (!localStorage.contacts)
        _contacts = defaultData;
    else
        _contacts = JSON.parse(localStorage.contacts);
}