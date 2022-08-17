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

            let values = this.getValues(this.formEl);

            this.getPhoto((content)=>{
                values.photo = content;

                this.addLine(values);

            });

           
        })
    } //fim do escopo onSubmit onSU  

    //metodo com responsabilidade de carregar a foto
    getPhoto(callback) {
        //new FileReader = API para carregamento de foto, contendo metodos internos.
        let fileReader = new FileReader();

        let elements = [...this.formEl.elements].filter(item=>{
            if (item.name == "photo"){
                return item;
            }

            
        })

        let file = (elements[0].files[0]);

        fileReader.onload = () =>{

            callback(fileReader.result);

        }

        fileReader.readAsDataURL(file);

    }

    getValues(formEl) {

        let user = {};
        let isValid = true;

        [...formEl.elements].forEach(function(fields, index) {
            
            if(["name", "email", "password"].indexOf(fields.name) > -1 & !fields.value) {
                fields.classList.add("errorInput")
                isValid = false
            }

            if(fields.name == "gender") {
                if(fields.checked)
                user[fields.name] = fields.value;
            } else if (fields.name == "admCheck"){
                user[fields.name] = fields.checked;
            } else {
               user[fields.name] = fields.value;
            } 
            });

            if(!isValid) {
                return false;
            }

            return new User(
                user.name,
                user.gender,
                user.birth,
                user.country,
                user.email,
                user.admin,
                user.password,
                user.photo
                );

    }

    addLine(dataUser) {
        let tr = document.createElement("tr");

        this.tableEl.innerHTML = `
        <tr>
            <td><img src="${dataUser.photo}" alt="" width="30px"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.register}</td>
            <td>
                <button class="btn-edit">Editar</button>
                <button class="btn-del">Excluir</button>
         </tr>
         `;
        document.getElementById("table-users").appendChild(tr)
        console.log(dataUser)
    }


    showPanelCreate() {
        document.querySelector("#box-user-create").style = "display:block";
        document.querySelector("#box-user-update").style = "display:none";
    }

    showPanelUpdate() {
        document.querySelector("#box-user-create").style = "display:none";
        document.querySelector("#box-user-update").style = "display:block";
    }

    updateCount() {

        let numberUsers = 0;
        let numberAdmins = 0;

        [...this.tableEl.children].forEach(tr=>{

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if(user._admin) numberAdmins++;

        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmins;
    }

};
