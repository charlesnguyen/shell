export function prefix(location, ...prefixes) {
  return prefixes.some(
    (prefix) => location.href.indexOf(`${location.origin}/${prefix}`) !== -1
  )
}

export function ais(location) {
  return prefix(location, 'apps/accounts')
}
