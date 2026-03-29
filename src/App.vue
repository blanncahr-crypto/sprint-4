<template>
  <div class="container">

    <!-- NAVBAR -->
    <nav class="navbar">
      <h1>Sistema Interno de Gestión</h1>
      <div>
        <button @click="vista = 'dashboard'">Dashboard</button>
        <button @click="vista = 'registro'">Documentos</button>
        <button @click="vista = 'usuarios'">Usuarios</button>
      </div>
    </nav>

    <!-- DASHBOARD -->
    <div v-if="vista === 'dashboard'" class="dashboard">
      <h2>Panel de Control</h2>

      <div class="cards">
        <div class="card">
          <h3>Total documentos</h3>
          <p>{{ documentos.length }}</p>
        </div>

        <div class="card">
          <h3>Usuarios</h3>
          <p>{{ usuarios.length }}</p>
        </div>

        <div class="card">
          <h3>Estado</h3>
          <p>Activo</p>
        </div>
      </div>
    </div>

    <!-- REGISTRO DE DOCUMENTOS -->
    <div v-if="vista === 'registro'" class="modulo">
      <h2>Registro de Documentos</h2>

      <form @submit.prevent="guardarDocumento">

        <div class="grid">
          <div class="campo">
            <label>Folio</label>
            <input v-model="documento.folio" required />
          </div>

          <div class="campo">
            <label>Fecha</label>
            <input type="date" v-model="documento.fecha" required />
          </div>

          <div class="campo">
            <label>Tipo</label>
            <select v-model="documento.tipo" required>
              <option disabled value="">Seleccione</option>
              <option>Oficio</option>
              <option>Memorándum</option>
              <option>Reporte</option>
            </select>
          </div>

          <div class="campo">
            <label>Área</label>
            <select v-model="documento.area" required>
              <option disabled value="">Seleccione</option>
              <option>RH</option>
              <option>Sistemas</option>
              <option>Finanzas</option>
            </select>
          </div>

          <div class="campo">
            <label>Prioridad</label>
            <select v-model="documento.prioridad">
              <option>Baja</option>
              <option>Media</option>
              <option>Alta</option>
            </select>
          </div>

          <div class="campo">
            <label>Responsable</label>
            <input v-model="documento.responsable" />
          </div>
        </div>

        <div class="campo">
          <label>Observaciones</label>
          <textarea v-model="documento.observaciones"></textarea>
        </div>

        <h3>Solicitante</h3>

        <div class="grid">
          <div class="campo">
            <label>Nombre</label>
            <input v-model="documento.solicitante.nombre" required />
          </div>

          <div class="campo">
            <label>Tipo</label>
            <select v-model="documento.solicitante.tipo">
              <option>Ciudadano</option>
              <option>Empresa</option>
            </select>
          </div>

          <div class="campo">
            <label>Contacto</label>
            <input v-model="documento.solicitante.contacto" />
          </div>
        </div>

        <button type="submit">Registrar documento</button>
      </form>
    </div>

    <!-- USUARIOS -->
    <div v-if="vista === 'usuarios'" class="modulo">
      <h2>Gestión de Usuarios</h2>

      <input placeholder="Buscar usuario..." />

      <input v-model="usuario.nombre" placeholder="Nombre completo" />
      <input v-model="usuario.correo" placeholder="Correo electrónico" />

      <select v-model="usuario.rol">
        <option disabled value="">Selecciona rol</option>
        <option>Administrador</option>
        <option>Capturista</option>
      </select>

      <select v-model="usuario.estado">
        <option>Activo</option>
        <option>Inactivo</option>
      </select>

      <button @click="agregarUsuario">Agregar usuario</button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      vista: 'dashboard',

      documentos: [],
      usuarios: [],

      documento: {
        folio: '',
        fecha: '',
        tipo: '',
        area: '',
        prioridad: '',
        responsable: '',
        observaciones: '',
        solicitante: {
          nombre: '',
          tipo: '',
          contacto: ''
        }
      },

      usuario: {
        nombre: '',
        correo: '',
        rol: '',
        estado: 'Activo'
      }
    }
  },

  methods: {
    guardarDocumento() {

      if (!this.documento.folio || !this.documento.tipo) {
        alert("Faltan datos")
        return
      }

      this.documentos.push({
        ...this.documento,
        id: Date.now()
      })

      alert("Documento guardado")

      this.documento = {
        folio: '',
        fecha: '',
        tipo: '',
        area: '',
        prioridad: '',
        responsable: '',
        observaciones: '',
        solicitante: {
          nombre: '',
          tipo: '',
          contacto: ''
        }
      }

      this.vista = 'dashboard'
    },

    agregarUsuario() {

      if (!this.usuario.nombre || !this.usuario.correo) {
        alert("Completa los datos")
        return
      }

      this.usuarios.push({
        ...this.usuario,
        id: Date.now()
      })

      alert("Usuario agregado")

      this.usuario = {
        nombre: '',
        correo: '',
        rol: '',
        estado: 'Activo'
      }
    }
  }
}
</script>

<style>
.container {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  color: white;
  padding: 15px;
  border-radius: 10px;
}

.navbar button {
  margin-left: 10px;
  padding: 8px 12px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
}

.dashboard {
  text-align: center;
}

.cards {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.card {
  background: #f1f5f9;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
}

.modulo {
  margin-top: 20px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.campo {
  display: flex;
  flex-direction: column;
}

input, select, textarea {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

textarea {
  height: 80px;
}

button {
  margin-top: 15px;
  padding: 10px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
}
</style>