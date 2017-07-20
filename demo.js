(function () {
  function updatePercent() {
    const scrollTop = document.body.scrollTop
    const docHeight = document.body.scrollHeight
    const winHeight = window.innerHeight
    const scrollPercent = (scrollTop) / (docHeight - winHeight)
    const scrollPercentRounded = Math.round(scrollPercent * 100)

    document.getElementById('percent').textContent = scrollPercentRounded
    document.getElementById('range-bar').value = scrollPercent * 100
  }

  function handleRangeBarChange(e) {
    const rangeVal = e.target.value
    const docHeight = document.body.scrollHeight
    const winHeight = window.innerHeight
    const scrollTop = (docHeight - winHeight) * rangeVal / 100

    window.scroll(0, scrollTop)
  }

  function hideMask() {
    document.getElementById('mask').classList = 'hidden'
  }

  function init() {
    const rangeBar = document.getElementById('range-bar')

    // Update the percent label and range bar when window scroll or resize
    window.addEventListener('scroll', updatePercent)
    window.addEventListener('resize', updatePercent)
    // Update the window scroll position when range bar changes
    rangeBar.addEventListener('input', handleRangeBarChange)
    // Hide the tip and mask when body clicked
    document.body.addEventListener('click', hideMask)
  }

  init()
})()