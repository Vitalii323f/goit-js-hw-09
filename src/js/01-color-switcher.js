const refs = {
  bodyBG: document.querySelector('body'),
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};

refs.buttonStart.addEventListener('click', onStartBtnClick);
refs.buttonStop.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeBgColor() {
  const startBgColor = getRandomHexColor();
  refs.bodyBG.style.backgroundColor = startBgColor;
}

let timerId = null;
refs.buttonStop.setAttribute('disabled', true);

function onStartBtnClick() {
  timerId = setInterval(() => {
    onChangeBgColor();
  }, 1000);
  refs.buttonStart.setAttribute('disabled', true);
  refs.buttonStop.removeAttribute('disabled', false);
}

function onStopBtnClick() {
  clearInterval(timerId);
  refs.buttonStart.removeAttribute('disabled', false);
  refs.buttonStop.setAttribute('disabled', true);
}
