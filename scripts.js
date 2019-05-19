var _contacts = null;

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
    picture = document.getElementById('profileImg').value;
    isFavorite = $('#favorite').is(':checked');
    observations = document.getElementById("observations").value;
    //TODO Alterar de acordo com a implementacao final
    type = "";

    return new Contact(name, lastName, email, telephone, tags, picture, isFavorite, observations, type);
}

function saveContact() {
    contactToSave = createContact();
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

//TODO 
//Realizar o upload de uma imagem real
//Alterar layout de acordo com isFavorite
//Inserir tags verdadeiras (provavel logica com loop para insercao das mesmas)
//Melhorar modulacao desse metodo
//Remover fake row do HTML
function insertContactCard(contact) {
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
                            <div class="row">
                                <div class="col-3">
                                    <span><h5>Cliente</h5></span>
                                </div>
                                <div class="col-3">
                                    <span><h5>Tag1</h5></span>
                                </div>
                                <div class="col-3">
                                    <span><h5>Tag2</h5></span>
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
    </div>`);
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