export class UserInfo {
  constructor({ titleElement, subtitleElement }) {
    this._titleElement = titleElement;
    this._subtitleElement = subtitleElement;
  }

  getUserInfo() {
    return {
      title: this._titleElement.textContent,
      subtitle: this._subtitleElement.textContent
    }
  }

  setUserInfo(userData) {
    this._titleElement.textContent = userData.title;
    this._subtitleElement.textContent = userData.subtitle;
  }
}