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
    //TODO change according with the final implementation
    isFavorite = ""
    observations = document.getElementById("observations").value;
    //TODO change according with the final implementation
    type = "";

    return new Client(name, lastName, email, telephone, tags, picture, isFavorite, observations, type)
}