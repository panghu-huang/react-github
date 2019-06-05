import { stringify as queryStringify } from 'querystring'
import QueueService from './QueueService'

const queue = new QueueService(500)

const enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type OptionsGetter = (path: string, method: string) => object

interface IOptions {
  path?: string
  data?: object
  headers?: Record<string, string>
  mode?: 'same-origin' | 'cors' | 'navigate' | 'no-cors'
}

interface IFetchOptions extends IOptions {
  method: Method
}

interface IConfigOptions {
  baseUrl?: string
  getOptions?: OptionsGetter
}

class ApiService<T = any> {

  public static baseUrl: string
  public static getOptions: OptionsGetter

  public static config(options: IConfigOptions) {
    Object.keys(options).forEach((optionName: string) => {
      ApiService[optionName] = options[optionName]
    })
  }

  private readonly apiUrl: string

  constructor(routeName: string, baseUrl?: string) {
    this.apiUrl = `${baseUrl || ApiService.baseUrl}/${routeName}`
  }

  public get(opts?: IOptions) {
    return this.fetch({ ...opts, method: Method.GET })
  }

  public post(opts?: IOptions) {
    return this.fetch({ ...opts, method: Method.POST })
  }

  public put(opts?: IOptions) {
    return this.fetch({ ...opts, method: Method.PUT })
  }

  public patch(opts?: IOptions) {
    return this.fetch({ ...opts, method: Method.PATCH })
  }

  public delete(opts?: IOptions) {
    return this.fetch({ ...opts, method: Method.DELETE })
  }

  public async fetch(opts: IFetchOptions): Promise<T> {
    await queue.requestIdle()
    const url = this.getUrl(opts)
    const options = this.getOptions(opts, url)
    const response = await fetch(url, options)
    const responseText = await response.text()
    const json = this.parseToJson(responseText)
    if (!response.ok || json.success === false) {
      throw new Error(json ? json.message : responseText)
    }
    return json ? json : responseText
  }

  private parseToJson(str: string) {
    try {
      return JSON.parse(str)
    } catch (error) {
      return null
    }
  }

  private getUrl(opts: IFetchOptions): string {
    const url = opts.path
      ? `${this.apiUrl}/${opts.path}`
      : this.apiUrl
    if (opts.method !== Method.GET || !opts.data) {
      return url
    }
    return url + `?${queryStringify(opts.data as any)}`
  }

  private getOptions(originalOpts: IFetchOptions, url: string): RequestInit {
    const { getOptions } = ApiService
    return {
      ...(getOptions ? getOptions(url, originalOpts.method) : {}),
      ...originalOpts,
      body: this.getRequestBody(originalOpts),
    }
  }

  private getRequestBody(opts: IFetchOptions) {
    if (opts.method === Method.GET || !opts.data) {
      return null
    }
    return JSON.stringify(opts.data)
  }

}

export default ApiService
