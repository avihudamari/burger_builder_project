export const checkValidity = (value, rules) => {
    let isValid = true;
    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let phoneFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    //'(123) 456-7890', '(123)456-7890', '123-456-7890', '1234567890'
    
    if (rules.emailValidation) {
        isValid = mailFormat.test(value) && isValid;
    }

    if (rules.phoneValidation) {
        isValid = phoneFormat.test(value) && isValid;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    return isValid;
}