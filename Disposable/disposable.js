let domains = require('disposable-email-domains')

domains = new Set(domains);

function isDisposable(email){
    return domains.has(email);
}

module.exports = isDisposable;