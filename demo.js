(function () {
  class App {
    constructor() {
      this.elements = {
        percentLabel: document.getElementById('percent'),
        rangeBar: document.getElementById('range-bar'),
        mask: document.getElementById('mask'),
      }
    }

    updatePercent() {
      const { percentLabel, rangeBar  } = this.elements
      const scrollTop = document.body.scrollTop
      const docHeight = document.body.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = (scrollTop) / (docHeight - winHeight)
      const scrollPercentRounded = Math.round(scrollPercent * 100)

      percentLabel.textContent = scrollPercentRounded
      rangeBar.value = scrollPercent * 100
    }

    handleRangeBarChange(e) {
      const rangeVal = e.target.value
      const docHeight = document.body.scrollHeight
      const winHeight = window.innerHeight
      const scrollTop = (docHeight - winHeight) * rangeVal / 100

      window.scroll(0, scrollTop)
    }

    hideMask() {
      this.elements.mask.classList = 'hidden'
    }

    init() {
      const { rangeBar } = this.elements

      // Update the percent label and range bar when window scroll or resize
      window.addEventListener('scroll', this.updatePercent.bind(this))
      window.addEventListener('resize', this.updatePercent.bind(this))
      // Update the window scroll position when range bar changes
      rangeBar.addEventListener('input', this.handleRangeBarChange.bind(this))
      // Hide the tip and mask when body clicked
      document.body.addEventListener('click', this.hideMask.bind(this))
    }
  }

  const app = new App()
  
  app.init()
})()