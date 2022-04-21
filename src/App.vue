<template>
<div>
<header>  
    

</header>

  <main>
    <NewMass @addMass="addMass" />
    <MassList :Masses="Masses"/>
  </main>
 </div>
</template>


<script>

import Mass from './Mass.js'
import NewMass from './components/NewMass.vue'
import MassList from './components/MassList.vue'

export default {
  components: {
    NewMass,
    MassList,
  },
  data() {
    let m = [
        new Mass("Sun", 0, 0, 1, "SW", 0, 0, 30, [255, 255, 0]),
        new Mass("Mercury", 0, 0.46, 0.055, "EW", 38700, 0, 10, [255, 20, 20]),
        new Mass("Venus", 0, 0.723, 0.815, "EW", 35020, 0, 20, [100, 204, 150]),
        new Mass("Earth", 0, 1, 1, "EW", 30000, 0, 20, [52, 204, 235]),
        new Mass("Mars", 0, 1.666, 0.107, "EW", 24130, 0, 15, [200, 30, 30]),
    ]

  for (let i = 0; i < m.length; i++){
    m[i].id = i
  }

    return {
      Masses: [...m],
    }
},
   methods: {
      addMass(newmass){       
        let NewM = new Mass(
          newmass.name, 
          newmass.startX, 
          newmass.startY,
          newmass.mass,
          newmass.unit,
          newmass.startXV,
          newmass.startYV,
          newmass.size,             
          [0, 0, 0])
        NewM.hexColor = newmass.hexColor
        NewM.hexToRgb()
        NewM.id = this.Masses.length        
        this.Masses.push(NewM)      
      }
    }

}

</script>


<style>

</style>
