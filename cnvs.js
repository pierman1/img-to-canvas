export class Cnvs {
  constructor() {
    this.canvas = document.getElementById('cnvs')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.context = this.canvas.getContext('2d')

    this.placeholders = document.getElementsByClassName('cnvs-placeholder')
    this.images = []

    this.init()
  }

  calculatePositions() {
    for (var i = 0; i < this.placeholders.length; i++) {
      const placeholder = this.placeholders.item(i)

      const top = placeholder.offsetTop
      const left = placeholder.offsetLeft
      const src = placeholder.dataset.img

      const image = new Image()
      image.src = src

      this.images.push({image: image, top: top, left: left, width: 200, height: 300})   
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawAll() {
    requestAnimationFrame(() => this.drawAll())

    this.clear()

    for (var i = 0; i < this.images.length; i++) {
      const image = this.images[i]
      this.draw(this.context, image.image, image.top, image.left - window.scrollX, image.width, image.height)  
    }
  }

  draw(context, image, top, left, width, height) {
    this.context.drawImage(image, left, top, width, height)
  }

  bind() {
    document.addEventListener('scroll', this.scroll)
    window.addEventListener('resize', this.resize)
  }

  scroll() {
    if (window.scrollX === 0) {
      window.scrollTo(9000, 0)
    } else if (window.scrollX === 9000) {
      window.scrollTo(0, 0)
    }
  }

  resize () {
    this.calculatePositions()
    this.drawAll()
  }

  init() {
    this.calculatePositions()
    this.drawAll()
    this.bind()
  }
}
