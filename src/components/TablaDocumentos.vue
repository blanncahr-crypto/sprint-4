<template>
  <div>
    <h2>Lista de Documentos</h2>

    <table border="1">
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Estado</th>
        <th>Cambiar</th>
      </tr>

      <tr v-for="(doc, index) in documentos" :key="doc.id">
        <td>{{ doc.id }}</td>
        <td>{{ doc.nombre }}</td>
        <td>{{ doc.estado }}</td>
        <td>
          <select v-model="doc.estado">
            <option>Recibido</option>
            <option>En proceso</option>
            <option>Finalizado</option>
          </select>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['documentos']
}
</script>