const dns = require('dns')

const getMx = async (domain) => {
  return new Promise(r =>
    dns.resolveMx(domain, (err, addresses) => {
      if (err || !addresses) return r([])
      r(addresses)
    })
  )
}

const getBestMx = async (domain) => {
  const addresses = await getMx(domain)
  let bestIndex = 0

  for (let i = 0; i < addresses.length; i++) {
    if (addresses[i].priority < addresses[bestIndex].priority) {
      bestIndex = i
    }
  }

  return addresses[bestIndex]
}

module.exports = {getBestMx,getMx}