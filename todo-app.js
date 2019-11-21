import { createElement, appendContent } from './utils.js';

export class ToDoApp {
  constructor(rootEl, todos = []) {
    this.rootEl = rootEl;
    this.todos = todos;
    this.nextItemId = 1;

    this.init();
  }

  init() {
    const headerEl = this.#createHeader();

    this.appEl = createElement('section', headerEl, ['todoapp']);

    this.#createMain();

    this.newToDoFormEl.addEventListener('submit', this.#addToDo);
    this.listEl.addEventListener('click', this.#removeToDo);
  }

  render() {
    this.rootEl.append(this.appEl);
  }

  #addToDo = (event) => {
    event.preventDefault();

    const { value } = this.newToDoFormEl.newTODO;

    if (!value) {
      return;
    }

    const newToDo = {
      text: value,
      id: this.nextItemId++,
      checked: false,
    };

    this.todos.push(newToDo);

    const itemEl = this.#createItem(newToDo);

    appendContent(this.listEl, itemEl);

    this.newToDoFormEl.newTODO.value = '';

    if (!this.appEl.contains(this.mainEl)) {
      appendContent(this.appEl, this.mainEl);
    }
  };

  #removeToDo = (id, itemEl) => () => {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.listEl.removeChild(itemEl);
  };

  #createHeader = () => {
    const inputAttributes = { placeholder: 'Input TODO', type: 'text', name: 'newTODO' };
    const inputEl = createElement('input', null, ['new-todo'], inputAttributes);
    this.newToDoFormEl = createElement('form', inputEl);
    const titleEl = createElement('h1', 'TODO App');

    return createElement('header', [titleEl, this.newToDoFormEl], ['header']);
  };

  #createMain = () => {
    const toggleAllEl = createElement('input', null, ['toggle-all'], {
      id: 'toggle-all',
      type: 'checkbox',
    });
    const labelToggleAllEl = createElement('label', null, [], { for: 'toggle-all' });
    this.listEl = createElement('ul', null, ['todo-list']);
    this.mainEl =  createElement(
      'main',
      [toggleAllEl, labelToggleAllEl, this.listEl],
      ['main'],
    );
  };

  #createItem = ({ text, id }) => {
    const toggleItemEl = createElement('input', null, ['toggle'], {
      type: 'checkbox',
      id: id
    });
    const toggleItemLabelEl = createElement('label', text, [], { for: id });
    const removeEl = createElement('button', null, ['destroy'], {
      type: 'button',
    });
    const itemContentEl = createElement(
      'div',
      [toggleItemEl, toggleItemLabelEl, removeEl],
      ['view'],
    );

    const itemEl = createElement('li', itemContentEl);

    removeEl.addEventListener('click', this.#removeToDo(id, itemEl));

    return itemEl;
  }
}
