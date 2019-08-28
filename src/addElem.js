export const addElem = ({
  tagName, container, className, text, id,
}) => {
  const elem = document.createElement(tagName);
  elem.className = className;
  elem.textContent = text;
  text && (elem.text = text);
  id && (elem.id = id);
  (container || document.body).appendChild(elem);
  return elem;
};
