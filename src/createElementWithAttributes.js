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
