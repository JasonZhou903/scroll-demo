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
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      const docHeight = document.body.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = (scrollTop) / (docHeight - winHeight)
      const scrollPercentRounded = Math.round(scrollPercent * 100)

      percentLabel.textContent = scrollPercentRounded > 100 ? 100 : scrollPercentRounded
      rangeBar.value = scrollPercent * 100
    }

    handleRangeBarChange(e) {
      const rangeVal = e.target.value
      const docHeight = document.body.scrollHeight
      const winHeight = window.innerHeight
      const scrollTop = (docHeight - winHeight) * rangeVal / 100

      window.scrollTo(0, scrollTop)
    }

    hideMask() {
      this.elements.mask.className = 'hidden'
    }

    init() {
      const { rangeBar } = this.elements

      // Update the percent label and range bar when window scroll or resize
      window.addEventListener('scroll', this.updatePercent.bind(this))
      window.addEventListener('resize', this.updatePercent.bind(this))
      // Update the window scroll position when range bar changes
      rangeBar.addEventListener('input', this.handleRangeBarChange.bind(this))
      // IE11 only supports change event
      rangeBar.addEventListener('change', this.handleRangeBarChange.bind(this))
      // Hide the tip and mask when body clicked
      document.body.addEventListener('click', this.hideMask.bind(this))
    }
  }

  const app = new App()
  
  app.init()
})()