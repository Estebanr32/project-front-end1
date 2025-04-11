import { createMap } from "./createMap.js";
import { fetchPage } from "../Helpers/Utils.js";
import { play } from "./Play.js";
import { ContainerShips } from "../Model/containerShips.js";
import { matrixMap } from "../Helpers/Utils.js";
import { Ship } from "../Model/Ship.js";
import { Ranking } from "./ranking.js";

export async function settingsUSer() {
  localStorage.setItem("rotateShip", false);
  await fetchPage(
    "../views/settings.html",
    document.getElementById("container")
  );
  const ranking = document.getElementById("ranking");

  const container1 = document.getElementById("container");

  ranking.addEventListener("click", async () => {
    container1.innerHTML = "";
    await fetchPage("../views/ranking.html", container1);
    Ranking();
  });
  const rotateMap = document.getElementById("rotarBarco");

  rotateMap.addEventListener("click", () => {
    localStorage.setItem(
      "rotateShip",
      localStorage.getItem("rotateShip") == "true" ? false : true
    );
  });
  ContainerShips.matrixPlayer = matrixMap();

  const container = document.getElementById("tableroConfig");
  const rotateShip = document.getElementById("rotarBarco");

  createMap("p1", container, async (div) => {
    div.onclick = async () => {
      await drawShip(div, false, false);
    };
  });
}
async function drawShip(div) {
  const select = document.getElementById("seleccionBarco");
  const optionShip = select.options[select.selectedIndex];
  const sizeShip = parseInt(optionShip.getAttribute("data-size"));
  const selectColor = document.getElementById("seleccionColor");
  const optionColor = selectColor.options[selectColor.selectedIndex];
  const color = optionColor.getAttribute("data-code");

  let id = div.id.split("-");
  const x = parseInt(id[1]);
  const y = parseInt(id[2]);
  const rotateShip = localStorage.getItem("rotateShip");
  let ship = new Ship();
  if (rotateShip == "true") {
    if (sizeShip + x > parseInt(localStorage.getItem("size"))) {
      alert("Sobre pasa los limites.Intente de nuevo");
      return;
    }
    for (let index = x; index < sizeShip + x; index++) {
      if (ContainerShips.matrixPlayer[index][y] != "a") {
        alert("Los barcos no se pueden intersectar");
        for (let j = x; j < index; j++) {
          ship.positions = [];
          const actualDiv = document.getElementById(`p1-${j}-${y}`);
          actualDiv.style.backgroundColor = "#e7f5ff";
        }
        return;
      }
      const actualDiv = document.getElementById(`p1-${index}-${y}`);
      actualDiv.style.backgroundColor = color;
      ship.positions.push([index, y]);
      ContainerShips.matrixPlayer[index][y] = `p1-${index}-${y}`;
    }
  } else {
    if (sizeShip + y > parseInt(localStorage.getItem("size"))) {
      return;
    }
    for (let index = y; index < sizeShip + y; index++) {
      if (ContainerShips.matrixPlayer[x][index] != "a") {
        alert("Los barcos no se pueden intersectar");
        for (let j = y; j < index; j++) {
          ship.positions = [];
          const actualDiv = document.getElementById(`p1-${x}-${j}`);

          actualDiv.style.backgroundColor = "#e7f5ff";
        }
        return;
      }
      ship.positions.push([x, index]);
      const actualDiv = document.getElementById(`p1-${x}-${index}`);
      actualDiv.style.backgroundColor = color;
      ContainerShips.matrixPlayer[x][index] = `p1-${x}-${index}`;
    }
  }
  const li = document.getElementById(optionShip.value);
  li.remove();
  select.remove(select.selectedIndex);
  selectColor.remove(selectColor.selectedIndex);
  ContainerShips.ContainerUser.push(ship);

  if (select.options.length == 0) {
    localStorage.setItem(
      "map",
      document.getElementById("tableroConfig").innerHTML
    );
    document.getElementById("container").innerHTML = "";

    await fetchPage(
      "../views/plaing.html",
      document.getElementById("container")
    );
    play();
  }
}
