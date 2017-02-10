export function canUpdateFilter (filter, user, secrets) {
  return !!(secrets[filter.sid] || (user && (user.id === filter.userId || user.isAdmin)))
}
