const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const editForm = document.querySelector('.popup__form');

// переменные для полей попапа
let popupTitleField = popup.querySelector('input[name="title"]');
let popupSubtitleField = popup.querySelector('input[name="subtitle"]');

// переменные для текущих имени и описания профиля
let currentProfileTitle = document.querySelector('.profile__title');
let currentProfileSubtitle = document.querySelector('.profile__subtitle');

// выключатель окна редактирования профиля
const togglePopup = function () {
  popup.classList.toggle('popup_opened');
}

// вызвать окно редактирования профиля
const editButtonPressed = function () {
  togglePopup();

  // вынести имя и описание профиля по умолчанию в текстовые поля попапа
  popupTitleField.value = currentProfileTitle.innerText;  
  popupSubtitleField.value = currentProfileSubtitle.innerText;
}

// сохранить изменения профиля и закрыть попап
let formSubmit = function (event) {
  event.preventDefault();

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

editButton.addEventListener('click', editButtonPressed);
closeButton.addEventListener('click', togglePopup);
editForm.addEventListener('submit', formSubmit);
popup.addEventListener('click', popupCloseByClickOnOverlay);
