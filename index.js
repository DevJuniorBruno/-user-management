var nome = document.querySelector("#inputName").value = "bruno";
var gender = document.querySelector("#form-user-create [name=gender]:checked");
var country = document.querySelector("#inputBirth").value;
var birth = document.querySelector("#inputBirth").value;
var email = document.querySelector("#inputEmail").value;
var password = document.querySelector("#inputPassword").value
var photo = document.querySelector("#inputPhoto").value;
var adm = document.querySelector("#inputAdm").value



var fields = document.querySelectorAll("#form-user-create [name]" );

fields.forEach(function(field, index) {

    if(field.name == "gender") {
        if(field.checked)console.log("Sim", field)
        
    } else if (field.name == "admCheck"){
        console.log("sim", field)
    } else {
        console.log("Não")
    }
})