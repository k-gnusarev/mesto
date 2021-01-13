import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor ({ popupElement, submitHandler }) {
    super(popupElement);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this._formValues = {};
  
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  renderLoading(caption) {
    this._submitButton.textContent = caption;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}