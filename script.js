// Estructura de datos inicial (Simulación de DB)
let documentos = [
    { id: "SIG-001", nombre: "Oficio de Solicitud A", estado: "Recibido" },
    { id: "SIG-002", nombre: "Reporte Trimestral", estado: "En proceso" }
];

// Función para actualizar tabla y métricas (HU-04 y HU-05)
function actualizarVista() {
    const lista = document.getElementById('lista-tramites');
    lista.innerHTML = '';
    let finalizados = 0;

    documentos.forEach((doc, index) => {
        if(doc.estado === "Finalizado") finalizados++;
        
        lista.innerHTML += `
            <tr>
                <td>${doc.id}</td>
                <td>${doc.nombre}</td>
                <td><span class="status-${doc.estado.toLowerCase().replace(" ", "-")}">${doc.estado}</span></td>
                <td>
                    <select onchange="cambiarEstado(${index}, this.value)">
                        <option value="Recibido" ${doc.estado === 'Recibido' ? 'selected' : ''}>Recibido</option>
                        <option value="En proceso" ${doc.estado === 'En proceso' ? 'selected' : ''}>En proceso</option>
                        <option value="Finalizado" ${doc.estado === 'Finalizado' ? 'selected' : ''}>Finalizado</option>
                    </select>
                </td>
            </tr>
        `;
    });

    document.getElementById('total-docs').innerText = documentos.length;
    document.getElementById('docs-finalizados').innerText = finalizados;
}

// Lógica de cambio de estado (HU-03)
function cambiarEstado(index, nuevoEstado) {
    documentos[index].estado = nuevoEstado;
    actualizarVista();
    console.log(`Documento ${documentos[index].id} actualizado a: ${nuevoEstado}`);
}

// Validación de formulario (Actividad 4 del Sprint)
function validarTramite(nombre) {
    if (nombre.trim().length < 5) {
        alert("Error: El nombre del documento debe tener al menos 5 caracteres.");
        return false;
    }
    return true;
}

// Inicializar vista
document.addEventListener('DOMContentLoaded', actualizarVista);
