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

  _checkInputValidity(popupElement, inputElement, errorClass, inputErrorClass) {
    const inputIsInvalid = !inputElement.validity.valid;
    const errorMessageElement = popupElement.querySelector(`#${inputElement.id}-error`);
    
    if (inputIsInvalid) {
      const errorMessageText = inputElement.validationMessage;
      this._setErrorMessage(errorMessageElement, errorMessageText, errorClass);
      inputElement.classList.add(inputErrorClass);
    } else {
      this._hideErrorMessage(errorMessageElement, errorClass);
      inputElement.classList.remove(inputErrorClass);
    };
  };

  _setEventListeners(config, popupElement) {
    const inputList = Array.from(popupElement.querySelectorAll(config.inputSelector));
    const buttonElement = popupElement.querySelector(config.submitButtonSelector);
  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(popupElement, inputElement, config.errorClass, config.inputErrorClass);
        this._toggleSubmitButton(inputList, buttonElement, config.inactiveButtonClass);
      });
    });
    // отключаем кнопку при вызове модального окна
    this._toggleSubmitButton(inputList, buttonElement, config.inactiveButtonClass);
  };

  resetAllErrors() {
    // сброс ошибки и состояния кнопки сабмита
    const errorInputList = Array.from(this._form.querySelectorAll('.popup__input_state_error'));
    const errorMessageList = Array.from(this._form.querySelectorAll('.popup__form-error_active'));
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);

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

    buttonElement.classList.add(this._config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  enableValidation() {
    // отменить стандартную отправку форм
    const formList = Array.from(document.querySelectorAll(this._config.formSelector));

    formList.forEach(popupElement => {
      // передать формы для навешивания обработчиков на ввод
      this._setEventListeners(this._config, popupElement);
    });
  };
}