import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

function saveToLocalStorage() {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
  //привели объект к строке
}
//функция saveToLocalStorage, которая будет сохранять введенные пользователем данные в localStorage

function loadFromLocalStorage() {
  const savedFormState = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );
  if (savedFormState) {
    emailInput.value = savedFormState.email;
    messageInput.value = savedFormState.message;
  }
}
//функция loadFromLocalStorage загружает сохраненные данные из localStorage и заполняет ими поля формы

window.addEventListener('load', loadFromLocalStorage);

messageInput.addEventListener('input', throttle(saveToLocalStorage, 500));

//обработчики события input для полей email и message, которые будут вызывать функцию saveToLocalStorage с задержкой в 500 миллисекунд

form.addEventListener('submit', evt => {
  evt.preventDefault();
  localStorage.removeItem('feedback-form-state');
  console.log({
    "email": emailInput.value,
    "message": messageInput.value,
  });

  emailInput.value = '';
  messageInput.value = '';


  
});

// обработчик события submit для формы, который будет очищать localStorage и поля формы, а также выводить объект с полями email и message и их значениями в консоль
