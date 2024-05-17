// Creo 3 variables: 
//pages para poder modificar las páginas que quiero consultar de la API
//btnBack y btnNext: uno para cada boton, para luego crear los eventos click
let page = 1;
const btnBack = document.getElementById('btnBack');
const btnNext = document.getElementById('btnNext');


//Se crean los eventos para escuchar los clickcs, el boton Next incrementa la variable page en 1 por cada click.
//Por el contrario, el botón Back decrementará la variable page en 1 por cada click
btnNext.addEventListener('click', () => {
	if(page < 1000){
		page += 1;
		loadMovies();
	}
});

btnBack.addEventListener('click', () => {
	if(page > 1){
		page -= 1;
		loadMovies();
	}
});

//options: contiene toda la información necesaria para poder autenticarme con la API. Investigar esto en la documentación de la API
const options = {
	method: 'GET',
	headers: {
	  accept: 'application/json',
	  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTg4OTUwM2RkZmQyOWVkYmZmYmY2N2ZiYTA5Nzg5YiIsInN1YiI6IjY2NDUyZTJiZWU4Y2FiNjBkNzc3Zjg4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sSxm6U06heWxLDKIg-D2tgndFdYOZF8mrse3oqP6774'
	}
  };


  //Comienso declarando la función que guardo en la constante loadMovies, esta constante luego llamaré a lo último para que se ejecute.
  //esta función es asíncrona para poder utilizar await cuando sea necesario
const loadMovies = async() => {

	//Hago un try catch para contener y manejar los errores. Recuerden declarar el try y luego el catch, ya que sin este último nos marcará error.
	try {

		//hago el fetch a la url, en vez de poner el número de páginas utilizo ${} para incluir mi variable page declarada anteriormente e iniciada en 1.
		//(recuerden poner toda la cadena en comillas invertidas, sino el ${} no funciona  ` Así ` )
		const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options);
	
		console.log(response);

		// Si la respuesta es correcta (200). Esto se puede reemplazar por un switch
		if(response.status === 200){
			const data = await response.json();
			

			//inicio la variable movies vacía para luego utilizarla en el forEach
			let movies = '';
			data.results.forEach(movie => {
				movies += `
					<div class="movie">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
						<h3 class="title">${movie.title}</h3>
					</div>
				`;
			});

			document.getElementById('container').innerHTML = movies;

		} else if(response.status === 401){
			console.log('Pusiste la llave mal');
		} else if(response.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	//Configuro mi catch para que muestre el error.
	} catch(error){
		console.log(error);
	}

}

loadMovies();