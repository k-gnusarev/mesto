const popup = document.querySelector('.popup');
const popupHeader = document.querySelector('.popup__title');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const likeButton = document.querySelector('.card__like-button');
const closeButton = popup.querySelector('.popup__close-button');
const submitButton = popup.querySelector('.popup__submit-button');
const editForm = document.querySelector('.popup__form');

// переменные для полей попапа
let popupTitleField = popup.querySelector('input[name="title"]');
let popupSubtitleField = popup.querySelector('input[name="subtitle"]');

// переменные для текущих имени и описания профиля
let currentProfileTitle = document.querySelector('.profile__title');
let currentProfileSubtitle = document.querySelector('.profile__subtitle');

// объект, в котором хранятся свойства попапа
const popupProperties = {
  headingText: '',
  titleFieldPlaceholder: '',
  subtitleFieldPlaceholder: '',
  submitText: ''
}

// изначальные карточки

const initialCards = [
  {
    name: 'Семук-Чампей',
    link: 'https://images.unsplash.com/photo-1525454240972-e37288888ff0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
    altText: 'На фото: вид с высоты на долину реки'
  },
  {
    name: 'Антигуа-Гватемала',
    link: 'https://images.unsplash.com/photo-1563442744-3e17a3bf4932?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE0MjB9&auto=format&fit=crop&w=1950&q=80',
    altText: 'На фото: колониальный город с видом на вулкан'
  },
  {
    name: 'Вулкан Фуэго',
    link: 'https://images.unsplash.com/photo-1506467493604-25d7861a6703?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
    altText: 'На фото: вид на извергающийся вулкан'
  },
  {
    name: 'Тикаль',
    link: 'https://images.unsplash.com/photo-1508035460735-91088c495500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
    altText: 'На фото: руины индейских пирамид'
  },
  {
    name: 'Озеро Атитлан',
    link: 'https://images.unsplash.com/photo-1528543010705-e7e75169b717?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
    altText: 'На фото: вид на озеро с вулканом на фоне'
  },
  {
    name: 'Остров Флорес',
    link: 'https://images.unsplash.com/photo-1544527232-c8738c8cb2cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
    altText: 'На фото: вид на город с воды'
  }
];

// прогрузить начальные карточки
initialCards.forEach((place) => {
  // скопировать новый элемент из темплейта
  const cardTemplate = document.querySelector('.card-template').content;
  const cardItem = cardTemplate.cloneNode(true);

  // вписать соответствующие данные карточки
  cardItem.querySelector('.card__title').textContent = place.name;
  cardItem.querySelector('.card__photo').setAttribute('src', place.link);  
  cardItem.querySelector('.card__photo').setAttribute('alt', place.altText);

  // разместить карточки
  document.querySelector('.content').append(cardItem);
});

// закрытие окна по окончанию анимации
const popupClose = () => {  
  popup.classList.toggle('popup_state_closed');
  popup.classList.toggle('popup_state_opened');
  popup.removeAttribute('style');
  popup.removeEventListener('animationend', popupClose);
  popupTitleField.value = '';  
  popupSubtitleField.value = '';
} 

// выключатель окна редактирования профиля
const togglePopup = () => {
  if (popup.classList.value.includes('popup_state_closed')) {
    popup.classList.toggle('popup_state_opened');
    popup.classList.toggle('popup_state_closed');
  } else {
    // подождать окончания анимации, затем убрать попап
    popup.style.animation = 'hidePopup .2s linear forwards';
    popup.addEventListener('animationend', popupClose);
  }

  // задать свойства полей, соответствующие функции попапа
  popupHeader.textContent = popupProperties.headingText;
  popupTitleField.setAttribute('placeholder', popupProperties.titleFieldPlaceholder);
  popupSubtitleField.setAttribute('placeholder', popupProperties.subtitleFieldPlaceholder);
  submitButton.textContent = popupProperties.submitText;
}


// вызвать окно редактирования профиля
const editButtonPressed = function () {
  popupProperties.headingText = 'Редактировать профиль';  
  popupProperties.titleFieldPlaceholder = 'Имя профиля';  
  popupProperties.subtitleFieldPlaceholder = 'Описание профиля';
  popupProperties.submitText = 'Сохранить';

  togglePopup();

  // вынести имя и описание профиля по умолчанию в текстовые поля попапа
  popupTitleField.value = currentProfileTitle.innerText;  
  popupSubtitleField.value = currentProfileSubtitle.innerText;
}

// вызвать окно добавления места
const addButtonPressed = function () {  
  popupProperties.headingText = 'Новое место';  
  popupProperties.titleFieldPlaceholder = 'Название';  
  popupProperties.subtitleFieldPlaceholder = 'Ссылка на картинку';
  popupProperties.submitText = 'Создать';

  togglePopup();
}

// сохранить изменения профиля и закрыть попап
const formSubmit = function (event) {
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

// поставить/убрать лайк

const toggleLike = function () {
  likeButton.classList.toggle('card__like-button_active');
}

//likeButton.addEventListener('click', toggleLike);
editButton.addEventListener('click', editButtonPressed);
addButton.addEventListener('click', addButtonPressed);
closeButton.addEventListener('click', togglePopup);
editForm.addEventListener('submit', formSubmit);
popup.addEventListener('click', popupCloseByClickOnOverlay);
