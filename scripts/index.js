const popup = document.querySelector('.popup');
const editButton = document.querySelector('.button_type_edit');
const closeButton = popup.querySelector('.button_type_close');
const submitButton = popup.querySelector('.button_type_save');

// переменные для хранения текущего имени и описания профиля
let currentProfileTitle = document.querySelector('.profile__title');
let currentProfileSubtitle = document.querySelector('.profile__subtitle');

// выключатель окна редактирования профиля
const togglePopup = function () {
  popup.classList.toggle('popup_opened');
}

// вызвать окно редактирования профиля
const editButtonPressed = function () {
  let popupTitleField = popup.querySelector('.popup__text_type_title');
  let popupSubtitleField = popup.querySelector('.popup__text_type_subtitle');

  togglePopup();

  // вынести имя и описание профиля по умолчанию в текстовые поля попапа
  popupTitleField.value = currentProfileTitle.innerText;  
  popupSubtitleField.value = currentProfileSubtitle.innerText;
}

// сохранить изменения профиля и закрыть попап
const formSubmit = function () {
  let popupTitleField = popup.querySelector('.popup__text_type_title');
  let popupSubtitleField = popup.querySelector('.popup__text_type_subtitle');

  currentProfileTitle.textContent = popupTitleField.value;
  currentProfileSubtitle.textContent = popupSubtitleField.value;  
  
  togglePopup();
}

// закрыть форму по щелчку по затемнённой области
const popupCloseByClickOnOverlay = (event) => {
  if (event.target != event.currentTarget) {
    return;
  }
  togglePopup();
}

// отправка формы по нажатию Enter
const formSubmitByEnter = function (event) {
  if (event.keyCode !== 13) {
    return;
  }
  formSubmit();
}

document.addEventListener('keydown', formSubmitByEnter);
editButton.addEventListener('click', editButtonPressed);
closeButton.addEventListener('click', togglePopup);
submitButton.addEventListener('click', formSubmit);
popup.addEventListener('click', popupCloseByClickOnOverlay);
