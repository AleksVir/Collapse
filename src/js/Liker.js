export default class Liker {
  constructor(parentEl) {
    if (!parentEl || !(parentEl instanceof HTMLElement)) {
      throw new Error('Parent element must be a valid HTMLElement');
    }
    this.parentEl = parentEl;
    this.hearts = new Set(); // Храним все созданные сердечки
    this.widget = null;
  }

  init() {
    this.bindToDOM();
    if (this.widget) {
      this.addSubscribe(this.widget);
    }
  }

  addSubscribe(element) {
    element.addEventListener('click', this.onClickLikerBtn.bind(this));
  }

  static get markup() {
    return `
      <div class="liker__widget">
        <div class="btn__block">
          <button class="liker__btn" aria-label="Like">Like</button>
        </div>
      </div>`;
  }

  bindToDOM() {
    this.parentEl.insertAdjacentHTML('beforeend', this.constructor.markup);
    this.widget = this.parentEl.querySelector('.liker__widget');
  }

  onClickLikerBtn(e) {
    if (!(e.target instanceof HTMLElement) ||
        !e.target.classList.contains('liker__btn')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    this.createHeart();
  }

  createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-wrapper');

    const heartPic = document.createElement('span');
    heartPic.classList.add('heart__icon');
    heart.append(heartPic);

    if (this.widget) {
      this.widget.append(heart);
    }

    this.addTrackHeart(heart);
    this.hearts.add(heart); // Добавляем в коллекцию

    // Обработчик удаления с автоочисткой
    const removeHandler = () => {
      heart.remove();
      this.hearts.delete(heart);
    };

    heart.addEventListener('animationend', removeHandler, { once: true });

    // Страховка: принудительное удаление через 2 сек, если анимация зависла
    setTimeout(() => {
      if (this.hearts.has(heart)) {
        removeHandler();
      }
    }, 2000);
  }

  removeAllHearts() {
    // Метод для экстренного удаления всех сердечек
    this.hearts.forEach(heart => heart.remove());
    this.hearts.clear();
  }

  static arrayRandElem(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
      return null;
    }
    const randEl = Math.floor(Math.random() * arr.length);
    return arr[randEl];
  }

  addTrackHeart(elem) {
    const arrTrajectorys = ['one', 'two', 'three', 'four'];
    const coord = this.constructor.arrayRandElem(arrTrajectorys);
    if (coord) {
      elem.classList.add(coord);
    }
  }

  destroy() {
    if (this.widget) {
      this.widget.removeEventListener('click', this.onClickLikerBtn.bind(this));
      this.widget.remove();
    }
    this.removeAllHearts();
    this.parentEl = null;
  }
}
