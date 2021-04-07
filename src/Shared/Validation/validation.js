import {regex} from '../Regex/validateRegex';

export const validationHandler = (name, value) => {
    console.log(regex[name].test(value))
    return regex[name].test(value)
}

