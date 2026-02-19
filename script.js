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

  // Buscar solo en la columna 0 (NIT)
  const encontrado = datos.find(fila => fila[0] === valor);

  if (encontrado) {
    resultado.innerHTML = `
      <b>NIT:</b> ${encontrado[0]} <br>
      <b>Fecha Expedición:</b> ${encontrado[1]} <br>
      <b>Nombre:</b> ${encontrado[2]} <br>
      <b>Ciudad Labora:</b> ${encontrado[3]} <br>
      <b>Zona Electoral:</b> ${encontrado[4]} <br>
      <b>Hábil:</b> ${encontrado[5]} <br>
      <b>Mesa:</b> ${encontrado[6] || 'No asignada'} <br>
      <b>Lugar:</b> ${encontrado[7]}
    `;
  } else {
    resultado.innerHTML = "No encontrado";
  }
}
