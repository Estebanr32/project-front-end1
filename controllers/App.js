import { fetchPage } from "../Helpers/Utils.js"
import { logIn } from "./logIn.js"
export  class App{
    static async main(){
        const container=document.getElementById("container")
        await fetchPage("../views/logIn.html",container)
        logIn()
    } 
}
App.main()