class QueueService {

  private readonly delay: number
  private queue: Array<() => void> = []
  private timer: NodeJS.Timer | null
  private timeoutTimer: any

  constructor(delay: number = 300) {
    this.delay = delay
  }

  public requestIdle() {
    return new Promise(this.run)
  }

  private run = (func: () => void) => {
    clearTimeout(this.timeoutTimer)
    if (this.timer) {
      this.queue.push(func)
    } else {
      func()
      this.timer = setInterval(() => {
        const func = this.queue.shift()
        if (func) {
          func()
        }
        if (this.queue.length === 0) {
          this.timeoutTimer = setTimeout(() => {
            if (this.queue.length === 0) {
              clearInterval(this.timer as NodeJS.Timer)
              this.timer = null
            }
          }, this.delay)
        }
      }, this.delay)
    }
  }


}

export default QueueService