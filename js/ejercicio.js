const cleanFrases = () => {
	const frases = document.getElementById('frases');

	while (frases.hasChildNodes()) {
		frases.removeChild(frases.firstChild);
	}
}

let cargarDatos = () => {
  fetch('https://dataserverdaw.herokuapp.com/escritores/xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml")
      let escritores = xml.getElementsByTagName('escritor')

      for (let escritor of escritores) {
        let id = escritor.querySelector('id').textContent
        let nombre = escritor.querySelector('nombre').textContent
        let plantilla = `<option value= "${id}">${nombre}</option>`
        document.querySelector('select').innerHTML += plantilla
      }
    })
    .catch(console.error);

}

window.addEventListener('DOMContentLoaded', (event) => {
  cargarDatos()
});


document.querySelector('select').addEventListener('change', (event) => {
  cleanFrases()
  fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
    .then(response => response.json())
    .then(data => {
      const res = data.frases
      frasesFiltradas = res.filter(frase => frase.id_autor == event.target.value)
      for(let f of frasesFiltradas){
        const plantilla = `
        <div class="col-lg-3">
          <div class="test-inner ">
            <div class="test-author-thumb d-flex">
              <div class="test-author-info">
                <h4>${f.id_autor}</h4>                                            
              </div>
            </div>
            <span>${f.texto}</span>
             <i class="fa fa-quote-right"></i>
          </div>
         </div>
        `
        document.querySelector('#frases').innerHTML += plantilla
      }

    })
    .catch(console.error);

})