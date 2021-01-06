import './index.css';

import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';
import {
  config,
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
  currentProfileSubtitle,
  contentSection,
  currentAvatar
} from '../utils/constants.js';

// инициализация API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: 'deb0aa6f-32ec-48b3-9746-6ea746dde45e',
    'Content-Type': 'application/json'
  }
});

// создание экземпляров модальных окон

const imagePopup = new PopupWithImage(viewerPopup);

// обработчик отправки формы обновления профиля

const handleProfileEditSubmit = () => {
  const updatedInfo = {
    name: titleField.value,
    about: subtitleField.value
  }

  api.updateUserInfo(updatedInfo.name, updatedInfo.about)
    .then(updatedInfo => {
      userInfo.setUserInfo(updatedInfo);
    });

  newEditPopup.close();
}

// создание экземпляра формы обновления профиля

const newEditPopup = new PopupWithForm({
  popupElement: editPopup,
  submitHandler: handleProfileEditSubmit
});

const handleCardAddSubmit = () => {
  const cardObj = {
    name: newPlaceField.value,
    link: newLinkField.value
  }


  api.sendNewCard(cardObj.link, cardObj.name)
    .then(() => {    
      const card = new Card({
        cardData: cardObj,
        handleCardClick: () => {
          imagePopup.open(cardObj.name, cardObj.link);
        }
      },
      '.card-template');

      contentSection.prepend(card.generateCard());
    });

  newAddPopup.close();
}

const newAddPopup = new PopupWithForm({
  popupElement: addPopup,
  submitHandler: handleCardAddSubmit
});

// инфо о пользователе

const userInfo = new UserInfo({
  titleElement: currentProfileTitle,
  subtitleElement: currentProfileSubtitle
});

// вызвать окно редактирования профиля
const toggleEditPopup = () => {
  const currentUserInfo = userInfo.getUserInfo();

  titleField.value = currentUserInfo.name;
  subtitleField.value = currentUserInfo.about;

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

// добавить слушатели событий

newEditPopup.setEventListeners();
newAddPopup.setEventListeners();
imagePopup.setEventListeners();

// ПРОГРУЗИТЬ НАЧАЛЬНЫЕ КАРТОЧКИ
// 1. получаем карточки с сервера
api.getInitialCards()
  .then(serverCards => {
    renderInitialCards(serverCards);    
  });

// 2. отрисовываем их

const renderInitialCards = serverCards => {
  const section = new Section(
    {
      items: serverCards,
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
    section.renderItems();
}

// валидация

const editPopupValidator = new FormValidator(config, editForm);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(config, addForm);
addPopupValidator.enableValidation();

// получить данные пользователя с сервера

api.getUserData()
  .then(userData => {
    currentAvatar.src = userData.avatar;
    currentProfileTitle.textContent = userData.name;
    currentProfileSubtitle.textContent = userData.about;  
  });

export { addForm, editForm }