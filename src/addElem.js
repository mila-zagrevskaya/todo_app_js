export const addElem = ({
  tagName, container, className, text = null, id = null,
}) => {
  const elem = document.createElement(tagName);
  elem.className = className;
  elem.textContent = text;
  id && (elem.id = id);
  (container).appendChild(elem);
  return elem;
};
