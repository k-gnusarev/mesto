export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._button = this._form.querySelector(this._config.submitButtonSelector);
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

  _checkInputValidity(form, inputElement, errorClass) {
    const inputIsInvalid = !inputElement.validity.valid;
    const errorMessageElement = form.querySelector(`#${inputElement.id}-error`);

    if (inputIsInvalid) {
      const errorMessageText = inputElement.validationMessage;
      this._setErrorMessage(errorMessageElement, errorMessageText, errorClass);
    } else {
      this._hideErrorMessage(errorMessageElement, errorClass);
    };
  };

  _setEventListeners(config, form) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(form, inputElement, config.errorClass, config.inputErrorClass);
        this._toggleSubmitButton(inputList, this._button, config.inactiveButtonClass);
      });
    });
    // отключаем кнопку при вызове модального окна
    this._toggleSubmitButton(inputList, this._button, config.inactiveButtonClass);
  };

  resetAllErrors() {
    // сброс ошибки и состояния кнопки сабмита
    const errorInputList = Array.from(this._form.querySelectorAll('.popup__input_state_error'));
    const errorMessageList = Array.from(this._form.querySelectorAll('.popup__form-error_active'));

    if (errorInputList.length > 0) {
      errorInputList.forEach(errorInputItem => {
        errorInputItem.classList.remove(this._config.errorClass)
      });
    };

    if (errorMessageList.length > 0) {
      errorMessageList.forEach(errorMessageItem => {
        errorMessageItem.classList.remove(this._config.errorClass)
      });
    };

    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.setAttribute('disabled', true);
  }

  enableValidation() {
    this._setEventListeners(this._config, this._form);
  };
}