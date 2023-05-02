// import mailCheck from 'mailcheck'
const mailCheck = require('mailcheck')

// type TypoSuggestion = {
//   address: string
//   domain: string
//   full: string
// }

const checkTypo = async (email)=>
  new Promise(r => {
    
     let topLevelDomains = [...mailCheck.defaultTopLevelDomains]
    
    mailCheck.run({
      email,
      topLevelDomains: topLevelDomains,
      suggested: (suggestion) => {
        r(`Likely typo, suggested email: ${suggestion.full}`)
      },
      empty: function () {
        r("")
      },
    })
  })


module.exports = checkTypo