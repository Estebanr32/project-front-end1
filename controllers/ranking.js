import { fetchJson,fetchPage } from "../Helpers/Utils.js";
import { settingsUSer } from "./settingsUser.js"


export async function raking() {
    const response = await (await fetchJson("http://127.0.0.1:5000/ranking")).json();
    const body = document.getElementById("bodyRanking");
    const data = await (await fetchJson("http://127.0.0.1:5000/countries")).json();
    const container=document.getElementById("container")
    const volver=document.getElementById("volver")

    volver.addEventListener("click",()=>{
        container.innerHTML=""
        settingsUSer()
    })
    // Limpiar el contenido existente
    body.innerHTML = '';
    
    response.forEach((element, index) => {
        const tr = document.createElement("tr");
        tr.classList.add("table-warning");
        
        // Columna para el número de ranking (#)
        const thRanking = document.createElement("th");
        thRanking.setAttribute("scope", "row");
        thRanking.textContent = index + 1; // Ranking empezando desde 1
        tr.appendChild(thRanking);
        
        // Columna para el nickname
        const columnaNickname = document.createElement("td");
        columnaNickname.textContent = element.nick_name;
        tr.appendChild(columnaNickname);
        
        // Columna para el país
        let country = element.country_code.toUpperCase();
        let columnCountry = document.createElement("td");
        
        // Creamos un contenedor para alinear bandera y nombre del país
        let countryContainer = document.createElement("div");
        countryContainer.style.display = "flex";
        countryContainer.style.alignItems = "center";
        
        // Agregamos la bandera
        let img = document.createElement("img");
        img.src = `https://flagsapi.com/${country}/flat/32.png`;
        img.style.marginRight = "10px";
        countryContainer.appendChild(img);
        
        // Agregamos el nombre del país
        let countryName = document.createElement("span");
        countryName.textContent = data[country];
        countryContainer.appendChild(countryName);
        
        columnCountry.appendChild(countryContainer);
        tr.appendChild(columnCountry);
        
        // Columna para el puntaje
        let columnScore = document.createElement("td");
        columnScore.textContent = element.score;
        columnScore.style.textAlign = "right"; // Alineamos el puntaje a la derecha
        tr.appendChild(columnScore);
        
        body.appendChild(tr);
    });
}