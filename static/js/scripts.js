function agregarCiudad() {
    const ciudadesDiv = document.getElementById('ciudades');
    const nuevoGrupo = document.createElement('div');
    nuevoGrupo.className = 'row g-3 mb-3';
    nuevoGrupo.innerHTML = `
        <div class="col-md-4">
            <input type="text" class="form-control" placeholder="Nombre de la ciudad" name="nombre">
        </div>
        <div class="col-md-4">
            <input type="number" step="any" class="form-control" placeholder="Latitud" name="latitud">
        </div>
        <div class="col-md-4">
            <input type="number" step="any" class="form-control" placeholder="Longitud" name="longitud">
        </div>
    `;
    ciudadesDiv.appendChild(nuevoGrupo);
}

document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll('#ciudades input');
    let ciudades = [];

    for (let i = 0; i < inputs.length; i += 3) {
        let nombre = inputs[i].value.trim();
        let latitud = parseFloat(inputs[i+1].value);
        let longitud = parseFloat(inputs[i+2].value);

        if (nombre && !isNaN(latitud) && !isNaN(longitud)) {
            ciudades.push({ nombre, latitud, longitud });
        }
    }

    if (ciudades.length < 2) {
        Swal.fire('Error', 'Debes ingresar al menos dos ciudades', 'error');
        return;
    }

    axios.post('/resolver', { ciudades })
        .then(response => {
            const ruta = response.data.ruta;
            const distancia = response.data.distancia_total.toFixed(2);

            document.getElementById('resultado').innerHTML = `
                <div class="alert alert-success">
                    <h4 class="alert-heading">Ruta Óptima:</h4>
                    <p>${ruta.join(' ➔ ')}</p>
                    <hr>
                    <p><strong>Distancia Total:</strong> ${distancia}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error(error);
            Swal.fire('Error', 'Ocurrió un error al calcular la ruta', 'error');
        });
});
