import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupElement = popupElement;
  }

  open(link, title) {
    super.open();
    this._photo = this._popupElement.querySelector('.popup__photo');

    this._photo.setAttribute('src', link);
    this._photo.setAttribute('alt', `На фото: ${title}`);
    this._popupElement.querySelector('.popup__photo-title').textContent = title;
  }
}