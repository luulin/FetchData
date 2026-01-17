let result = [];
const gridContainer = document.getElementById('grid-container');

async function loadGrids() {
    const url = "https://rickandmortyapi.com/api/character";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        result = await response.json();
        renderGrids(result.results);
    } catch (error) {
        console.error(error.message);
    }
}

function renderGrids(grids) {
    gridContainer.innerHTML = "";
    grids.forEach(grid => {
        let {id, name, status, species, gender, location, image} = grid;
        gridContainer.innerHTML +=
            `
            <div class="grid" onclick="openAPI(${id})">
                <img src="${image}" alt="${name}">
                <div class="info">
                    <h2>${name}</h2>
                    <h3>${status} - ${species}</h3>
                    <p class="gender">Gender: ${gender}</p>
                    <p>Last known location: </p>
                    <p>${location.name}</p>
                </div>
            </div>
            `
    })
}

function openAPI(id) {
    window.open(
        `https://rickandmortyapi.com/api/character/${id}`,
        "_blank"
    );
}


const genderFilter = document.getElementById("genderFilter");

genderFilter.addEventListener("change", function () {
    const selectedGender = genderFilter.value;

    if (selectedGender === "all") {
        renderGrids(result.results);
    } else {
        const filteredCharacters = result.results.filter(function (character) {
            return character.gender === selectedGender;
        });

        renderGrids(filteredCharacters);
    }
});



loadGrids();