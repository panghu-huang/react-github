class NumberUtils {

  /**
   * 格式化成英文格式（三位一逗号）
   * @param num 数字
   */
  public static formatBigNumber(num: number) {
    if (num) {
      const stringify = String(num)
      if (stringify.length > 3) {
        const startIndex = stringify.length % 3
        const count = Math.floor(stringify.length / 3)
        const result = [stringify.slice(0, startIndex)]
        for (let i = 0; i < count; i++) {
          result.push(
            stringify.slice(i * 3 + startIndex, (i + 1) * 3 + startIndex)
          )
        }
        return result.filter(Boolean).join(',')
      }
    }
    return num
  }
}

export default NumberUtils