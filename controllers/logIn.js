import { getCountries } from "../Helpers/Utils.js"
import { fetchPage } from "../Helpers/Utils.js"
import { User } from "../Model/User.js"
import { settingsUSer } from "./settingsUser.js"
export function logIn() {
    let paises = document.getElementById("pais")
    let boton = document.getElementById("inicio")
    
  


    getCountries(paises)
    boton.addEventListener("submit", async (e) => {
        e.preventDefault()
        const user = new User()
        user.setNick_name(document.getElementById("nickname").value)
        user.setCountry_code(paises.options[0].value)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("size", document.getElementById("size").value)
        localStorage.setItem("zoneBattle",document.getElementById("ubicacion").value)
        container.innerHTML =    ""
        settingsUSer()
    })

}