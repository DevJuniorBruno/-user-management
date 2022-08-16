class UserController{

    constructor() {
        this.addEventsBtn();
    }

    addEventsBtn() {
        let nome = document.getElementById("inputName").value;
        document.querySelector('btn-success').addEventListener('submit', event=>{
            event.preventDefault();
            console.log(nome);
        })
    }

}