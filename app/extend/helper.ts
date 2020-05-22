import {v4 as UUID} from 'uuid'

export default {
  JSONParse: (data: any, defaultData: any = {}) => {
    try {
      return JSON.parse(data)
    }catch (e) {
      return defaultData
    }
  },
  getUUID() {
    return UUID();
  }
}
