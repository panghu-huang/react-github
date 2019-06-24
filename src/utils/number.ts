class NumberUtils {

  /**
   * 格式化成英文格式（三位一逗号）
   * @param num 数字
   */
  public static formatBigNumber(num: number) {
    const unitLength = 3
    if (num) {
      const stringify = String(num)
      if (stringify.length > unitLength) {
        const startIndex = stringify.length % unitLength
        const count = Math.floor(stringify.length / unitLength)
        const result = [stringify.slice(0, startIndex)]
        for (let i = 0; i < count; i++) {
          result.push(
            stringify.slice(
              i * unitLength + startIndex,
              (i + 1) * unitLength + startIndex
            )
          )
        }
        return result.filter(Boolean).join(',')
      }
    }
    return num
  }
}

export default NumberUtils
