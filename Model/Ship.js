export class Ship{
    
    constructor(positions=[]){
        this.positions=positions
    }
    getPositions(){
        return this.positions
    }
    setPositions(positions){
        this.positions=positions
    }
}