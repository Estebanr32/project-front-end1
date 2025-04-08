import { createShipsMachines } from "./settingsMachine.js";
import { createMap } from "./createMap.js";
import { ContainerShips } from "../Model/containerShips.js";
import { fetchJson, numberRamdonBetween } from "../Helpers/Utils.js";
import { fetchPage } from "../Helpers/Utils.js";
import { raking } from "./ranking.js";
export async function play() {
    localStorage.setItem("isShiftPlayer", true)
    const size = parseInt(localStorage.getItem("size"))
    const container = document.getElementById("tableroJugador")
    chargeWeather()
    chargeUser()

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`
    container.innerHTML = localStorage.getItem("map")
    const mapMachine = createShipsMachines()



    createMap("p2", document.getElementById("tableroEnemigo"), (div) => {
        div.onclick = () => {
            let isImpactUser = stroke(div, ContainerShips.containerMachine, mapMachine)

            localStorage.setItem("isShiftPlayer", isImpactUser)
            while (localStorage.getItem("isShiftPlayer") == "false") {

                let isImpactMachine = strokeMachine()
                localStorage.setItem("isShiftPlayer", isImpactMachine)
            }

        }
    })

}
async function strokeMachine() {
    //Se hace la logica de la maquina 
    const size = localStorage.getItem("size")
    const x = numberRamdonBetween(0, size - 1)
    const y = numberRamdonBetween(0, size - 1)

    const div = document.getElementById(`p1-${x}-${y}`)
    return stroke(div, ContainerShips.ContainerUser, ContainerShips.matrixPlayer)
}

function stroke(div, listOponent, matrixOponente) {
    const id = div.id
    const separateId = id.split("-")
    const user = separateId[0]
    const x = parseInt(separateId[1])
    const y = parseInt(separateId[2])
    let isWinner = false
    let isImpact = false

    listOponent.forEach(ship => {

        if (existeBarco(ship.getPositions(), [x, y])) {

            deletePosition(ship, [x, y])
            isImpact = true
            if (user == "p2") {
                div.onclick = () => {
                    alert("Esta poscicion ya ha sido atacada");
                }
            }
            matrixOponente[x][y] += "h"
            div.style.backgroundColor = "black"
            if (ship.getPositions().length == 0) {
                alert("Barco derribado")
                listOponent.splice(listOponent.indexOf(ship), 1)
            }
            if (listOponent.length == 0) {
                alert("Gano", user == "p1" ? " la maquina" : "usted")
                isWinwe = true
            }
            return true


        }
        if (isWinner) {
            //Aqui se hace el llamdo a la api
        }
    })
    if (!isImpact) {
        //     console.log("hola");

        div.style.backgroundColor = "white"
        return false


    } else {




    }
};
function existeBarco(listaPrincipal, objetivo) {
    return listaPrincipal.some(
        par => par[0] === objetivo[0] && par[1] === objetivo[1]
    );
}
function deletePosition(ship, aim) {
    let principalList = ship.getPositions()
    let listModified = principalList.filter(
        b => !(b[0] === aim[0] && b[1] === aim[1])
    );
    ship.setPositions(listModified)
    return ship
}
export function chargeUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    const nickname = user["nick_name"];
    // const country = user["country_code"];
    const score = user["score"];
    
    document.getElementById("user").innerText = nickname;
    // document.getElementById("country").innerText = country;
    document.getElementById("puntaje-valor").innerText = score;
}
export async function chargeWeather() {
    const API_KEY = "60c90e172eb6b3e0c4ea4d2956b0189b";
    const city=localStorage.getItem("zoneBattle")
    const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${API_KEY}`)).json()

    
    const temperatura = data.main.temp;
    

    document.getElementById("clima").innerText = temperatura+"°";
 
}

