import Router5 from 'router5'
import browserPlugin from 'router5/plugins/browser'

export const routes = [
  { name: 'root', path: '/' },
  { name: 'filterRedirect', path: '/f' },
  { name: 'filterSid', path: '/f/:sid' },
  { name: 'filterFull', path: '/f/:sid/:slug' },
  { name: 'sysreq', path: '/sysreq' },

  { name: 'aboutSysreq', path: '/sysreq/about' },
  { name: 'logs', path: '/logs' },
  { name: 'sources', path: '/sources' },
  { name: 'feedback', path: '/feedback' },
  { name: 'donations', path: '/donations' },
  { name: 'oculusSandbox', path: '/oculus-sandbox' }
]

const router = Router5(routes, {defaultRoute: 'root'}).usePlugin(browserPlugin())

export const paths = router.buildPath
export const urls = router.buildUrl
export default router
