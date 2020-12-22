import './index.css';

import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  config,
  initialCards,
  editButton,
  editPopup,
  editForm,
  titleField,
  subtitleField,
  addButton,
  addPopup,
  addForm,
  newPlaceField,
  newLinkField,
  viewerPopup,
  currentProfileTitle,
  currentProfileSubtitle
} from '../utils/constants.js';

// создание экземпляров модальных окон

const imagePopup = new PopupWithImage(viewerPopup);

const newEditPopup = new PopupWithForm({
  popupElement: editPopup,
  submitHandler: () => {
    userInfo.setUserInfo({
      title: titleField.value,
      subtitle: subtitleField.value
    });

    newEditPopup.close();
  }
});

const newAddPopup = new PopupWithForm({
  popupElement: addPopup,
  submitHandler: () => {
    const cardObj = {
      name: newPlaceField.value,
      link: newLinkField.value
    }

    const card = new Card({
      cardData: cardObj,
      handleCardClick: () => {
        imagePopup.open(cardObj.link, cardObj.name);
      }
    },
    '.card-template');

    section.addItem(card.generateCard());
  
    newAddPopup.close();
  }
});

// отрисовка карточек на странице

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card({
        cardData: item,
        handleCardClick: () => {
          imagePopup.open(item.link, item.name);
        }
      },
      '.card-template');
      section.addItem(card.generateCard());
    }
  },
  '.content');

// инфо о пользователе

const userInfo = new UserInfo({
  titleElement: currentProfileTitle,
  subtitleElement: currentProfileSubtitle
});

// вызвать окно редактирования профиля
const toggleEditPopup = () => {
  const currentUserInfo = userInfo.getUserInfo();

  titleField.value = currentUserInfo.title;
  subtitleField.value = currentUserInfo.subtitle;

  editPopupValidator.resetAllErrors();
  
  newEditPopup.open();
}

// вызвать окно добавления места
const toggleAddPopup = () => {
  addForm.reset();
  addPopupValidator.resetAllErrors();
  newAddPopup.open();
}

// вызов формы редактирования профиля
editButton.addEventListener('click', toggleEditPopup);

// вызов формы добавления карточки
addButton.addEventListener('click', toggleAddPopup);

newEditPopup.setEventListeners();
newAddPopup.setEventListeners();
imagePopup.setEventListeners();

// прогрузить начальные карточки
section.renderItems();

// валидация

const editPopupValidator = new FormValidator(config, editForm);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(config, addForm);
addPopupValidator.enableValidation();

// добавить обработчики закрытия попапов

export { addForm, editForm }