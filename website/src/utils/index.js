export function formatMoney(money) {
  /**
   * @type {string}
   */
  let stringedMoney = money.split('');

  switch (stringedMoney.length) {
    case 4:
      stringedMoney[0] = `${stringedMoney[0]},`;
      return stringedMoney;
    case 5:
      stringedMoney[1] = `${stringedMoney[1]},`;
      return stringedMoney;
    case 6:
      stringedMoney[2] = `${stringedMoney[2]},`;
      return stringedMoney;
    case 7:
      stringedMoney[0] = `${stringedMoney[0]},`;
      stringedMoney[3] = `${stringedMoney[3]},`;
      return stringedMoney;
    default:
      return stringedMoney;
  }
}

/**
 *
 * @param {Date} date
 * @returns
 */
export function formatDate(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
