export class FormValidator {
  constructor (config, form) {
    this._config = config;
    this._form = form;
  }

  _isInputInvalid = (inputList) => {  
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleSubmitButton(inputList, buttonElement, inactiveButtonClass) {
    if (this._isInputInvalid(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  _setErrorMessage(errorMessageElement, errorMessageText, errorClass) {
    errorMessageElement.textContent = errorMessageText;
    errorMessageElement.classList.add(errorClass);
  };

  _hideErrorMessage(errorMessageElement, errorClass) {
    errorMessageElement.textContent = '';
    errorMessageElement.classList.remove(errorClass);
  };

  _checkInputValidity(formElement, inputElement, errorClass, inputErrorClass) {
    const inputIsInvalid = !inputElement.validity.valid;
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    
    if (inputIsInvalid) {
      const errorMessageText = inputElement.validationMessage;
      this._setErrorMessage(errorMessageElement, errorMessageText, errorClass);
      inputElement.classList.add(inputErrorClass);
    } else {
      this._hideErrorMessage(errorMessageElement, errorClass);
      inputElement.classList.remove(inputErrorClass);
    };
  };

  _setEventListeners(config, formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, config.errorClass, config.inputErrorClass);
        this._toggleSubmitButton(this._inputList, this._buttonElement, config.inactiveButtonClass);
      });
    });
    // отключаем кнопку при вызове модального окна
    this._toggleSubmitButton(this._inputList, this._buttonElement, config.inactiveButtonClass);
  };

  resetAllErrors() {
    const errorInputList = Array.from(this._form.querySelectorAll('.popup__input_state_error'));
    const errorMessageList = Array.from(this._form.querySelectorAll('.popup__form-error_active'));

    if (errorInputList.length > 0) {
      errorInputList.forEach(errorInputItem => {
        errorInputItem.classList.remove(inputErrorClass)
      });
    };

    if (errorMessageList.length > 0) {
      errorMessageList.forEach(errorMessageItem => {
        errorMessageItem.classList.remove(errorClass)
      });
    };
  }

  enableValidation() {
    // отменить стандартную отправку форм
    const formList = Array.from(document.querySelectorAll(this._config.formSelector));

    this._form.addEventListener('submit', evt => { evt.preventDefault() });
    this._setEventListeners(this._config, this._form);
  };
}