<script>
export default {
  props:{
    Masses: {
      type: Array,
      required: true
    }
  },
  data() {
    return {     
    }
  }
}
</script>

<template>     
      <ul class="list-group">
        <div class="list-group-item" v-for="(Mass, id) in Masses" :key="id">
            {{ Mass.name }}
        </div>
      </ul>     
</template>

<style>

</style>