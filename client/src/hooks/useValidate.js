const useValidate = (formData, validationConfig) => {
    const validationResult = {};
    let hasErrors = false;
    Object.entries(formData).forEach(([key, value]) => {

        validationConfig[key].some((rule) => {
            if(rule.required && !value){
                validationResult[key] = rule.message;
                return hasErrors = true;
            }
            if(rule.minLength && value.length < rule.minLength){
                validationResult[key] = rule.message;
                return hasErrors = true;
            }
            if(rule.maxLength && value.length > rule.maxLength){
                validationResult[key] = rule.message;
                return hasErrors = true;
            }
            if(rule.pattern && !rule.pattern.test(value)){
                validationResult[key] = rule.message;
                return hasErrors = true;
            }
            if(rule.validatePassword){
                let lwrCse = 0;
                let uprCse = 0;
                let digits = 0;
                let splchs = 0;
                for(let ch of value){
                    if(ch >= 'a' && ch <= 'z'){
                        lwrCse++;
                    }
                    else if(ch >= 'A' && ch <= 'Z'){
                        uprCse++;
                    }
                    else if(ch >= '0' && ch <= '9'){
                        digits++;
                    }
                    else{
                        splchs++;
                    }
                }
                if(rule.minLowercase && lwrCse < rule.minLowercase){
                    validationResult[key] = `Password must contain atleast ${rule.minLowercase} lowercase ${(rule.minLowercase === 1)? 'alphabet' : 'alphabets'}`;
                    return hasErrors = true;
                }
                if(rule.minUppercase && uprCse < rule.minUppercase){
                    validationResult[key] = `Password must contain atleast ${rule.minUppercase} uppercase ${(rule.minUppercase === 1)? 'alphabet' : 'alphabets'}`;
                    return hasErrors = true;
                }
                if(rule.minDigit && digits < rule.minDigit){
                    validationResult[key] = `Password must contain atleast ${rule.minDigit} ${(rule.minDigit === 1)? 'digit' : 'digits'}`;
                    return hasErrors = true;
                }
                if(rule.minSpecialCharacter && splchs < rule.minSpecialCharacter){
                    validationResult[key] = `Password must contain atleast ${rule.minSpecialCharacter} special ${(rule.minSpecialCharacter === 1)? 'character' : 'characters'}`;
                    return hasErrors = true;
                }
            }

            // Need to add more validations

        });
    });
    return [validationResult, hasErrors]
};

export default useValidate;