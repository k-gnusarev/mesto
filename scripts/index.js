// ссылки на элементы формы редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.popup__form_type_edit');
const editPopupCloseButton = editPopup.querySelector('.popup__close-button');

// ссылки на элементы формы добавления карточки
const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup__form_type_add');
const addPopupCloseButton = addPopup.querySelector('.popup__close-button');

const likeButton = document.querySelector('.card__like-button');

// переменные для полей попапа редактирования профиля
const popupTitleField = editPopup.querySelector('input[name="title"]');
const popupSubtitleField = editPopup.querySelector('input[name="subtitle"]');

// переменные для текущих имени и описания профиля
const currentProfileTitle = document.querySelector('.profile__title');
const currentProfileSubtitle = document.querySelector('.profile__subtitle');

// переменные для полей попапа добавления места
const newPlaceTitleField = addPopup.querySelector('input[name="placeName"]');
const newLinkSubtitleField = addPopup.querySelector('input[name="placeLink"]');

// изначальные карточки

const initialCards = [
  {
    name: 'Семук-Чампей',
    link: 'https://images.unsplash.com/photo-1525454240972-e37288888ff0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
  },
  {
    name: 'Антигуа-Гватемала',
    link: 'https://images.unsplash.com/photo-1563442744-3e17a3bf4932?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE0MjB9&auto=format&fit=crop&w=1950&q=80',
  },
  {
    name: 'Вулкан Фуэго',
    link: 'https://images.unsplash.com/photo-1506467493604-25d7861a6703?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
  },
  {
    name: 'Тикаль',
    link: 'https://images.unsplash.com/photo-1508035460735-91088c495500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
  },
  {
    name: 'Озеро Атитлан',
    link: 'https://images.unsplash.com/photo-1528543010705-e7e75169b717?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
  },
  {
    name: 'Остров Флорес',
    link: 'https://images.unsplash.com/photo-1544527232-c8738c8cb2cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
  }
];

// выключатель попапа
const togglePopup = (target) => {
  if
  ((target === editButton && !editPopup.classList.value.includes('popup_active')) ||
  (target === editPopupCloseButton && editPopup.classList.value.includes('popup_active'))  
  ) {
    editPopup.classList.toggle('popup_active');
  }
  else if
  ((target === addButton && !addPopup.classList.value.includes('popup_active')) ||
  (target === addPopupCloseButton && addPopup.classList.value.includes('popup_active'))   
  ) {
    addPopup.classList.toggle('popup_active');
  }
}

// вызвать окно редактирования профиля
const toggleEditPopup = (evt) => {
  togglePopup(evt.target);
  // вынести имя и описание профиля по умолчанию в текстовые поля попапа
  popupTitleField.value = currentProfileTitle.innerText;  
  popupSubtitleField.value = currentProfileSubtitle.innerText;
}

// передать изменения информации профиля
const saveProfileChanges = () => {
  currentProfileTitle.textContent = popupTitleField.value;
  currentProfileSubtitle.textContent = popupSubtitleField.value;
}

// вызвать окно добавления места
const toggleAddPopup = (evt) => {
  togglePopup(evt.target);
}

// удалить карточку

const deleteCard = (card) => {
  console.log(document.querySelectorAll('.card')); 
}



// разместить новую карточку

const renderCard = (place, link) => {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardItem = cardTemplate.cloneNode(true);

  cardItem.querySelector('.card__title').textContent = place;
  cardItem.querySelector('.card__photo').setAttribute('src', link);

  // установить кнопку лайка
  cardItem.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  // установить кнопку удаления
  cardItem.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    evt.target.parentNode.remove(); 
  });
  document.querySelector('.content').prepend(cardItem);
}

// прогрузить начальные карточки
initialCards.forEach(defaultCard => renderCard(defaultCard.name, defaultCard.link));

// добавить новую карточку
const submitAddForm = (evt) => {
  evt.preventDefault();
  const newPlace = newPlaceTitleField.value;
  const newLink = newLinkSubtitleField.value;

  renderCard(newPlace, newLink);
  
  addPopup.classList.toggle('popup_active');

  newPlaceTitleField.value = '';
  newLinkSubtitleField.value = '';
};

// сохранить изменения профиля и закрыть попап
const submitEditForm = (event) => {
  event.preventDefault();
  saveProfileChanges();  
  editPopup.classList.toggle('popup_active');
}

const popupCloseByClickOnOverlay = (evt) => {
  if (evt.target === editPopup) {
    editPopup.classList.toggle('popup_active');
  } else if (evt.target === addPopup) {
    addPopup.classList.toggle('popup_active');
  }
}

// обработчики формы редактирования профиля
editButton.addEventListener('click', toggleEditPopup);
editPopupCloseButton.addEventListener('click', toggleEditPopup);
editPopup.addEventListener('click', popupCloseByClickOnOverlay);
editForm.addEventListener('submit', submitEditForm);

// обработчики формы добавления карточки
addButton.addEventListener('click', toggleAddPopup);
addPopupCloseButton.addEventListener('click', toggleAddPopup);
addPopup.addEventListener('click', popupCloseByClickOnOverlay);
addForm.addEventListener('submit', submitAddForm);
