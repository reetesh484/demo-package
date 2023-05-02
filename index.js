const isRegex = require('./Regex/regex')
const isDisposable = require('./Disposable/disposable')
const checkTypo= require('./Typo/typo')
const { getBestMx } = require('./DNS/dns')


let reasons = {}
let output = {
    valid:true,
    regex:true,
    disposable:true,
    typo:true,
    mx:true,
}

const computeValidity = () => {
    output.valid = output.regex && output.disposable && output.mx && output.smtp && output.typo;
}

const isValid = async(email) => {
    email = email.trim();
    let result = true;
    //Regex check
    const result1 = isRegex(email);
    if(!result1){
        reasons.regex="Regex didn't match";
        output.regex=false;
    }
    
   if(output.regex){
     //check typo
     const result3 = await checkTypo(email);
     if(result3){
         reasons.typo=result3;
         output.typo = false;
     }
 
     const domain = email.split('@')[1]
    
     
     //Disposable Mail Check
     const result2 = isDisposable(domain);
     if(!result2){
         reasons.disposable="Disposable Mail";
         output.disposable = false;
     }
 
     //MX Record Check
    if(output.disposable){
        const mx = await getBestMx(domain)
        if(!mx){
            reasons.mx="MX Record not found";
            output.mx = false;
        }
    }
 
   }

    computeValidity();
    if(!output.valid) output.reason = reasons;
    return output
}

module.exports = isValid