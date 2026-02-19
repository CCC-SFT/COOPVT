let datos = [];
let registroTemporal = null;

fetch('informacion_web.csv')
  .then(response => response.text())
  .then(text => {
    const filas = text.trim().split('\n').map(f => f.split(','));
    filas.shift(); // 
    datos = filas;
  });

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

  registroTemporal = encontrado;

  // 🔹 SIEMPRE abrir modal (aunque la fecha sea NULL)
  const modal = new bootstrap.Modal(document.getElementById('fechaModal'));
  document.getElementById('fechaInput').value = "";
  document.getElementById('errorFecha').innerHTML = "";
  modal.show();
}

function validarFecha() {
  let fechaIngresada = document.getElementById('fechaInput').value.trim();
  const errorDiv = document.getElementById('errorFecha');

  if (!registroTemporal) return;

  const fechaNumerica = fechaIngresada.replace(/\D/g, '');

  if (fechaNumerica.length !== 8) {
    errorDiv.innerHTML = "Formato inválido. Use YYYY/MM/DD.";
    return;
  }

  const month = parseInt(fechaNumerica.substring(4, 6));
  const day = parseInt(fechaNumerica.substring(6, 8));

  if (month < 1 || month > 12) {
    errorDiv.innerHTML = "Mes inválido.";
    return;
  }

  if (day < 1 || day > 31) {
    errorDiv.innerHTML = "Día inválido.";
    return;
  }

  // 🔴 CASO: Fecha NO registrada en base de datos
  if (!registroTemporal[1] || registroTemporal[1].toLowerCase() === "null") {
    errorDiv.innerHTML = 
      "La fecha de expedición no se encuentra registrada en la base de datos. Por favor comuníquese con la administración.";
    return;
  }

  // ✅ CASO: Fecha correcta
  if (fechaNumerica === registroTemporal[1]) {
    bootstrap.Modal.getInstance(document.getElementById('fechaModal')).hide();
    mostrarTabla(registroTemporal);
  } else {
    errorDiv.innerHTML = "Fecha incorrecta. Intente nuevamente.";
  }
}

function formatearFecha(fecha) {
  if (!fecha || fecha.toLowerCase() === "null") return "No registrada";

  if (fecha.length === 8) {
    return `${fecha.substring(0,4)}-${fecha.substring(4,6)}-${fecha.substring(6,8)}`;
  }

  return fecha;
}

function mostrarTabla(registro) {
  const resultado = document.getElementById('resultado');

  resultado.innerHTML = `
    <div class="table-responsive mt-4">
      <table class="table table-bordered table-striped table-hover w-100 text-center">
        <thead class="table-dark">
          <tr>
            <th>NIT</th>
            <th>Fecha Expedición</th>
            <th>Nombre del Asociado</th>
            <th>Ciudad donde Labora</th>
            <th>Zona Electoral</th>
            <th>Estado</th>
            <th>Mesa</th>
            <th>Lugar de Votación</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${registro[0]}</td>
            <td>${formatearFecha(registro[1])}</td>
            <td>${registro[2]}</td>
            <td>${registro[3]}</td>
            <td>${registro[4]}</td>
            <td>${registro[5]}</td>
            <td>${registro[6] || 'No asignada'}</td>
            <td>${registro[7]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

/* =========================
   MÁSCARA AUTOMÁTICA FECHA
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const fechaInput = document.getElementById('fechaInput');

  if (fechaInput) {

    fechaInput.addEventListener('input', function (e) {
      let valor = e.target.value.replace(/\D/g, '');

      if (valor.length > 8) {
        valor = valor.substring(0, 8);
      }

      let formateado = '';

      if (valor.length > 0) {
        formateado = valor.substring(0, 4);
      }
      if (valor.length >= 5) {
        formateado += '/' + valor.substring(4, 6);
      }
      if (valor.length >= 7) {
        formateado += '/' + valor.substring(6, 8);
      }

      e.target.value = formateado;
    });

    fechaInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        validarFecha();
      }
    });
  }

});
