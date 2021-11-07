const addZeroes = (num) => {
        const value = toString(num);
        const dec = value.split('.')[1]
        const len = dec && dec.length > 2 ? dec.length : 2
        return Number(num).toFixed(len)
}

export { addZeroes };