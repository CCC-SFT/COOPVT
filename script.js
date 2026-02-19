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

  const encontrado = datos.find(fila => fila[0] === valor);

  if (!encontrado) {
    resultado.innerHTML = `
      <div class="alert alert-danger mt-3">
        Actualmente el usuario de este NIT no se encuentra afiliado.
      </div>
    `;
    return;
  }


  if (!encontrado[1] || encontrado[1].trim().toLowerCase() === "null") {
    resultado.innerHTML = `
      <div class="alert alert-info mt-3">
        Su fecha de expedición no se encuentra registrada en la base de datos.
        <br>
        Por favor comuníquese con la administración para actualizar su información.
      </div>
    `;
    return;
  }


  registroTemporal = encontrado;

  const modal = new bootstrap.Modal(document.getElementById('fechaModal'));
  document.getElementById('fechaInput').value = "";
  document.getElementById('errorFecha').innerHTML = "";
  modal.show();
}
