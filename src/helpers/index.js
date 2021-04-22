/**
 * checks if variable is undefined or null or false value
 * @param {*} x
 */
export const isEmpty = (x) => {
    return x === undefined || x === null || !x;
}