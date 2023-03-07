
export const isNumeric = (num) => {
    return !isNaN(num)
}

export const truncate = (str, max = 20) => {
    return str.length > max ? str.substr(0, max-1) + '…' : str;
}

export const getValues = (data, values= []) => {
    if(typeof data !== 'object'){
      return [...values, data]
    }
    return Object.values(data).flatMap(v => getValues(v, values))
}

export const getOnlyPathsNavigate = (arr) => {
    return getValues(arr).filter(_ => typeof _ === 'string' &&   _.startsWith("/"));
}

export const getCurrentNavigatePath = (navigation) => {
    const paths = getOnlyPathsNavigate(navigation);

    const windowPath = window.location.pathname;
    if(windowPath) { console.log(paths);
        return paths.find(_ => windowPath.startsWith(_));
    }
}
