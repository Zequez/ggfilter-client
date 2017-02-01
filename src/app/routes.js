import { routing as filterAppRouting } from 'src/FilterApp'

export default {
  '/': {
    page: 'filter',
    ...filterAppRouting
  },
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
