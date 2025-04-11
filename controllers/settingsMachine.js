import { matrixMap } from "../Helpers/Utils.js";
import {ContainerShips} from "../Model/containerShips.js"
import { createMap } from "./createMap.js";
import{numberRamdonBetween} from "../Helpers/Utils.js";
import { Ship } from "../Model/Ship.js";

export function createShipsMachines() {
    const  sizesShips = [2, 2 , 3, 3, 4, 5];
    const matrixMachine= matrixMap()
    
    sizesShips.forEach(size=> {
      let isShipPut=false
      do {
        let ship =createShip(size,matrixMachine)
        if (ship!==false) {
          ContainerShips.containerMachine.push(ship)
          ship.getPositions().forEach(position => {
            const x = position[0];
            const y = position[1];
            matrixMachine[x][y]=`p2-${x}-${y}`
           
            isShipPut=true
          })
        }
      } while (!isShipPut);
      
    })
    return matrixMachine
  } 
  
  function createShip(size,matrix) {
  
    const getPositions=generatePositions(size,matrix)
    if (getPositions!= false) {
      let ship = new Ship();
      ship.setPositions(getPositions)
      return ship
    }
    return false
  }
  
  
  //falta volverlo optimo ya que se puede ahorrar muchas linas de codigo
  function generatePositions(size,matrix){
    const sizeMap = parseInt(localStorage.getItem("size"));  
    let orientation = numberRamdonBetween(0, 1) // 0 horizontal, 1 vertical;
    const positions=[]
    if (orientation == 0) {
      let x = numberRamdonBetween(0, sizeMap - 1);
      let y = numberRamdonBetween(0, sizeMap - size);
      for (let j = y; j < size + y; j++) {
        if (matrix[x][j] != "a") {
          return false;
        }
       
        positions.push([x, j]);
      }
      
    }else {
      let x = numberRamdonBetween(0, sizeMap - size);
      let y = numberRamdonBetween(0, sizeMap - 1);
      for (let j = x; j < size + x; j++) {
        if (matrix[j][y] != "a") {
          return false;
        }
        positions.push([j, y]);
      }
    }
    return positions;
  
  }
 
  