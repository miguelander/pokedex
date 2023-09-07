
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header")
let URL = "https://pokeapi.co/api/v2/pokemon/"


    for(let i =1; i<= 151; i++){
         fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
    }

    function mostrarPokemon(data){

       let tipos = data.types.map(type => `<p class= ${type.type.name}> ${type.type.name}</p>`)
       tipos = tipos.join('')
    
        let pokeId = data.id.toString()
        if(pokeId.length === 1){
            pokeId = "00" + pokeId
        }else if(pokeId.length === 2 ){
            pokeId = "0" + pokeId
        }        
        
    const div = document.createElement("div")
    div.classList.add("pokemon")
    div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-imagen">
        <img src="${data.sprites.other["official-artwork"].front_default}" alt="Pikachu">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${data.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${data.height}cm</p>
            <p class="stat">${data.weight}kg</p>
        </div>
    </div>
    `;
    listaPokemon.append(div);
}



//RECORREMOS CADA BOTON PARA GREGAR EL EVENTO CLICK
//el parametro event es para traer algo especifico del boton
botonesHeader.forEach(boton => boton.addEventListener("click", (event)=>{
    //currentTarget nos permite traer del html lo que le hicimos click
   
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for(let i =1; i<= 150; i++){
        fetch(URL + i)
       .then((response) => response.json())
       .then(data => {

       
        if(botonId === "ver-todos"){
            mostrarPokemon(data)
        }else{
            const tipos = data.types.map(type => type.type.name);
            if(tipos.some(tipo => tipo.includes(botonId))){
                mostrarPokemon(data)
            }
         }

       })
   }
}))

