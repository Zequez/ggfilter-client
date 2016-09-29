let getSpinner = () => document ? document.getElementById('loading-spinner') : null

let loadingCounter = 0

export function start () {
  let spinner = getSpinner()
  if (spinner) {
    loadingCounter++
    spinner.classList.add('loading')
  }
}

export function stop () {
  let spinner = getSpinner()
  if (spinner) {
    loadingCounter--
    if (loadingCounter === 0) {
      spinner.classList.remove('loading')
    }
  }
}
