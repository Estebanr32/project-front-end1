export function createMap(id,container,evento) {
    const size = parseInt(localStorage.getItem("size"))

    const vocales = [
        "a", "b", "c", "d", "e",
        "f", "g", "h", "i", "j",
        "k", "l", "m", "n", "o",
        "p", "q", "r", "s", "t"
    ]
    console.log(size);
       container.style.gridTemplateColumns = `repeat(${size + 1}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size + 1}, 1fr)`

    for (let i = 0; i < size + 1; i++) {

        for (let j = 0; j < size + 1; j++) {
            const div = document.createElement("div")
            div.classList.add("celda", "header")
            if (i === 0) {
                div.innerHTML = vocales[j - 1]
                if (j === 0) {
                    div.innerHTML = ""

                }

            } else {
                div.classList.remove("header")
                div.id=`${id}-${i}-${j}` 
            }
            if (j === 0) {
                div.innerHTML = i
                div.classList.add("header")

            }
            evento(div)
            container.appendChild(div)


        }

    }

}
