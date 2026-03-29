<template>
  <div class="usuarios-card">
    <h2>Gestión de Usuarios</h2>

    <!-- BUSCADOR -->
    <input v-model="busqueda" placeholder="Buscar usuario..." />

    <!-- FORMULARIO -->
    <div class="usuarios-form">
      <input v-model="usuario.nombre" placeholder="Nombre completo" />
      <input v-model="usuario.correo" placeholder="Correo electrónico" />

      <select v-model="usuario.rol">
        <option disabled value="">Selecciona rol</option>
        <option>Administrador</option>
        <option>Usuario</option>
      </select>

      <select v-model="usuario.estado">
        <option>Activo</option>
        <option>Inactivo</option>
      </select>

      <button @click="agregarUsuario">
        {{ indexEditando !== null ? 'Actualizar' : 'Agregar usuario' }}
      </button>
    </div>

    <!-- TABLA -->
    <table v-if="usuariosFiltrados.length">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(u, index) in usuariosFiltrados" :key="index">
          <td>{{ u.nombre }}</td>
          <td>{{ u.correo }}</td>
          <td>{{ u.rol }}</td>
          <td>
            <span :class="'estado ' + u.estado">
              {{ u.estado }}
            </span>
          </td>
          <td>
            <button @click="editarUsuario(index)">Editar</button>
            <button class="btn-eliminar" @click="eliminarUsuario(index)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
        nombre: "",
        correo: "",
        rol: "",
        estado: "Activo"
      },
      usuarios: [],
      busqueda: "",
      indexEditando: null
    }
  },

  mounted() {
    const data = localStorage.getItem("usuarios")
    if (data) {
      this.usuarios = JSON.parse(data)
    }
  },

  computed: {
    usuariosFiltrados() {
      return this.usuarios.filter(u =>
        u.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      )
    }
  },

  methods: {
    agregarUsuario() {
      if (!this.usuario.nombre || !this.usuario.correo || !this.usuario.rol) {
        alert("Completa todos los campos")
        return
      }

      if (this.indexEditando !== null) {
        this.usuarios[this.indexEditando] = { ...this.usuario }
        this.indexEditando = null
      } else {
        this.usuarios.push({ ...this.usuario })
      }

      localStorage.setItem("usuarios", JSON.stringify(this.usuarios))

      this.usuario = {
        nombre: "",
        correo: "",
        rol: "",
        estado: "Activo"
      }
    },

    editarUsuario(index) {
      this.usuario = { ...this.usuarios[index] }
      this.indexEditando = index
    },

    eliminarUsuario(index) {
      this.usuarios.splice(index, 1)
      localStorage.setItem("usuarios", JSON.stringify(this.usuarios))
    }
  }
}
</script>

<style scoped>
.usuarios-card {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* FORM */
.usuarios-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

/* BOTONES */
button {
  background: #1e88e5;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #1565c0;
}

.btn-eliminar {
  background: #e53935;
}

.btn-eliminar:hover {
  background: #c62828;
}

/* TABLA */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

/* ESTADOS */
.estado {
  padding: 5px 10px;
  border-radius: 20px;
  color: white;
  font-size: 12px;
}

.Activo {
  background: green;
}

.Inactivo {
  background: gray;
}
</style>