export default class ChatWidget {
  constructor(parentEl) {
    if (!parentEl || !(parentEl instanceof HTMLElement)) {
      throw new Error('Parent element must be a valid HTMLElement');
    }
    this.parentEl = parentEl;
    this.widget = null;
    this.formWrapper = null;
    this.formBtn = null;
  }

  init() {
    this.bindToDOM();
    if (this.widget) {
      this.addSubscribe(this.widget);
    }
  }

  addSubscribe(element) {
    element.addEventListener('click', this.onClickCloseForm.bind(this));
    element.addEventListener('click', this.onClickStartChat.bind(this));
  }

  static get markup() {
    return `
      <div class="chat__widget">
        <div class="form-wrapper">
          <button class="close__form" aria-label="Закрыть форму">X</button>
          <form class="form__feedback" action="#">
            <div class="form__header">
              <h3 class="form__title">Напишите нам!</h3>
            </div>
            <textarea class="panel__feedback" placeholder="Введите ваше сообщение..."></textarea>
            <button type="submit" class="send__feedback">Отправить</button>
          </form>
        </div>
        <div class="chat__btn-block">
          <button class="form__btn" aria-label="Открыть чат">Чат</button>
        </div>
      </div>`;
  }

  bindToDOM() {
    this.parentEl.insertAdjacentHTML('afterend', this.constructor.markup);
    this.widget = this.parentEl.nextElementSibling; // Сохраняем ссылку на виджет
    this.formWrapper = this.widget.querySelector('.form-wrapper');
    this.formBtn = this.widget.querySelector('.form__btn');
  }

  onClickCloseForm(e) {
    if (!(e.target instanceof HTMLElement) || 
        !e.target.classList.contains('close__form')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    if (this.formWrapper) {
      this.formWrapper.classList.remove('active__chat');
    }
    if (this.formBtn) {
      this.formBtn.classList.remove('active__btn');
    }
  }

  onClickStartChat(e) {
    if (!(e.target instanceof HTMLElement) ||
        !e.target.classList.contains('form__btn')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    if (this.formBtn) {
      this.formBtn.classList.add('active__btn');
    }
    if (this.formWrapper) {
      this.formWrapper.classList.add('active__chat');
    }
  }

  destroy() {
    if (this.widget) {
      this.widget.removeEventListener('click', this.onClickCloseForm.bind(this));
      this.widget.removeEventListener('click', this.onClickStartChat.bind(this));
      this.widget.remove();
    }
    this.parentEl = null;
    this.widget = null;
    this.formWrapper = null;
    this.formBtn = null;
  }
}
