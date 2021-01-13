import { Popup } from './Popup.js';

export class PopupConfirm extends Popup {
  constructor({ popupElement, submitHandler }) {
    super(popupElement);
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._form = this._popupElement.querySelector('.popup__form');
    this._form.addEventListener('submit', evt => {      
      this._submitHandler(evt, this._element);
    });
  }

  open(element) {
    // this._element - любой элемент, передаваемый на обработку классом
    this._element = element;
    super.open();
  }
}