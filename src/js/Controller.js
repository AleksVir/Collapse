import Collapse from "./Collapse";

export default class Controller {
  constructor(collapse) {
    this.collapse = collapse;
  }

  init() {
    this.container = document.querySelector(".container");
    this.collapse.createCollapse();
    this.addSubscribe(this.container);
  }

  addSubscribe(element) {
    element.addEventListener("click", this.onClickStart.bind(this));
  }

  onClickStart(e) {
    if (!e.target.classList.contains("start__btn")) {
      return;
    }

    e.preventDefault();
    this.widget = document.querySelector(".widget__body");
    this.widget.classList.toggle("active");
  }
}
