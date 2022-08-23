class UserController {

    constructor(formIdCreate, formIdUpdate, tableId) {
        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);


        this.onsubmit();
        this.onEdit();
        this.selectAll();

    }

    onEdit(){
        let btn = document.querySelector("#box-user-update .btn-cancel");
        btn.addEventListener("click", event=>{
            event.preventDefault();

            this.showPanelCreate();
        });

        this.formUpdateEl.addEventListener("submit", event=>{
            event.preventDefault();

            var btn = this.formUpdateEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values);




            this.getPhoto(this.formUpdateEl).then(
                content=>{
                    
                    if(!values._photo) {
                        result._photo = userOld._photo;
                    }else {
                        result._photo = content;
                    }

                    let user = new User();

                    user.loadFromJSON(result)

                    user.save();

                    this.getTr(user, tr);
        
                    this.updateCount();

                    this.formUpdateEl.reset();

                    this.showPanelCreate();
    
                    btn.disabled = false;
                },(e=>{
                    console.error(e)
                })
                );

        })
       
    }


    

    //método botao submit 
    onsubmit() {
        
        this.formEl.addEventListener("submit", event=>{
            event.preventDefault();

            var btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formEl);

            if(!values){
                return false;
            }

            this.getPhoto(this.formEl).then(
            content=>{
                
                values.photo = content;

                values.save();

                this.addLine(values);

                this.formEl.reset();

                btn.disabled = false;
            },(e=>{
                console.error(e)
            })
            );
           
        })
    } //fim do escopo onSubmit onSU  

    //metodo com responsabilidade de carregar a foto
    getPhoto(formEl) {

    return new Promise ((resolve, reject)=> {
        
        //new FileReader = API para carregamento de foto, contendo metodos internos.
        let fileReader = new FileReader();

        let elements = [...formEl.elements].filter(item=>{
            if (item.name == "photo"){
                return item;
            }

        })

        let file = (elements[0].files[0]);

        fileReader.onload = () =>{

            resolve(fileReader.result);

        }

        fileReader.onerror = (e)=>{
          reject(e)
        }

        if(file){
            fileReader.readAsDataURL(file)
        } else {
            resolve("dist/img/avatar.png");
        }

    })
        

    }

    

    getValues(formEl) {

        let user = {};
        let isValid = true;

        [...formEl.elements].forEach(function(fields, index) {
            
            if(["name", "email", "password"].indexOf(fields.name) > -1 & !fields.value) {
                fields.classList.add("errorInput")
                isValid = false
            }

            if(fields.name == "gender"){
                if(fields.checked)
                user[fields.name] = fields.value;
            } else if (fields.name == "admin"){
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


    selectAll() {

        let users = User.getUsersStorage();

        users.forEach(dataUser=>{

            let user = new User();

            user.loadFromJSON(dataUser);

            this.addLine(user);


        })
       
    }

    addLine(dataUser) {

        let tr = this.getTr(dataUser);

        this.tableEl.appendChild(tr);

        this.updateCount();


    }

    getTr(dataUser, tr = null) {

        if(tr === null) tr = document.createElement("tr");

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
        <tr>
            <td><img src="${dataUser.photo}" alt="" width="30px"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin ? "Sim" : "Não"}</td>
            <td>${dataUser.register}</td>
            <td>
                <button type="button" class="btn-edit">Editar</button>
                <button type="button" class="btn-del">Excluir</button>
         </tr>
         `;

         this.addEventsTr(tr);

         return tr;
    }

    addEventsTr(tr){

        tr.querySelector(".btn-del").addEventListener("click", event=>{

            if(confirm("Deseja realmente excluir ?")){

                let user = new User();

                user.loadFromJSON(JSON.parse(tr.dataset.user));

                user.remove()

                tr.remove();
               
            }

            this.updateCount();

        })


        tr.querySelector(".btn-edit").addEventListener("click", e=>{

            let json = JSON.parse(tr.dataset.user);
            //index da minha linha, começando do zero 
            //com a propriedade sectionRowIndex;
            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;
            
            for(let name in json) {

                let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "]");

                if(field) {

                    switch(field.type) {
                        case 'file':
                        continue;
                        break;

                        case 'radio':
                          field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value="+json[name] + "]");
                          field.checked = true;
                          break;

                          case 'checkbox':
                            field.checked = json[name];
                          break;

                          default:
                          
                            field.value = json[name];
                          
                    }
                
                }

            }
            //para o formUpdateEl carregar a foto da tr, que disparada o botao edit
            this.formUpdateEl.querySelector(".photo").src = json._photo;

            this.showPanelUpdate();

        })
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

        document.querySelector("#numberUsers").innerHTML = numberUsers;
        document.querySelector("#numberAdmins").innerHTML = numberAdmins;
    }

};
