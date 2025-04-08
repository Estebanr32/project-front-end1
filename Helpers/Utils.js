export async function fetchPage(url, container) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("");
    }
    const html = await response.text();
    let contenidoInterno = container.innerHTML;
    contenidoInterno += html;
    container.innerHTML = contenidoInterno;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchJson(url) {
  let response = await fetch(url);
  if (!response.ok) {
    console.log(error);
  }
  return response;
}

export async function getCountries(container) {
  const data = await (
    await fetchJson("http://127.0.0.1:5000/countries")
  ).json();
  data.forEach((element) => {
    let key = Object.keys(element)[0];
    let option = document.createElement("option");
    option.textContent = element[key];
    option.value = key;
    container.appendChild(option);
  });
}
export async function getCountry(code) {
  const data = await (
    await fetchJson("http://127.0.0.1:5000/countries")
  ).json();
  let paises = document.getElementById("pais");
  data.forEach((element) => {
    let key = Object.keys(element)[0];
    if (code == key) {
      return element[code];
    }
  });
  return false;
}
export function matrixMap() {
  let matrix = [];
  const size = JSON.parse(localStorage.getItem("size"));
  for (let i = 0; i < size; i++) {
    matrix.push([]);
    for (let j = 0; j < size; j++) {
      matrix[i].push("a");
    }
  }
  return matrix;
}
export function numberRamdonBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
