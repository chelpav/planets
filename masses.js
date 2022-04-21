
function componentToHex(c) {
  let hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
}

class Mass{
    G = 6.67 * 10 ** (-11)
    Units = {"SW": 1.98855 * 10**30, "EW": 5.972 * 10**24}
    AE = 1.496 * 10**11

    constructor(name, x, y, mass, unit, xv, yv, size, color){
        this.name = name
        this.x = x * AE
        this.y = y * AE
        this.startX = x
        this.startY = y
        this.startMass = mass
        this.mass = mass * Units[unit]
        this.unit = unit
        this.xv = xv
        this.yv = yv
        this.startXV = xv
        this.startYV = yv
        this.size = size
        this.color = color
        this.hexColor = this.rgbToHex(...color)
    }

    componentToHex(c) {
      let hex = c.toString(16)
      return hex.length == 1 ? "0" + hex : hex;
    }
    
    rgbToHex(r, g, b) {
      return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }


    hexToRgb() {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.hexColor);
      this.color = result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
     ] : null;
     console.log(this.color, this.hexColor)
    }

    draw(){        
        fill(...this.color)
        stroke(this.color[0]/2, this.color[1]/2, this.color[2]/2)
        let x = (this.x == 0 ? 0 : this.x / AE) * SCL + CanvasSize.width / 2
        let y = -(this.y == 0 ? 0 : this.y / AE) * SCL + CanvasSize.heigth / 2
        ellipse(x, y, this.size)
    }

    gravitate(other){
        let dx =  other.x - this.x
        let dy =  other.y - this.y
        let d = Math.sqrt(dx ** 2 + dy ** 2)
        let force = G * (this.mass * other.mass) / (d ** 2)

        let theta = Math.atan2(dy, dx)
        let fx = Math.cos(theta) * force
        let fy = Math.sin(theta) * force

        this.xv += fx / this.mass * Period
        this.yv += fy / this.mass * Period
   
        other.xv -= fx / other.mass * Period
        other.yv -= fy / other.mass * Period     
    }

    move(){
        this.x += this.xv * Period
        this.y += this.yv * Period

    }
}

const G = 6.67 * 10 ** (-11)
const Units = {"SW": 1.98855 * 10**30, "EW": 5.972 * 10**24}
const AE = 1.496 * 10**11

let Masses = [
    new Mass("Sun", 0, 0, 1, "SW", 0, 0, 30, [255, 255, 0]),
    new Mass("Mercury", 0, 0.46, 0.055, "EW", 38700, 0, 10, [255, 20, 20]),
    new Mass("Venus", 0, 0.723, 0.815, "EW", 35020, 0, 20, [100, 204, 150]),
    new Mass("Earth", 0, 1, 1, "EW", 30000, 0, 20, [52, 204, 235]),
    new Mass("Mars", 0, 1.666, 0.107, "EW", 24130, 0, 15, [200, 30, 30]),
]

const app = Vue.createApp({
  data() { 
    return {
      components: {
        MassesTable
      },
      masses: Masses,
      value: "#ffffff",
      changeColor: function () {
        Masses.forEach(el => el.hexToRgb())
      }      
    }
  }
}).mount('#app')





const CanvasSize = {heigth: 1100, width: 1100}
const Background = 50
let Period = 240 * 60
const SCL = 100





// let Masses = []

let DefaultSystem 
function preload(){
    DefaultSystem = loadJSON("masses.json")
}

function setup() {
    createCanvas(CanvasSize.heigth, CanvasSize.width);
    // newSystem(DefaultSystem["masses"])
   
}
  
function draw() {
    background(Background, 10)
  
    for (let i = 0; i < Masses.length; i++){
        Masses[i].draw()
  
        for (let j = i+1; j < Masses.length; j++){
             Masses[i].gravitate(Masses[j])
        } 
        Masses[i].move()
  
    
    }
  }


  function loadMFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('inputFile');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the 'files' property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      let lines = e.target.result;
      let loadedJson = JSON.parse(lines)
      newSystem(loadedJson['masses'])
 
    }
  }

  function newSystem(arr){
    background(Background)
    let Masses = []
    arr.forEach(el => {
      let m = new Mass(el.name, el.x , el.y, el.mass, el.unit, el.xv, el.yv, el.size, el.color)
      Masses.push(m)  
      })
    return Masses
  }
