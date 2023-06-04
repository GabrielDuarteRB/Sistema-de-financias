export default ({ app }, inject) => {
    const saveCookie = function (key, value, secondsToExpire) {
      const daysToExpire = secondsToExpire / (24 * 60 * 60);
      const date = new Date()
      date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`
      document.cookie = `${key}=${value};${expires};path=/`
    }
  inject('saveCookie', saveCookie);
}