export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = this._popupElement.querySelector('.popup__close-button');
    this._submitButton = this._popupElement.querySelector('.popup__submit-button');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  
  open() {
    this._popupElement.classList.add('popup_active');

    // установить обработчик открытия по Esc
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_active');

    // снять обработчик закрытия по Esc
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    // обработчик закрытия по крестику
    this._closeButton.addEventListener('click', () => { this.close() });

    // обработчик закрытия по оверлею
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}