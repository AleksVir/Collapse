import Controller from "./Controller";
import Collapse from "./Collapse";
import ChatWidget from "./ChatWidget";
import Liker from "./Liker";

const container = document.querySelector(".container");
const collapse = new Collapse(container);

const controller = new Controller(collapse);
controller.init();

const chatWidget = new ChatWidget(container);
chatWidget.init();

const liker = new Liker(container);
liker.init();
