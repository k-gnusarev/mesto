export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add('popup_active');
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove('popup_active');

    // снять обработчики
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.removeEventListener('click', this._handleOverlayClick.bind(this))
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
  }
}