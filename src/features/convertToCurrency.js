export const convertToCurrency = (price) => {
    let toStr = price?.toString();

    toStr = toStr?.substring(0, toStr.length - 2);

    return new Intl.NumberFormat().format(parseInt(toStr));

};