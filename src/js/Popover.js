/* eslint-disable max-len */
export default class Popover {
  constructor(container) {
    this.container = container;
    this.position = ['top', 'right', 'bottom', 'left']; // Варианты позиций popover
    this.openPopOver = null; // позиция открытого popover
  }

  /**
   * Добавляем разметку в DOM
   */
  bindToDom() {
    const element = document.createElement('div');
    element.classList.add('toggle');
    this.position.forEach((position) => {
      const button = document.createElement('button');
      button.classList.add('primary__btn');
      button.textContent = `Click to toggle ${position} popover`;
      button.dataset.position = position;
      element.append(button);
    });

    this.container.append(element);
    document.body.addEventListener('click', this.buttonHandler.bind(this));
  }

  /**
   * Создает элемент popover
   * @param {*} text - сообщение ошибки(подсказки)
   * @param {*} position - позиция popover
   * @returns - html элемент popover
   */
  static createErrorMessage(text, position) {
    const element = document.createElement('div');
    const title = document.createElement('p');
    const info = document.createElement('p');
    element.classList.add('popover');
    element.dataset.position = position;
    title.classList.add('popover__title');
    title.textContent = 'Заголовок сообщения';
    info.classList.add('popover__info');
    info.textContent = text;
    element.append(title);
    element.append(info);
    return element;
  }

  /**
   * Обрабатывает клик
   * @param {*} event - event
   * @returns -
   */
  buttonHandler(event) {
    const currentEl = event.target;

    // Если клик не по кнопке и есть открытый popover закрываем
    if (currentEl.tagName !== 'BUTTON') {
      if (this.openPopOver) this.removePopOver();
      return;
    }

    // Если клик по кнопке, закрываем или показываем popover в зависимости от того по какой кнопке был клик
    if (currentEl.tagName === 'BUTTON') {
      if (currentEl.dataset.position !== this.openPopOver) {
        this.removePopOver();
      } else {
        this.removePopOver();
        return;
      }
    }

    const indent = 7; // Отступ popover от элемента
    const { position } = currentEl.dataset;
    const popOver = this.constructor.createErrorMessage(position, position);
    // currentEl.offsetParent.append(popOver);
    currentEl.append(popOver);
    this.openPopOver = position;

    switch (position) {
      case 'top':
        // popOver.style.top = `${currentEl.offsetTop - popOver.offsetHeight - indent}px`;
        // popOver.style.left = `${currentEl.offsetLeft + currentEl.offsetWidth / 2 - popOver.offsetWidth / 2}px`;
        // Чтоб не уезжало при изменении размера экрана
        popOver.style.top = `${0 - popOver.offsetHeight - indent}px`;
        popOver.style.left = `${currentEl.offsetWidth / 2 - popOver.offsetWidth / 2}px`;
        break;
      case 'bottom':
        // popOver.style.top = `${currentEl.offsetTop + currentEl.offsetHeight + indent}px`;
        // popOver.style.left = `${currentEl.offsetTop + currentEl.offsetWidth / 2 - popOver.offsetWidth / 2}`;
        // Чтоб не уезжало при изменении размера экрана
        popOver.style.top = `${currentEl.offsetHeight + indent}px`;
        popOver.style.left = `${currentEl.offsetWidth / 2 - popOver.offsetWidth / 2}px`;
        break;
      case 'left':
        // popOver.style.top = `${currentEl.offsetTop + currentEl.offsetHeight / 2 - popOver.offsetHeight / 2}px`;
        // popOver.style.left = `${currentEl.offsetLeft - popOver.offsetWidth - indent}px`;
        // Чтоб не уезжало при изменении размера экрана
        popOver.style.top = `${currentEl.offsetHeight / 2 - popOver.offsetHeight / 2}px`;
        popOver.style.left = `${currentEl.offsetWidth + indent}px`;
        break;
      case 'right':
        // popOver.style.top = `${currentEl.offsetTop + currentEl.offsetHeight / 2 - popOver.offsetHeight / 2}px`;
        // popOver.style.left = `${currentEl.offsetLeft + currentEl.offsetWidth + indent}px`;
        // Чтоб не уезжало при изменении размера экрана
        popOver.style.top = `${currentEl.offsetHeight / 2 - popOver.offsetHeight / 2}px`;
        popOver.style.left = `${0 - popOver.offsetWidth - indent}px`;
        break;
      default:
    }
  }

  /**
   * Удаляет popover
   */
  removePopOver() {
    this.openPopOver = null;
    const el = this.container.querySelector('.popover');
    if (el) el.remove();
  }
}
