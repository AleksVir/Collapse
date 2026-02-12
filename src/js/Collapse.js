export default class Collapse {
  constructor(container) {
    if (!container || !(container instanceof HTMLElement)) {
      throw new Error('Container must be a valid HTMLElement');
    }
    this.container = container;
    this.isCollapsed = true; // Состояние сворачивания
    this.button = null;
    this.body = null;
  }

  createCollapse() {
    this.bindToDOM();
    this.setupEventListeners();
  }

  static get markup() {
    return `
      <div class="collapse">
        <div class="button__block">
          <button class="start__btn" aria-expanded="false">Collapse</button>
        </div>
        <div class="widget__body" style="display: none;">
          <p class="widget__text"></p>
        </div>
      </div>`;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('afterbegin', this.constructor.markup);
    
    // Сохраняем ссылки на элементы для повторного использования
    this.button = this.container.querySelector('.start__btn');
    this.body = this.container.querySelector('.widget__body');
    
    const textElement = this.container.querySelector('.widget__text');
    if (textElement) {
      textElement.textContent = 
        'Transition allows you to define a transition state between two states of an element. ' +
        'Different states can be defined using pseudo-classes such as :hover or :active ' +
        'or set dynamically using JavaScript.';
    }
  }

  setupEventListeners() {
    if (this.button) {
      this.button.addEventListener('click', this.toggleCollapse.bind(this));
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    
    if (this.body) {
      this.body.style.display = this.isCollapsed ? 'none' : 'block';
    }
    
    if (this.button) {
      this.button.setAttribute('aria-expanded', String(!this.isCollapsed));
      this.button.textContent = this.isCollapsed ? 'Collapse' : 'Collapse';
    }
  }

  destroy() {
    // Метод для корректного удаления компонента
    if (this.button) {
      this.button.removeEventListener('click', this.toggleCollapse.bind(this));
    }
    
    const collapseElement = this.container.querySelector('.collapse');
    if (collapseElement) {
      collapseElement.remove();
    }
  }
}

