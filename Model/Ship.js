export class Ship{
    constructor(size,positions){
        this.size=size
        this.positions=positions
    }
    getPositions(){
        return this.positions
    }
    setPositions(positions){
        this.positions=positions
    }
}