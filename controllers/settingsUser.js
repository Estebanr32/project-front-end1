import { createMap } from "./createMap.js";
import { fetchPage } from "../Helpers/Utils.js";
import { play } from "./Play.js";
import { ContainerShips } from "../Model/containerShips.js";
import { matrixMap } from "../Helpers/Utils.js";
import { raking } from "./ranking.js";
import { Ship } from "../Model/Ship.js";

export async function settingsUSer() {
    localStorage.setItem("rotateShip", false);
    
    // Carga el HTML
    await fetchPage("../views/settings.html", document.getElementById("container"));
    
    // Añade un pequeño retraso para asegurar que el DOM esté actualizado
    setTimeout(() => {
        const ranking = document.getElementById("ranking");
        const rotateMap = document.getElementById("rotarBarco");
        const container1 = document.getElementById("container");
        
        // Verifica que exista el botón de ranking y añade el evento
        if (ranking) {
            ranking.addEventListener("click", async () => {
                container1.innerHTML = "";
                await fetchPage("../views/ranking.html", container1);
                raking();
            });
        } else {
            console.error("No se encontró el elemento con ID 'ranking'");
        }
        
        // Verifica que exista el botón de rotar y añade el evento
        if (rotateMap) {
            rotateMap.addEventListener("click", () => {
                localStorage.setItem("rotateShip", localStorage.getItem("rotateShip") == "true" ? false : true);
                console.log(localStorage.getItem("rotateShip"));
            });
        } else {
            console.error("No se encontró el elemento con ID 'rotarBarco'");
        }
        
        ContainerShips.matrixPlayer = matrixMap();
        
        const container = document.getElementById("tableroConfig");
        
        if (container) {
            createMap("p1", container, async (div) => {
                div.onclick = async () => {
                    await drawShip(div, false, false);
                };
            });
        } else {
            console.error("No se encontró el elemento con ID 'tableroConfig'");
        }
    }, 100); // Un pequeño delay de 100ms
}

async function drawShip(div) {
    const select = document.getElementById("seleccionBarco");
    
    // Verifica que el select exista y tenga opciones
    if (!select || select.options.length === 0) {
        console.error("No se encontró el elemento select o no tiene opciones");
        return;
    }
    
    const optionShip = select.options[select.selectedIndex];
    const sizeShip = parseInt(optionShip.getAttribute("data-size"));
    const selectColor = document.getElementById("seleccionColor");
    
    // Verifica que el select de color exista y tenga opciones
    if (!selectColor || selectColor.options.length === 0) {
        console.error("No se encontró el elemento select de color o no tiene opciones");
        return;
    }
    
    const optionColor = selectColor.options[selectColor.selectedIndex];
    const color = optionColor.getAttribute("data-code");

    let id = (div.id).split("-");
    const x = parseInt(id[1]);
    const y = parseInt(id[2]);
    const rotateShip = localStorage.getItem("rotateShip");
    let ship = new Ship();
    
    if (rotateShip == "true") {
        if (sizeShip + x > parseInt(localStorage.getItem("size"))) {
            alert("Sobre pasa los limites. Intente de nuevo");
            return;
        }
        for (let index = x; index < sizeShip + x; index++) {
            if (ContainerShips.matrixPlayer[index][y] != "a") {
                alert("Los barcos no se pueden intersectar");
                for (let j = x; j < index; j++) {
                    ship.positions = [];
                    const actualDiv = document.getElementById(`p1-${j}-${y}`);
                    if (actualDiv) {
                        actualDiv.style.backgroundColor = "#e7f5ff";
                    }
                }
                return;
            }
            const actualDiv = document.getElementById(`p1-${index}-${y}`);
            if (actualDiv) {
                actualDiv.style.backgroundColor = color;
            }
            ship.positions.push([index, y]);
            ContainerShips.matrixPlayer[index][y] = `p1-${index}-${y}`;
        }
    } else {
        if (sizeShip + y > parseInt(localStorage.getItem("size"))) {
            alert("Sobre pasa los limites. Intente de nuevo");
            return;
        }
        for (let index = y; index < sizeShip + y; index++) {
            if (ContainerShips.matrixPlayer[x][index] != "a") {
                alert("Los barcos no se pueden intersectar");
                for (let j = y; j < index; j++) {
                    ship.positions = [];
                    const actualDiv = document.getElementById(`p1-${x}-${j}`);
                    if (actualDiv) {
                        actualDiv.style.backgroundColor = "#e7f5ff";
                    }
                }
                return;
            }
            ship.positions.push([x, index]);
            const actualDiv = document.getElementById(`p1-${x}-${index}`);
            if (actualDiv) {
                actualDiv.style.backgroundColor = color;
            }
            ContainerShips.matrixPlayer[x][index] = `p1-${x}-${index}`;
        }
    }
    
    const li = document.getElementById(optionShip.value);
    if (li) {
        li.remove();
    }
    
    select.remove(select.selectedIndex);
    selectColor.remove(selectColor.selectedIndex);
    ContainerShips.ContainerUser.push(ship);
    
    if (select.options.length == 0) {
        const tableroConfig = document.getElementById("tableroConfig");
        if (tableroConfig) {
            localStorage.setItem("map", tableroConfig.innerHTML);
        }
        
        const container = document.getElementById("container");
        if (container) {
            container.innerHTML = "";
            await fetchPage("../views/plaing.html", container);
            play();
        }
    }
}

// Función para verificar si hay errores en la comunicación con el backend
export async function checkBackendConnection() {
    try {
        const response = await fetch("http://127.0.0.1:5000/health-check", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (response.ok) {
            console.log("Conexión con el backend establecida correctamente");
            return true;
        } else {
            console.error("Error al conectar con el backend:", response.status);
            return false;
        }
    } catch (error) {
        console.error("No se pudo conectar con el backend:", error);
        return false;
    }
}
