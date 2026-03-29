<template>
  <div>
    <h2>Reportes</h2>

    <p>Total documentos: {{ documentos.length }}</p>

    <p>Finalizados: {{ finalizados }}</p>
  </div>
</template>

<script>
export default {
  props: ['documentos'],
  computed: {
    finalizados() {
      return this.documentos.filter(d => d.estado === "Finalizado").length
    }
  }
}
</script>