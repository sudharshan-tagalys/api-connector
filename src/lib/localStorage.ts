class LocalStorage{
  getItem(key: string) {
    const item = window.localStorage.getItem(key)
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
    window.localStorage.removeItem(key)
  }
  // accept 1-h/1-ms instead of raw ttl
  setValue(key: string, value: string, ttl?: number) {
    let valueToStore: any = {
      value: value,
    }
    if (ttl) {
      valueToStore.expiry = this.getCurrentTime() + ttl
    }
    return window.localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  getCurrentTime() {
    return new Date().getTime()
  }
}
export default new LocalStorage()