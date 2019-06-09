// Entidade
class Contact {
    constructor(id, name, lastName, email, telephone, tags, picture, isFavorite, observations, type) {
        this.id = id;
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

// Globais
let _contacts = null; // Contatos carregados na memoria
let  _tagMax = 4; // Numero máximo de tags permitidas em um contato
let _currentContactId; // Facilita o acesso ao contato

// Inicializa a aplicacao
$(document).ready(function ($) {
    loadData();
    loadEventListeners();
});



// Encontra o contato pelo id passado
function findContact(contactId) {
    return _contacts.find( (e) => {
        return e.id == contactId;
    });
}

// Atualiza o contato passado na memoria e no local storage
function updateContact(contact) {
    for(let i=0; i<_contacts.length; i++) {
        if(_contacts[i].id == contact.id) {
            _contacts[i] = contact;
        }
    }

    localStorage.setItem('contacts', JSON.stringify(_contacts));
}



// Funcao do botao de remover tag
function removeTagModalTrigger(contactId) {
    _currentContactId = contactId;
    let contact = findContact(contactId);

    let toBeInserted = "";
    for(let i=1; i<contact.tags.length; i++) {
        toBeInserted +=
            `<div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="${contact.tags[i]}" 
                value="${contact.tags[i]}" name="removeTagsCheck">
            <label class="custom-control-label" for="${contact.tags[i]}">${contact.tags[i]}</label>
         </div>`;

        if(i != contact.tags.length-1) {
            toBeInserted += `<br>`;
        }
    }

    $('#removeTagBoxes').html(toBeInserted);
    $('#removeTagModal').modal('show');
}

// Acao realizada ao remover as tags
function removeTagAction() {
    let contact = findContact(_currentContactId);

    $.each($("input[name='removeTagsCheck']:checked"), function(){
        for( let i = 0; i < contact.tags.length; i++){
            if ( contact.tags[i] === $(this).val()) {
                contact.tags.splice(i, 1);
            }
        }
    });

    updateContact(contact);
    location.reload();
}


function createContact() {
    let contactId = _contacts.length + 1;
    let name = document.getElementById("name").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let telephone = document.getElementById("telephone").value;

    let tags = new Array();
    if(document.getElementsByName("options")[0].checked == true){
        tags.push("Colaborador");
    } else {
        tags.push("Cliente");
    }

    let picture = document.getElementById('profileImg').value;
    let isFavorite = $('#favorite').is(':checked');
    let observations = document.getElementById("observations").value;

    return new Contact(contactId.toString(10), name, lastName, email, telephone, tags, picture, isFavorite, observations, type);
}

function saveContact() {
    contactToSave = createContact();

    if (!contactToSave.id || !contactToSave.name || !contactToSave.email || !contactToSave.telephone)
        return

    _contacts.push(contactToSave);
    localStorage.setItem('contacts', JSON.stringify(_contacts));
    insertContactCard(contactToSave);
};

function loadEventListeners() {

    $('#addContact').on('shown.bs.modal', function () {
        $('#addBtn').trigger('focus');
    });

    $('#confirmAdd').on('click', function () {
        saveContact();
        imageConverterEvent();
    });

    $('.add-tag-modal').on('click', function () {
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

    if (contactTags.length == _tagMax)
        alert("Um contato não pode possuir mais do que " + _tagMax.toString(10) + " tags. remova alguma para inserir uma nova.");
    else {
        var tagName = document.getElementById("new-tag-name").value
        if (!tagName)
            return

        contactTags.push(tagName);
        localStorage.setItem('contacts', JSON.stringify(_contacts));
    }

    location.reload();
}

// TODO remove contract ID from button
function insertContactCard(contact) {
    let contactTagsHtml = "";

    contact.tags.forEach((tag) => {
        contactTagsHtml += `<div class="col-3"><span><h5>${tag}</h5></span></div>`;
    })

    $("#cardPlace").append(`
        <br>

        <!-- Telas Maiores -->
        <div class="d-none d-xl-block">
            <div class="row row-eq-height">
                <div class="col-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <img src="${contact.picture}" alt="Imagem do Contato">
                        </div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10">
                                    <h4 class="card-title">${contact.name} ${contact.lastName}</h4>
                                </div>
                                <div class="col-1">
                                    <button type="button" class="btn btn-info ava-btn">
                                        <span class="sr-only">Favorito</span>
                                        <i class="material-icons">grade</i>
                                    </button>
                                </div>
                            </div>
                            <h5 class="card-text "><b>Tel:</b>${contact.telephone}</h5>
                            <h5 class="card-text "><b>Email:</b>${contact.email}</h5>
                            <div class="row tag-place">${contactTagsHtml}</div>
                            <br>
                            <div class="row">
                                <div class="col-3">
                                    <button type="button"  id="${contact.id}" class="btn ava-btn add-tag-modal" 
                                    data-toggle="modal" data-target="#insertTagModal">
                                        <span class="sr-only">Adicionar Tag</span>
                                        <i class="material-icons">add</i>
                                    </button>
                                    
                                    <button type="button" class="btn ava-btn" 
                                    onclick="removeTagModalTrigger(${contact.id})">
                                        <span class="sr-only">Deletar Tag</span>
                                        <i class="material-icons">delete</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Telas Menores -->
        <div class="card d-xl-none">
        <button type="button" class="btn btn-info ava-btn">
            <span class="sr-only">Favorito</span>
            <i class="material-icons">grade</i>
        </button>
        <div class="text-center">
            <img class="card-img-top" src="\` + contact.picture + \`" alt="Imagem do Contato">
        </div>
        <div class="card-body">
            <h5 class="card-title">\` + contact.name + " " + contact.lastName + \`</h5>
            <h6 class="card-text "><b>Tel:</b>\` + contact.telephone + \`</h6>
            <h6 class="card-text "><b>Email:</b>\` + contact.email + \`</h6>
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