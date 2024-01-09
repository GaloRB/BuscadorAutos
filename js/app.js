// Variables
const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');
const max = new Date().getFullYear();
const min = max - 10;
const marca = document.querySelector('#marca')
const puertas = document.querySelector('#puertas')
const color = document.querySelector('#color')
const transmision = document.querySelector('#transmision')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const buscador = document.querySelector('#buscador')
const limpiar_filtros = document.querySelector('#limpiar');

//Generar un objeto que contendra la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}


/****** Eventos ******* */
document.addEventListener('DOMContentLoaded', () => {
    // Muestra todos los autos al cargar
    mostrarAutos(autos);

    // Llena las opciones de años
    llenarSelect();
})

// detecta con que select se interactia
buscador.addEventListener('click', e => {
    detectarSelect(e.target.id);
})

// limpia los filtros
limpiar_filtros.addEventListener('click', () => {
    buscador.reset();
})

/******  Funciones ***********/

// muetra todos los autos al cargar la pagina
function mostrarAutos(autos) {

    limpiarHtml();

    autos.forEach(auto => {

        // Destructuring para convertir las llaves del objeto en variables
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;

        const autoHtml = document.createElement('P');

        autoHtml.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        // insertar en el HTML
        resultado.appendChild(autoHtml);

    });
}


// elimina el html previo
function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// agrega los años al select años
function llenarSelect() {

    // Agrega los años al select
    for (i = max; i > min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i
        opcion.textContent = i;
        year.appendChild(opcion);
    }

}

// detetcta que select se usa
function detectarSelect(select) {
    this.addEventListener('change', e => {
        llenarObjt(e.target.id, e.target.value)
        filtrarAuto();
    })
}

// llena objeto de busqueda
function llenarObjt(llave, valor) {
    datosBusqueda[llave] = valor;
}

// Filtrar auto filtra en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    // console.log(resultado);

    // mostrar mensaje si no hay resultados
    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

// muestra mensaje si no hay resultado
function noResultado() {

    limpiarHtml();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'Sin resultados, intenta con otros parámetros de búsqueda';
    resultado.appendChild(noResultado);
}

// funciones por citerio de busquda
function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}