function buscar() {
  const valor = document.getElementById('busqueda').value.trim();
  const resultado = document.getElementById('resultado');

  resultado.innerHTML = "";

  if (!valor) {
    resultado.innerHTML = `
      <div class="alert alert-warning mt-3">
        Por favor ingrese un NIT.
      </div>
    `;
    return;
  }

  const encontrado = datos.find(fila => 
    fila[0] && fila[0].trim() === valor
  );

  if (!encontrado) {
    resultado.innerHTML = `
      <div class="alert alert-danger mt-3">
        Actualmente el usuario de este NIT no se encuentra afiliado.
      </div>
    `;
    return;
  }

  // 🔴 LISTA DE NIT SIN FECHA
  const nitsSinFecha = [
    "28815864",
    "65808287",
    "28789403",
    "52439959",
    "38259198"
  ];

  if (nitsSinFecha.includes(valor)) {
    resultado.innerHTML = `
      <div class="alert alert-warning mt-3">
        Este usuario no posee registro de fecha de expedición.
        <br>
        Por favor comuníquese con la administración para actualizar su información.
      </div>
    `;
    return;
  }

  // ✅ SI NO ESTÁ EN LA LISTA, ABRE MODAL
  registroTemporal = encontrado;

  const modal = new bootstrap.Modal(document.getElementById('fechaModal'));
  document.getElementById('fechaInput').value = "";
  document.getElementById('errorFecha').innerHTML = "";
  modal.show();
}
