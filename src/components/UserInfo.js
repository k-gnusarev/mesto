export class UserInfo {
  constructor({ titleElement, subtitleElement }) {
    this._titleElement = titleElement;
    this._subtitleElement = subtitleElement;
  }

  getUserInfo() {
    return {
      name: this._titleElement.textContent,
      about: this._subtitleElement.textContent
    }
  }

  setUserInfo(userData) {
    this._titleElement.textContent = userData.name;
    this._subtitleElement.textContent = userData.about;
  }
}