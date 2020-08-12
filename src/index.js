import "./styles.css";
import "./index.scss";

function sg_filterOptions(ctx, params = {}) {
  if (!ctx) {
    throw new Error("HTMLElement is required");
  }
  const dataNames = {
    id: "data-id"
  };
  const classNames = {
    input: `game-filterOptions_input`,
    menu: `game-filterOptions_menu`,
    menuItem: `game-filterOptions_menu-item`,
    responseField: "game-filterOptions_response",
    responseItem: "game-filterOptions_response-item",
    responseDelete: "game-filterOptions_response-delete",
    itemDisabled: "game-filterOptions-isDisabled",
    validateResponse: "js-filterOptions"
  };
  const menuList = params.wordList || [""];
  const $inputByCtx = ctx.querySelector(`#${ctx.id} .${classNames.input}`);
  const $menuByCtx = ctx.querySelector(`#${ctx.id} .${classNames.menu}`);
  const $responseFieldByCtx = ctx.querySelector(
    `#${ctx.id} .${classNames.responseField}`
  );
  $menuByCtx.addEventListener("click", handleCatchResponse);
  $responseFieldByCtx.addEventListener("click", handleEnableOption);

  function createMenuItems(arrString) {
    arrString.map((text, ixd) => {
      const $menuListByCtx = document.createElement("div");

      $menuListByCtx.classList.add(classNames.menuItem);
      $menuListByCtx.dataset.id = ixd;
      $menuListByCtx.textContent = text;

      $menuByCtx.appendChild($menuListByCtx);
      return null;
    });
  }
  function handleEnableOption(e) {
    const target = e.target;
    if (target.className.includes(classNames.responseDelete)) {
      const $menuListByCtx = $menuByCtx.querySelector(
        `[${dataNames.id}="${target.dataset.id}"]`
      );
      $menuListByCtx.classList.remove(classNames.itemDisabled);
      target.parentNode.remove();
    }
  }
  function handleCatchResponse(e) {
    const target = e.target;
    if (target.className.includes(classNames.menuItem)) {
      const $menuListDeleteByCtx = setElement("span", {
        [dataNames.id]: target.dataset.id,
        class: classNames.responseDelete
      });
      const $responseItemByCtx = setElement(
        "div",
        {
          class: classNames.responseItem,
          [dataNames.id]: target.dataset.id
        },
        [$menuListDeleteByCtx, target.textContent]
      );

      $responseFieldByCtx.appendChild($responseItemByCtx);
      $inputByCtx.value = "";
      $menuByCtx.removeAttribute("style");

      target.classList.add(classNames.itemDisabled);
    }
  }
  // Capturar la entrada del input
  function handleFilter(inputElement, selector, selectorContainer) {
    inputElement.onfocus = () => {
      document
        .querySelectorAll(`.${classNames.menu}`)
        .forEach((elm) => (elm.style.display = "none"));

      document.querySelector(selectorContainer).style.display = "block";

      document
        .querySelectorAll(selector)
        .forEach((elm) => (elm.style.display = "block"));
    };
    inputElement.addEventListener("keyup", (e) => {
      let isEmpty = true;
      if (e.key === "Escape") {
        e.target.value = "";
        isEmpty = false;
      } else if (e.target.value === "") {
        isEmpty = false;
      }
      compare(e.target, selector, selectorContainer, isEmpty);
    });
  }
  // Mostrar los elementos que coincidan con esa entrada (ocultar los que no)
  function compare(filterText, selectorElement, selectorContainer, isEmpty) {
    const inputFilterValue = filterText.value;
    const searchElements = document.querySelectorAll(selectorElement);
    const searchContainers = document.querySelectorAll(selectorContainer);
    const validateContent = (el) => {
      const textContent = el.textContent.toLowerCase();
      if (textContent.includes(inputFilterValue.toLowerCase())) {
        isEmpty ? (el.style.display = "block") : el.removeAttribute("style");
      } else {
        el.removeAttribute("style");
      }
    };
    searchElements.forEach(validateContent);
    searchContainers.forEach(validateContent);
  }

  function setElement(elm, attributes, children = []) {
    const customElement = document.createElement(elm);
    if (children !== undefined) {
      children.forEach((el) => {
        if (el.nodeType) {
          if (el.nodeType === 1 || el.nodeType === 11)
            customElement.appendChild(el);
        } else {
          customElement.innerHTML += el;
        }
      });
    }
    _setAttributes(customElement, attributes);
    return customElement;

    function _setAttributes(element, attrObj) {
      for (const attr in attrObj) {
        if (Object.prototype.hasOwnProperty.call(attrObj, attr))
          element.setAttribute(attr, attrObj[attr]);
      }
      return element;
    }
  }

  function init() {
    createMenuItems(menuList);
    handleFilter(
      $inputByCtx,
      `#${ctx.id} .${classNames.menuItem}`,
      `#${ctx.id} .${classNames.menu}`
    );
  }

  init();
}

sg_filterOptions(document.getElementById("matchSelect_1"), {
  wordList: [
    "Establish, operate, and support an SFOB and 3 forward operational bases (FOBs).",
    "Provide 3 special operations command and control elements to conventional headquarters at corps level or higher.",
    "Train and prepare SF teams for deployment.",
    "Direct, support, and sustain deployed SF teams.",
    "Develop, organize, equip, train, and advise or direct indigenous military and paramilitary forces.",
    "Perform unilateral SF operations.",
    "As headquarters commandant, the Headquarters and Headquarters Company  (HHC) commander is responsible for the movement, internal administration, and physical security of the group headquarters and the SFOB operations center."
  ]
});

sg_filterOptions(document.getElementById("matchSelect_2"), {
  wordList: [
    "Establish, operate, and support an SFOB and 3 forward operational bases (FOBs).",
    "Provide 3 special operations command and control elements to conventional headquarters at corps level or higher.",
    "Train and prepare SF teams for deployment.",
    "Direct, support, and sustain deployed SF teams.",
    "Develop, organize, equip, train, and advise or direct indigenous military and paramilitary forces.",
    "Perform unilateral SF operations.",
    "As headquarters commandant, the Headquarters and Headquarters Company  (HHC) commander is responsible for the movement, internal administration, and physical security of the group headquarters and the SFOB operations center."
  ]
});
