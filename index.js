var nome = document.querySelector("#inputName").value = "bruno";
var gender = document.querySelector("#form-user-create [name=gender]:checked");
var country = document.querySelector("#inputBirth").value;
var birth = document.querySelector("#inputBirth").value;
var email = document.querySelector("#inputEmail").value;
var photo = document.querySelector("#inputPhoto")




console.log(nome);
console.log(gender)

document.querySelector(".btn-success").addEventListener('submit', event=>{
    event.preventDefault();
    alert("ola")
})

