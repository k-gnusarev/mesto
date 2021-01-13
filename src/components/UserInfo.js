export class UserInfo {
  constructor({ titleElement, subtitleElement, avatarElement }) {
    this._titleElement = titleElement;
    this._subtitleElement = subtitleElement;
    this._avatarElement = avatarElement;
  }

  getUserInfo() {
    return {
      name: this._titleElement.textContent,
      about: this._subtitleElement.textContent,
      avatar: this._avatarElement.src
    }
  }

  setUserInfo(userData) {
    this._titleElement.textContent = userData.name;
    this._subtitleElement.textContent = userData.about;
    this._avatarElement.src = userData.avatar;
  }
}