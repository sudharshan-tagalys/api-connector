class LocalStorage{
  getItem(key: string) {
    const item = window.localStorage.getItem(key)
    const parsedItem = item ? JSON.parse(item) : ""
    if (parsedItem) {
      if (parsedItem.hasOwnProperty("expiry") && parsedItem.expiry <= this.getCurrentTime()) {
        this.removeItem(key)
        return null
      }
      return parsedItem.value
    }
    return ""
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key)
  }
  setValue(key: string, value: string, ttl?: number) {
    let valueToStore: any= {
      value: value,
    }
    console.log(ttl)
    if (ttl) {
      const now = new Date()
      valueToStore.expiry = now.getTime() + ttl
    }
    return window.localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  getCurrentTime() {
    return new Date().getTime()
  }
}
export default new LocalStorage()