export default function objectBreadcrumbs (obj) {
  let breadcrumbs = []

  for (let key in obj) {
    let val = obj[key]
    if (typeof val === 'object' && !(val instanceof Array)) {
      let nestedBreadcrumbs = objectBreadcrumbs(val)
      for (let i = 0; i < nestedBreadcrumbs.length; ++i) {
        nestedBreadcrumbs[i].unshift(key)
        breadcrumbs.push(nestedBreadcrumbs[i])
      }
    } else {
      breadcrumbs.push([key, val])
    }
  }

  return breadcrumbs
}
