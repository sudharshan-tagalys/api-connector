import configuration from "./configuration"
class LocalStorage{
  getItem(key: string) {
    const item = window.localStorage.getItem(this.getNamespacedKey(key))
    const parsedItem = item ? JSON.parse(item) : null
    if (parsedItem) {
      if (parsedItem.hasOwnProperty("expiry") && this.getCurrentTime() >= parsedItem.expiry) {
        this.removeItem(key)
        return null
      }
      return parsedItem.value
    }
    return null
  }

  removeItem(key: string) {
    window.localStorage.removeItem(this.getNamespacedKey(key))
  }
  // accept 1-h/1-ms instead of raw ttl
  setValue(key: string, value: any, ttl?: number) {
    let valueToStore: any = {
      value: value,
    }
    if (ttl) {
      valueToStore.expiry = this.getCurrentTime() + ttl
    }
    return window.localStorage.setItem(this.getNamespacedKey(key), JSON.stringify(valueToStore))
  }

  getCurrentTime() {
    return new Date().getTime()
  }

  getNamespacedKey(key) {
    return `${key}:${configuration.getClientCode()}:${configuration.getStoreId()}`
  }
}
export default new LocalStorage()