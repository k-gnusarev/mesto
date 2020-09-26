const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__form-error',
  errorClass: 'popup__form-error_active'
}

// проверить валидность полей
const isInputInvalid = (inputList) => {  
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

const toggleSubmitButton = (inputList, buttonElement) => {
  // кнопка становится доступной только если все поля валидны
  if (isInputInvalid(inputList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

const setErrorMessage = (errorMessageElement, errorMessageText) => {
  errorMessageElement.textContent = errorMessageText;
  errorMessageElement.classList.add(params.errorClass);
}

const hideErrorMessage = (errorMessageElement) => {
  errorMessageElement.textContent = '';
  errorMessageElement.classList.remove(params.errorClass);
}

const checkInputValidity = (popupElement, inputElement) => {
  const inputIsInvalid = !inputElement.validity.valid;
  const errorMessageElement = popupElement.querySelector(`#${inputElement.id}-error`);
  
    if (inputIsInvalid) {
    const errorMessageText = inputElement.validationMessage;
    setErrorMessage(errorMessageElement, errorMessageText);
  } else {
    hideErrorMessage(errorMessageElement);
  };
}

const setEventListeners = (popupElement, params) => {
  const inputList = Array.from(popupElement.querySelectorAll(params.inputSelector));
  const buttonElement = popupElement.querySelector(params.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(popupElement, inputElement);
      toggleSubmitButton(inputList, buttonElement);
    });
  });
  // отключаем кнопку при вызове модального окна
  toggleSubmitButton(inputList, buttonElement);
}

const enableValidation = (params) => {
  // отменить стандартную отправку форм
  const formList = Array.from(document.querySelectorAll(params.formSelector));

  formList.forEach(popupElement => {
    popupElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    // передать формы для навешивания обработчиков на ввод
    setEventListeners(popupElement, params);
  });
}

// включить валидацию форм в начале страницы
enableValidation(params)