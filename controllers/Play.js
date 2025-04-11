import { createShipsMachines } from "./settingsMachine.js";
import { createMap } from "./createMap.js";
import { ContainerShips } from "../Model/containerShips.js";
import { fetchJson, numberRamdonBetween } from "../Helpers/Utils.js";
import { fetchPage } from "../Helpers/Utils.js";
import { Ranking } from "./ranking.js";
import { App } from "./App.js";
export async function play() {
  localStorage.setItem("isShiftPlayer", true);
  const casillasSeleccionadasMaquinas = [];
  localStorage.setItem(
    "casillasSeleccionadasMaquinas",
    JSON.stringify(casillasSeleccionadasMaquinas)
  );
  const size = parseInt(localStorage.getItem("size"));
  const container = document.getElementById("tableroJugador");
  chargeWeather();

  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  container.innerHTML = localStorage.getItem("map");
  const mapMachine = createShipsMachines();

  createMap("p2", document.getElementById("tableroEnemigo"), async (div) => {
    div.onclick = async () => {
      chargeUser();
      let isImpactUser = await stroke(
        div,
        ContainerShips.containerMachine,
        mapMachine
      );

      localStorage.setItem("isShiftPlayer", isImpactUser);
      console.log(localStorage.getItem("isShiftPlayer"));
      while (localStorage.getItem("isShiftPlayer") == "false") {
        console.log(ContainerShips.ContainerUser);

        let isImpactMachine = await strokeMachine();
        console.log(isImpactMachine);
        localStorage.setItem("isShiftPlayer", !isImpactMachine);
      }
    };
  });
}
async function strokeMachine() {
  //Se hace la logica de la maquina
  const size = localStorage.getItem("size");
  const x = numberRamdonBetween(0, size - 1);
  const y = numberRamdonBetween(0, size - 1);

  const div = document.getElementById(`p1-${x}-${y}`);
  const casillasSeleccionadasMaquinas = JSON.parse(
    localStorage.getItem("casillasSeleccionadasMaquinas")
  );
  casillasSeleccionadasMaquinas.forEach(() => {
    if (element[0] == x && element[1] == y) {
      return true;
    }
  });

  casillasSeleccionadasMaquinas.push([x, y]);

  return await stroke(
    div,
    ContainerShips.ContainerUser,
    ContainerShips.matrixPlayer
  );
}

async function stroke(div, listOponent, matrixOponente) {
  const id = div.id;
  const separateId = id.split("-");
  const user = separateId[0];
  const x = parseInt(separateId[1]);
  const y = parseInt(separateId[2]);
  let isWinner = false;
  let isImpact = false;

  if (user == "p1") {
  }
  listOponent.forEach((ship) => {
    if (existeBarco(ship.getPositions(), [x, y])) {
      if (user == "p2") {
        div.onclick = () => {
          alert("Esta bomba ya estallo");
          return;
        };
      }
      deletePosition(ship, [x, y]);
      isImpact = true;

      matrixOponente[x][y] += "h";
      div.style.backgroundColor = "black";
      if (ship.getPositions().length == 0) {
        alert("Barco derribado");
        listOponent.splice(listOponent.indexOf(ship), 1);
      }
      if (listOponent.length == 0) {
        alert("Gano", user == "p1" ? " la maquina" : "usted");
        isWinner = true;
      }
      return true;
    }
  });
  if (user == "p2") {
    const newScore = calculateScore(matrixOponente, x, y);

    const user = JSON.parse(localStorage.getItem("user"));
    const nickname = user["nick_name"];
    const country = user["country_code"];
    user["score"] = parseInt(user["score"]) + newScore;

    localStorage.setItem("user", JSON.stringify(user));
    chargeUser();
  }
  if (isWinner) {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    user["score"] = parseInt(user["score"]);
    await fetch("http://127.0.0.1:5000/score-recorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    localStorage.clear();
    App.main();
  }
  if (!isImpact) {
    div.style.backgroundColor = "white";
    return false;
  }

  return true;
}

function calculateScore(matrixOponent, x, y) {
  let scores = -1;
  const tamaño = matrixOponent[0].length;

  const coordenadasCerca = [
    [1, 1],
    [1, 0],
    [1, -1],
    [0, 1],
    [0, -1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ];
  if (matrixOponent[[x]][y] != "a") {
    scores = 10;
  }
  coordenadasCerca.forEach((element) => {
    let i = x + element[0];
    let j = y + element[1];
    if (i > 0 && j > 0 && i < tamaño && j < tamaño) {
      if (matrixOponent[i][j] != "a") {
        scores = -5;
      }
    }
  });
  return scores;
}

function existeBarco(listaPrincipal, objetivo) {
  console.log(listaPrincipal);

  return listaPrincipal.some(
    (par) => par[0] === objetivo[0] && par[1] === objetivo[1]
  );
}
function deletePosition(ship, aim) {
  let principalList = ship.getPositions();
  let listModified = principalList.filter(
    (b) => !(b[0] === aim[0] && b[1] === aim[1])
  );
  ship.setPositions(listModified);
  return ship;
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
  const city = localStorage.getItem("zoneBattle");
  const data = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${API_KEY}`
    )
  ).json();

  const temperatura = data.main.temp;

  document.getElementById("clima").innerText = temperatura + "°";
}
