let datos = [];

fetch('informacion_web.csv')
  .then(response => response.text())
  .then(text => {
    const filas = text.split('\n').map(f => f.split(','));
    datos = filas;
  });

function buscar() {
  const valor = document.getElementById('busqueda').value.toLowerCase();
  const resultado = document.getElementById('resultado');

  const encontrado = datos.find(fila => 
    fila.some(col => col.toLowerCase().includes(valor))
  );

  if (encontrado) {
    resultado.innerHTML = "Resultado: " + encontrado.join(" | ");
  } else {
    resultado.innerHTML = "No encontrado";
  }
}
