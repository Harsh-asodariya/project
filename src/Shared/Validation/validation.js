import {regex} from '../Regex/validateRegex';

export const validationHandler = (name, value) => {
    return regex[name].test(value)
}

