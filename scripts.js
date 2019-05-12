var _contacts = {
    list: null
};

$(document).ready(function($) {
    loadEventListeners();
    loadData();
    //TODO: listSavedContacts(); -- Iterar pelo objeto _contacts e ir montando o html com os cards cadastrados
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

function saveContact() {
    contactToSave = createContact();
    _contacts.list.push(contactToSave);
    localStorage.setItem('contacts', JSON.stringify(_contacts.list));
    insertContactCard(contactToSave);
};

function loadEventListeners() {

    $('#addContact').on('shown.bs.modal', function() {
        $('#addBtn').trigger('focus');
    });

    $('#confirmAdd').on('click', function() {
        saveContact();
    });

    loadFieldMasks();
}

function loadData() {
    if (!localStorage.contacts)
        _contacts.list = defaultData;
    else
        _contacts.list = JSON.parse(localStorage.contacts);

    _contacts.list.forEach(contact => {
        insertContactCard(contact);
    });

}

function loadFieldMasks() {
    $('#telephone').mask('(99) 99999-9999');
}

function insertContactCard(contact) {
    $("#cardPlace").append(
        `<div class="row"><div class="col-12"><div class="card"> 
            <div class="card-body">
                <h5 class="card-title">` + contact.name + `</h5>
                <p class="card-text">LastName: ` + contact.lastName + `</p>
                <p class="card-text">Email: ` + contact.email + `</p>
                <p class="card-text">Telephone: ` + contact.telephone + `</p>
                <p class="card-text">observations: ` + contact.observations + `</p>
            </div>
        </div></div></div>`);
}