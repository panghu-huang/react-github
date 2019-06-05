import * as moment from 'moment'

export default class TimeUtils {

  public static fromNow(time: string) {
    return moment(time).endOf().fromNow()
  }
}