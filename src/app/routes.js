import { routing as filterAppRouting } from 'src/FilterApp'

let filterAppRoutes = {}
for (let routeName in filterAppRouting) {
  filterAppRoutes[routeName] = {...filterAppRouting[routeName], page: 'filter'}
}

export default {
  ...filterAppRoutes,
  '/sysreq': {
    title: 'System Requirements Calculator',
    page: 'sysreq'
  },
  '/about-sysreq': {
    title: 'About the System Requirements Calculator',
    page: 'aboutSysreq'
  },
  '/feedback': {
    title: 'Get in toucha',
    page: 'feedback'
  },
  '/donations': {
    title: 'Gotta pay the bills',
    page: 'contribute'
  },
  '/oculus-sandbox': {
    title: 'Oculus Sandbox',
    page: 'oculusSandbox'
  }
}
