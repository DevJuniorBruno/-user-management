class UserController {

    constructor(formIdCreate, tableId) {
        this.formEl = document.getElementById(formIdCreate);
        this.tableEl = document.getElementById(tableId);



        this.onsubmit();
        
    }

    //método botao submit 
    onsubmit() {
        

        this.formEl.addEventListener("submit", event=>{
            event.preventDefault();

            var btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            this.getValues(this.formEl);
           
        })
    } //fim do escopo onSubmit onSU  

    getValues(formEl) {

        let user = {};
        let isValid = true;

        [...formEl.elements].forEach(function(fields, index) {
            
            if(["name", "email", "password"].indexOf(fields.name) > -1 & !fields.value) {
                fields.classList.add("errorInput")
            }

            if(fields.name == "gender") {
                if(fields.checked)
                user[fields.name] = fields.value;
            } else if (fields.name == "admCheck"){
                user[fields.name] = fields.checked;
            } else {
               user[fields.name] = fields.value;
            } 
            })
            
            this.addLine(user);
            
    }

    addLine(dataUser) {
        let tr = document.createElement("tr");

        tr.innerHTML = `
        <tr>
            <td><img src="${dataUser.photo}" alt="" width="30px"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin ? "SIM" : "NÃO"}</td>
            <td>${dataUser.register}</td>
            <td>
                <button class="btn-edit">Editar</button>
                <button class="btn-del">Excluir</button>
         </tr>
         `;
        document.getElementById("table-users").appendChild(tr)
        console.log(dataUser)
    }

};
