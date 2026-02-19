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

  // 🔎 Buscar NIT limpiando espacios
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

  // 🔴 LIMPIEZA TOTAL DEL CAMPO FECHA
  let fechaBD = encontrado[1] || "";
  fechaBD = fechaBD.replace(/"/g, "")  // quitar comillas
                   .replace(/\r/g, "") // quitar retorno de carro
                   .trim()
                   .toUpperCase();

  // 🔴 SI ES NULL O VACÍO
  if (fechaBD === "" || fechaBD === "NULL") {
    resultado.innerHTML = `
      <div class="alert alert-info mt-3">
        Su fecha de expedición no se encuentra registrada en la base de datos.
        <br>
        Por favor comuníquese con la administración para actualizar su información.
      </div>
    `;
    return;
  }

  // ✅ SOLO SI TIENE FECHA REGISTRADA
  registroTemporal = encontrado;

  const modal = new bootstrap.Modal(document.getElementById('fechaModal'));
  document.getElementById('fechaInput').value = "";
  document.getElementById('errorFecha').innerHTML = "";
  modal.show();
}
