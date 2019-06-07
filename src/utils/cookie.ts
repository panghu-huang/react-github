interface IOptions {
  name: string
  value: string
  expires?: Date
  domain?: string
}

/**
 * Cookie 工具类
 */
class CookieUtils {

  /**
   * 设置 Cookie
   * @param cookieOptions cookie 选项
   */
  public static setCookie({ name, value, expires, domain }: IOptions) {
    const data = [`${name}=${value}`]
    if (expires) {
      data.push(`expires=${expires.toUTCString()}`)
    }
    if (domain) {
      data.push(`domain=${domain}`)
    }
    document.cookie = data.join(';')
  }

  /**
   * 获取 cookie
   * @param name cookie 名称
   */
  public static getCookie(name: string): string | null {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
    const arr = document.cookie.match(reg)
    return arr ? unescape(arr[2]) : null
  }

  /**
   * 移除 Cookie
   * @param name cookie 名称
   */
  public static removeCookie(name: string) {
    const before = new Date(Date.now() - 1000)
    document.cookie = `${name}=;expires=${before.toUTCString()}`
  }

}

export default CookieUtils
