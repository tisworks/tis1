var _clients = null;

$(document).ready(function() {
    carregarEventListeners();
    carregarDadosSalvos();
    //TODO: carregarDadosIniciais(); -- Iterar pelo objeto _clients e ir montando o html com os cards cadastrados
});

class Client {
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

function createClient() {
    name = document.getElementById("clientName").value;
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

    return new Client(name, lastName, email, telephone, tags, picture, isFavorite, observations, type)
}

function saveClientLocalStorage(client) {
    var clientToSave = {
        'name': client.name,
        'lastName': client.lastName,
        'email': client.email,
        'telephone': client.telephone,
        'tags': client.tags,
        'picture': client.picture,
        'isFavorite': client.isFavorite,
        'observations': client.observations,
        'type': client.type
    }

    _clients.push(clientToSave);
    localStorage.setItem('clients', JSON.stringify(_clients));
};

function carregarEventListeners(){

    $('#addContact').on('shown.bs.modal', function () {
        $('#inputBtn').trigger('focus')
    });

    $('#confirmAdd').on('click', function(){
        var newClient = createClient();
        saveClientLocalStorage(newClient);
    });
}

//carrega dados default caso não tenha nenhum dado salvo. 
//Os dados default estão salvos num Json em: static/data/clientes.js
function carregarDadosSalvos(){
    if(!localStorage.clients)
        _clients = cadastroDefault;
    else
        _clients = JSON.parse(localStorage.clients);
}

