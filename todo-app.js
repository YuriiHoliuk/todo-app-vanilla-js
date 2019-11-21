import { createElement, appendContent } from './utils.js';

export class TodoApp {
  #nextTodoId = 1;

  constructor(rootEl, todos = []) {
    this.rootEl = rootEl;
    this.todos = todos;

    this.init();
  }

  init() {
    const headerEl = this.#createHeader();

    this.appEl = createElement('section', headerEl, ['todoapp']);
    this.#createMain();

    this.newTodoFormEl.addEventListener('submit', this.#addTodo);
    this.listEl.addEventListener('click', this.#removeTodo);
  }

  render() {
    this.rootEl.append(this.appEl);
  }

  destroy() {
    this.rootEl.removeChild(this.appEl);
  }

  #addTodo = (event) => {
    event.preventDefault();

    const { value } = this.newTodoFormEl.newTodo;

    if (!value) {
      return;
    }

    const newTodo = {
      text: value,
      id: this.#nextTodoId++,
      checked: false,
    };

    this.todos.push(newTodo);
    this.#renderTodo(newTodo);
  };

  #removeTodo = (id, todoEl) => () => {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.listEl.removeChild(todoEl);

    if (!this.todos.length) {
      this.mainEl.removeChild(this.listEl);
    }
  };

  #toggleTodo = (id, todoEl) => (event) => {
    const { checked } = event.target;

    checked
      ? todoEl.classList.add('completed')
      : todoEl.classList.remove('completed');

    this.todos.map(todoItem => {
      if (todoItem.id === id) {
        return {
          ...todoItem,
          checked,
        };
      }

      return todoItem;
    });
  };

  #renderTodo = (todo) => {
    const todoEl = this.#createTodoEl(todo);

    appendContent(this.listEl, todoEl);

    this.newTodoFormEl.newTodo.value = '';

    if (!this.appEl.contains(this.mainEl)) {
      appendContent(this.appEl, this.mainEl);
    }
  };

  #createTodoEl = ({ text, id }) => {
    const toggleTodoEl = createElement('input', null, ['toggle'], {
      type: 'checkbox',
      id: id
    });
    const toggleTodoLabelEl = createElement('label', text, [], { for: id });
    const removeButtonEl = createElement('button', null, ['destroy'], {
      type: 'button',
    });
    const todoContentEl = createElement(
      'div',
      [toggleTodoEl, toggleTodoLabelEl, removeButtonEl],
      ['view'],
    );

    const todoEl = createElement('li', todoContentEl);

    removeButtonEl.addEventListener('click', this.#removeTodo(id, todoEl));
    toggleTodoEl.addEventListener('change', this.#toggleTodo(id, todoEl));

    return todoEl;
  };

  #createHeader = () => {
    const inputAttributes = { placeholder: 'Input Todo', type: 'text', name: 'newTodo' };
    const inputEl = createElement('input', null, ['new-todo'], inputAttributes);
    this.newTodoFormEl = createElement('form', inputEl);
    const titleEl = createElement('h1', 'Todo App');

    return createElement('header', [titleEl, this.newTodoFormEl], ['header']);
  };

  #createMain = () => {
    const toggleAllEl = createElement('input', null, ['toggle-all'], {
      id: 'toggle-all',
      type: 'checkbox',
    });
    const labelToggleAllEl = createElement(
      'label',
      null,
      [],
      { for: 'toggle-all' },
    );
    this.listEl = createElement('ul', null, ['todo-list']);
    this.mainEl =  createElement(
      'main',
      [toggleAllEl, labelToggleAllEl, this.listEl],
      ['main'],
    );
  };
}
