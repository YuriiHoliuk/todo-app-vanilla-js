function appendContent(el, content) {
  if (!content) {
    return;
  }

  if (Array.isArray(content)) {
    el.append(...content);
  } else if (content instanceof HTMLElement) {
    el.append(content);
  } else if (typeof content === 'string') {
    el.textContent = content;
  }
}

const clearEl = (el) => {
  el.innerHTML = '';
};

function addClassNames(el, classNames) {
  classNames.forEach(className => el.classList.add(className));
}

function addAttributes(el, attributes) {
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
}

function createElement(tagName, content = null, classNames = [], attributes = {}) {
  const el = document.createElement(tagName);

  appendContent(el, content);
  addClassNames(el, classNames);
  addAttributes(el, attributes);

  return el;
}

export {
  createElement,
  addAttributes,
  addClassNames,
  appendContent,
  clearEl,
};
