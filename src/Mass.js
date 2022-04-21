export default class Mass{
    G = 6.67 * 10 ** (-11)
    Units = {"SW": 1.98855 * 10**30, "EW": 5.972 * 10**24}
    AE = 1.496 * 10**11

    constructor(name, x, y, mass, unit, xv, yv, size, color){       
        this.name = name
        this.x = x * this.AE
        this.y = y * this.AE
        this.startX = x
        this.startY = y
        this.startMass = mass
        this.mass = mass * this.Units[unit]
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
