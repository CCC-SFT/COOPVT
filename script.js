let datos = [];

fetch('informacion_web.csv')
  .then(response => response.text())
  .then(text => {
    const filas = text.trim().split('\n').map(f => f.split(','));
    
    // Quitamos la primera fila (encabezados)
    filas.shift();
    
    datos = filas;
  });

function buscar() {
  const valor = document.getElementById('busqueda').value.trim();
  const resultado = document.getElementById('resultado');

  if (!valor) {
    resultado.innerHTML = `
      <div class="alert alert-warning mt-3">
        Por favor ingrese un NIT.
      </div>
    `;
    return;
  }

  // Buscar solo en la columna 0 (NIT)
  const encontrado = datos.find(fila => fila[0] === valor);

  if (encontrado) {
    resultado.innerHTML = `
      <div class="table-responsive mt-4">
        <table class="table table-bordered table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>NIT</th>
              <th>Fecha Expedición</th>
              <th>Nombre</th>
              <th>Ciudad Labora</th>
              <th>Zona Electoral</th>
              <th>Hábil</th>
              <th>Mesa</th>
              <th>Lugar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${encontrado[0]}</td>
              <td>${encontrado[1]}</td>
              <td>${encontrado[2]}</td>
              <td>${encontrado[3]}</td>
              <td>${encontrado[4]}</td>
              <td>${encontrado[5]}</td>
              <td>${encontrado[6] || 'No asignada'}</td>
              <td>${encontrado[7]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  } else {
    resultado.innerHTML = `
      <div class="alert alert-danger mt-3">
        No se encontró información para ese NIT.
      </div>
    `;
  }
}
