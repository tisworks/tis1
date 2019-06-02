var _contacts = null;
var _tagMax = 4; //Numero máximo de tags permitidas em um contato (falta saber qual é o valor ideal)
var _currentContactId; //Variável global para faciltiar acesso ao contato sendo alterado em um momento específico

$(document).ready(function($) {
    loadData();
    loadEventListeners();
});

class Contact {
    constructor(contactId, name, lastName, email, telephone, tags, picture, isFavorite, observations, type) {
        this.contactId = contactId;
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
    contactId = _contacts.length + 1;   
    name = document.getElementById("name").value;
    lastName = document.getElementById("lastName").value;
    email = document.getElementById("email").value;
    telephone = document.getElementById("telephone").value;
    //TODO Alterar de acordo com a implementacao final
    tags = new Array();
    //TODO Alterar de acordo com a implementacao final
    picture = document.getElementById('profileImg').value;
    isFavorite = $('#favorite').is(':checked');
    observations = document.getElementById("observations").value;
    //TODO Alterar de acordo com a implementacao final
    type = "";

    return new Contact(contactId.toString(10), name, lastName, email, telephone, tags, picture, isFavorite, observations, type);
}

function saveContact() {
    contactToSave = createContact();

    if(!contactToSave.contactId || !contactToSave.name || !contactToSave.email || !contactToSave.telephone)
        return

    _contacts.push(contactToSave);
    localStorage.setItem('contacts', JSON.stringify(_contacts));
    insertContactCard(contactToSave);
};

function loadEventListeners() {

    $('#addContact').on('shown.bs.modal', function() {
        $('#addBtn').trigger('focus');
    });

    $('#confirmAdd').on('click', function() {
        saveContact();
        imageConverterEvent();
    });

    $('#confirmAddTag').on('click', function() {
        addTag();
    });

    $('.add-tag-modal').on('click', function() {
        _currentContactId = parseInt(this.id, 10)
    });

    imageConverterEvent();
    loadFieldMasks();
}

function loadData() {
    if (!localStorage.contacts)
        _contacts = defaultData;
    else
        _contacts = JSON.parse(localStorage.contacts);

    _contacts.forEach(contact => {
        insertContactCard(contact);
    });

}

function imageConverterEvent() {
    var element = document.getElementById("profileImgFile");
    element.addEventListener('change', loadimage, false);
}

function loadFieldMasks() {
    $('#telephone').mask('(99) 99999-9999');
}

function addTag() {
    var contactTags = _contacts[_currentContactId - 1].tags;

    if(contactTags.length == _tagMax)
        alert("Um contato não pode possuir mais do que "+_tagMax.toString(10)+" tags. remova alguma para inserir uma nova.");
    else {
        var tagName = document.getElementById("new-tag-name").value
        if(!tagName)
            return
            
        contactTags.push(tagName);
        localStorage.setItem('contacts', JSON.stringify(_contacts));
    }
}

//TODO 
//Realizar o upload de uma imagem real
//Alterar layout de acordo com isFavorite
//Inserir tags verdadeiras (provavel logica com loop para insercao das mesmas)
//Melhorar modulacao desse metodo
//Remover fake row do HTML
function insertContactCard(contact) {
    var contactTagsHtml = "";
    for(var i = 0; i<contact.tags.length; i++)
    {
        var tag = contact.tags[i];
        contactTagsHtml += '<div class="col-3"><span><h5>'+ tag + '</h5></span></div>';
    }

    $("#cardPlace").append(`
    <div id="cardPlace">
        <div class="d-none d-xl-block">
            <div class="row row-eq-height">
                <div class="col-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <img src="` + contact.picture + `" alt="Imagem do Contato">
                        </div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10">
                                    <h4 class="card-title">` + contact.name + " " + contact.lastName + `</h4>
                                </div>
                                <div class="col-1">
                                    <button type="button" class="btn btn-info ava-btn">
                                        <span class="sr-only">Favorito</span>
                                        <i class="material-icons">grade</i>
                                    </button>
                                </div>
                            </div>
                            <h5 class="card-text "><b>Tel:</b>` + contact.telephone + `</h5>
                            <h5 class="card-text "><b>Email:</b>` + contact.email + `</h5>
                            <div class="row tag-place">
                                `+ contactTagsHtml +`
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-3">
                                    <button type="button" id="`+ contact.contactId +`" class="btn ava-btn add-tag-modal" data-toggle="modal" data-target="#insertTagModal">Tag</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card d-xl-none">
    <button type="button" class="btn btn-info ava-btn">
        <span class="sr-only">Favorito</span>
        <i class="material-icons">grade</i>
    </button>
    <div class="text-center">
        <img class="card-img-top" src="` + contact.picture + `" alt="Imagem do Contato">
    </div>
    <div class="card-body">
        <h5 class="card-title">` + contact.name + " " + contact.lastName + `</h5>
        <h6 class="card-text "><b>Tel:</b>` + contact.telephone + `</h6>
        <h6 class="card-text "><b>Email:</b>` + contact.email + `</h6>
        <div class="row">
            <div class="col-4">
                <span><h6>Cliente</h6></span>
            </div>
            <div class="col-4">
                <span><h6>Tag1</h6></span>
            </div>
            <div class="col-4">
                <span><h6>Tag2</h6></span>
            </div>
        </div>
    </div>
    </div>
    `);
}

function loadimage(e1) {
    var filename = e1.target.files[0];
    var fr = new FileReader();
    fr.onload = imageHandler;
    fr.readAsDataURL(filename);
}

function imageHandler(e2) {
    var store = document.getElementById('profileImg');
    store.value = e2.target.result;

}