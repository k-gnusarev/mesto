const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  errorClass: 'popup__form-error_active',
  inputErrorClass: 'popup__input_state_error'
};

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

export { config, initialCards }