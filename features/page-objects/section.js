import { By, PageElements } from "@serenity-js/web";

export class Section {
  /**
   * Constructor
   */
  constructor() {}

  /**
   * Find the displayed element
   * @param {string} selector XPath or CSS selector of the element
   * @return {object} Displayed element or undefined if not found
   */
  displayed$(selector) {
    let elements = PageElements.located(By.xpath(selector));
    console.log(elements.length);
    elements.forEach(elt => {
      if(elt.isPresent()) { console.log(elt);  } 
    });

    return elements.length > 0 ? elements[0] : undefined;
  }
  
  /**
   * Find the nth displayed element
   * @param {string} selector XPath or CSS selector of the element
   * @param {string} nth nth visible element
   * @return {object} Displayed element or undefined if not found
   */
   nth_displayed$(selector, nth) {
    let elements = PageElements.located(selector).filter(x => x.isVisible());
    return elements.length > 0 ? elements[nth] : undefined;
  }

  /**
   * Find the displayed elements
   * @param {string} selector XPath or CSS selector of the elements
   * @return {object[]} Array of displayed elements
   */
  displayed$$(selector) {
    return PageElements.located(selector).filter(x => x.isVisible());
  }

  /**
   * Build element properties for a page object
   * @param {object[]} selector Array of element's get methods to be added to the object
   */
  buildProps(props) {
    for (let prop in props) {
      if (prop === 'urlPath') {
        Object.defineProperty(this, prop, {
          get: new Function(`return '${props[prop]}';`)
        });
      } else {
        let func = props[prop];
        if (typeof func === 'string') {
          if (func.startsWith('$$')) {
            func = `$$('${func.slice(2)}')`;
          } else if (func.startsWith('$')) {
            func = `$('${func.slice(1)}')`;
          } else {
            func = `$('${func}')`;
          }
        } else if (func instanceof Array) {
          func = `${func[0]}('${func[1]}')${func[2] || ''}`;
        }
        Object.defineProperty(this, prop, {
          get: new Function(`return ${func};`)
        });
      }
    }
  }

}