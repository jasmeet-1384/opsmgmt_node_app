export function success(message, data = null) {
    let result = {
        status_code : 1,
        message,
        
    }

    if(data != null)
    {
        result['data'] = data ;
    }

    return result;

}

export function failed(message) {
    return {
        status_code : 0,
        message
    }
}

export function firstError(validation) {
    let all = validation.errors.errors;
    let key =  Object.keys(all)[0];

    return validation.errors.first(key);
}