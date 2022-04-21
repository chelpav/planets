<template>
   <form @submit.prevent>           
    <div class="form-inline">                         
        <div class="input-group mb-3">
            <span class="input-group-text">Name</span>
            <input v-model="newmass.name" class="form-control" type="text" aria-label="Name">
            <span class="input-group-text">Mass</span>
            <input v-model="newmass.startMass" class="form-control" type="text" aria-label="mass">
            <span class="input-group-text">Unit</span>
            <select v-model="newmass.unit" class="form-select" aria-label="Default select example">
                <option selected>Select Unit</option>
                <option value="SW">M☉</option>
                <option value="EW">ME</option>
            </select>
            <span class="input-group-text">Size</span>
            <input v-model="newmass.size" class="form-control" type="text" aria-label="Size">
            <span class="input-group-text">Color</span>
            <input v-model="newmass.hexColor" v-on:change="changeColor"  type="color" class="form-control form-control-color" id="exampleColorInput"  title="Choose your color">
        </div>              
        <div class="input-group mb-3">
            <span class="input-group-text">Starting X</span>
            <input v-model="newmass.startX" class="form-control" type="text" aria-label="startX">
            <span class="input-group-text">Starting Y</span>
            <input v-model="newmass.startY" class="form-control" type="text" aria-label="startY">
            <span class="input-group-text">Starting X Velocity</span>
            <input v-model="newmass.startXV" class="form-control" type="text" aria-label="startXV">
            <span class="input-group-text">Starting Y Velocity</span>
            <input v-model="newmass.startYV" class="form-control" type="text" aria-label="startYV">
        </div>
        <div class="input-group mb-3">
          <button @click="addMass" type="button" class="btn btn-success">Add</button>
        </div>
        
      </div>           
  </form>
</template>

<script>
export default {    
    data(){
         return {      
        newmass: {
        name: "New",
        startMass: 1,
        unit: "EW",
        size: 10,
        hexColor: "#000000",
        startX: 0,
        startY: 0,
        startXV: 0,
        startYV: 0,
      },   
    }
    },
    methods:{
        addMass(){
            this.$emit('addMass', this.newmass)
            this.newmass = {
            name: "New",
            startMass: 1,
            unit: "EW",
            size: 10,
            hexColor: "#000000",
            startX: 0,
            startY: 0,
            startXV: 0,
            startYV: 0,
            } 
        }
    }
}
</script>

<style>

</style>