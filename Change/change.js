export class Change {
  calculate(coinArray, target) {
    if (target < 0) {
      throw 'Negative totals are not allowed.';
    }

    let arr = [[]];
    for (let i = 1; i <= target; i++) {
      arr[i] = coinArray
        //.filter(elem => elem <= i)
        .map(elem => arr[i - elem] ? [elem, ...arr[i - elem]] : undefined)
        .sort((a, b) => a.length - b.length)[0];
    }
    if (!arr[target]) throw new Error(`The total ${target} cannot be represented in the given currency.`);

    return arr[target];
    
  }
}
