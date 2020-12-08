import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { config, initialCards } from './data.js'

// ссылки на элементы формы редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = editPopup.querySelector('form[name="edit-profile"]');
const titleField = editPopup.querySelector('input[name="title"]');
const subtitleField = editPopup.querySelector('input[name="subtitle"]');

// ссылки на элементы формы добавления карточки
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector('form[name="add-place"]');
const newPlaceField = addPopup.querySelector('input[name="placeName"]');
const newLinkField = addPopup.querySelector('input[name="placeLink"]');

// ссылки на элементы просмотрщика фото 
const viewerPopup = document.querySelector('.popup_type_viewer');
const popupPhoto = viewerPopup.querySelector('.popup__photo');

// ссылки для текущих имени и описания профиля
const currentProfileTitle = document.querySelector('.profile__title');
const currentProfileSubtitle = document.querySelector('.profile__subtitle');

// прочие глобальные ссылки
const contentSection = document.querySelector('.content');

// добавить обработчики закрытия попапов

const addPopupCloseHandlers = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));

  popupList.forEach(popupElement => {
    popupElement.addEventListener('click', (evt) => {
      const eventTarget = evt.target;

      if (eventTarget.classList.contains('popup') || eventTarget.classList.contains('popup__close-button')) {
        closePopup(popupElement);
      }
    });
  });
}

// выключатели попапа

const closePopup = (target) => {
  target.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupByEsc);
}

const openPopup = (target) => {
  target.classList.add('popup_active');
  document.addEventListener('keydown', closePopupByEsc);
}

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
} 

// вызвать попап просмотра фото

const togglePhotoViewer = (link, title, alt) => {
  // передать атрибуты фотографий и заголовок фото
  popupPhoto.setAttribute('src', link);
  popupPhoto.setAttribute('alt', alt);
  viewerPopup.querySelector('.popup__photo-title').textContent = title;

  // сделать попап просмотра фото видимым 
  openPopup(viewerPopup);
}

// сохранить изменения профиля и закрыть попап
const submitEditForm = () => {
  currentProfileTitle.textContent = titleField.value;
  currentProfileSubtitle.textContent = subtitleField.value;
  closePopup(editPopup);
}

// вызвать окно редактирования профиля
const toggleEditPopup = () => {
  resetErrorMessages(editPopupValidator);

  // вписать в поля текущие значения имени и описания
  titleField.value = currentProfileTitle.textContent;
  subtitleField.value = currentProfileSubtitle.textContent;
  
  openPopup(editPopup);
}

// разместить новую карточку

const renderCard = (cardObj) => {
  const card = new Card(cardObj, '.card-template', togglePhotoViewer);
  const cardItem = card.generateCard();

  return cardItem;
}

const postNewCard = (cardItem) => {
  contentSection.prepend(cardItem);
}

const loadDefaultCards = (initialCardsList) => {
  initialCardsList.forEach((initialCardObj) => {
    postNewCard(renderCard(initialCardObj));
  });
}

// добавить новую карточку
const submitAddForm = () => {
  // передать значения полей в функцию для построения карточки
  const newPlace = newPlaceField.value;
  const newLink = newLinkField.value;

  postNewCard(renderCard({ name: newPlace, link: newLink }));
  closePopup(addPopup);
}

// вызвать окно добавления места
const toggleAddPopup = () => {
  const buttonElement = addForm.querySelector(config.submitButtonSelector);

  resetErrorMessages(addPopupValidator);
  addForm.reset();
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
  openPopup(addPopup);
}

const resetErrorMessages = (validator, form) => {
  validator.resetAllErrors(form);
}

// обработчик закрытия и отправки формы
editForm.addEventListener('submit', submitEditForm);

// обработчик отправки формы
addForm.addEventListener('submit', submitAddForm);

// обработчики формы редактирования профиля
editButton.addEventListener('click', toggleEditPopup);

// обработчики формы добавления карточки
addButton.addEventListener('click', toggleAddPopup);

// прогрузить начальные карточки
loadDefaultCards(initialCards);

// добавить обработчики закрытия попапов
addPopupCloseHandlers();

const editPopupValidator = new FormValidator(config, editForm);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(config, addForm);
addPopupValidator.enableValidation();