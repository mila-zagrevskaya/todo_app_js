export const createElementWithAttributes = (
  {
    tagName, container, attributes, eventType, eventHandler,
  },
) => {
  const elem = document.createElement(tagName);

  for (const key in attributes) {
    elem[key] = attributes[key];
  }
  (container || document.body).appendChild(elem);
  eventType && elem.addEventListener(eventType, eventHandler);
  return elem;
};


export const addElem = ({
  tagName, container, className, text, id,
}) => {
  const attributes = { };
  className && (attributes.className = className);
  text && (attributes.textContent = text);
  id && (attributes.id = id);
  return createElementWithAttributes({ tagName, container, attributes });
};
