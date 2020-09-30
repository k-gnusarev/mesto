// const params = {  
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_inactive',
//   errorClass: 'popup__form-error_active',
//   inputErrorClass: 'popup__input_state_error'
// }

// проверить валидность полей
const isInputInvalid = (inputList) => {  
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

const toggleSubmitButton = (inputList, buttonElement, inactiveButtonClass) => {
  // кнопка становится доступной только если все поля валидны
  if (isInputInvalid(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

const setErrorMessage = (errorMessageElement, errorMessageText, errorClass) => {
  errorMessageElement.textContent = errorMessageText;
  errorMessageElement.classList.add(errorClass);
}

const hideErrorMessage = (errorMessageElement, errorClass) => {
  errorMessageElement.textContent = '';
  errorMessageElement.classList.remove(errorClass);
}

const checkInputValidity = (popupElement, inputElement, errorClass, inputErrorClass) => {
  const inputIsInvalid = !inputElement.validity.valid;
  const errorMessageElement = popupElement.querySelector(`#${inputElement.id}-error`);
  
  if (inputIsInvalid) {
    const errorMessageText = inputElement.validationMessage;
    setErrorMessage(errorMessageElement, errorMessageText, errorClass);
    inputElement.classList.add(inputErrorClass);
  } else {
    hideErrorMessage(errorMessageElement, errorClass);
    inputElement.classList.remove(inputErrorClass);
  };
}

const setEventListeners = (
  popupElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass,
  inputErrorClass) => {
  const inputList = Array.from(popupElement.querySelectorAll(inputSelector));
  const buttonElement = popupElement.querySelector(submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(popupElement, inputElement, errorClass, inputErrorClass);
      toggleSubmitButton(inputList, buttonElement, inactiveButtonClass);
    });
  });
  // отключаем кнопку при вызове модального окна
  toggleSubmitButton(inputList, buttonElement, inactiveButtonClass);
}

const enableValidation = ({  
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass,
  inputErrorClass
}) => {
  // отменить стандартную отправку форм
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(popupElement => {
    popupElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    // передать формы для навешивания обработчиков на ввод
    setEventListeners(
      popupElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      errorClass,
      inputErrorClass);
  });
}

// включить валидацию форм в начале страницы
enableValidation({  
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  errorClass: 'popup__form-error_active',
  inputErrorClass: 'popup__input_state_error'
});