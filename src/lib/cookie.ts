const randomId = (length: number) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

class Cookie{
  isEnabled() {
    let cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled){
        document.cookie = "testcookie";
        cookieEnabled = document.cookie.indexOf("testcookie")!=-1;
    }
    return cookieEnabled;
  }

  batchUpdate(cookies) {
    cookies.forEach(cookie => this.update(cookie))
  }

  update({ name, value = "", expiryTime }) {
    let cookieValue = this.get(name)
    if (cookieValue === "") {
      cookieValue = randomId(32)
    }
    this.set(name, cookieValue, expiryTime)
  }

  get(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) {
        let cvalue = c.substring(name.length, c.length);
        cvalue = cvalue.replace(/%3B/g, ';');
        return cvalue
      }
    }
    return "";
  }

  set(cname, cvalue, expiryTime) {
    let d = new Date();
    d.setTime(d.getTime() + expiryTime);
    const expires = "expires="+d.toUTCString();
    cvalue = cvalue.replace(/;/g, '%3B');
    if (window.location.hostname.indexOf('.') === -1) {
      document.cookie = cname + "=" + cvalue + "; " + expires + "; " + "path=/; " + "domain=" + window.location.hostname;
    } else {
      document.cookie = cname + "=" + cvalue + "; " + expires + "; " + "path=/; " + "domain=." + window.location.hostname;
    }
  }

  delete(name) {
    this.set(name, "", -1)
  }

  batchDelete(cookies) {
    cookies.forEach(cookie => this.delete(cookie))
  }
}
export default new Cookie()