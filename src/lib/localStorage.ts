class LocalStorage{
  getItem(key: string) {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : ""
  }
  setValue(key: string, value: string) {
    return window.localStorage.setItem(key, JSON.stringify(value))
  }
}
export default new LocalStorage()