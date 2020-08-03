function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

function createAttributesFromObject(attrObject) {
    return Object.values(attrObject).map(value => `${value.nodeName}="${value.nodeValue}"`).join(" ");
}

function createAttributesFromAttributeList(attrObject, attrArray) {
    return Object.values(attrObject).map(value => {
        if (attrArray.includes(value.nodeName)) {
            return `${value.nodeName}="${value.nodeValue}"`;
        }
    }).join(" ");
}


class Choosely {
    constructor({
        selector,
        target = undefined,
        searchable = false,
        inheritAttributes = false }) {

        this.state = {
            _selected: null,
            set Selected(new_selected) {
                this._selected = new_selected;
            },
            get Selected() {
                return this._selected;
            },
            _options: [],
            set Options(new_options) {
                this._options = new_options;
            },
            get Options() {
                return this._options;
            }
        }

        try {
            const _sourceElement = document.querySelector(selector);
            if (_sourceElement) {
                this.sourceElement = _sourceElement;
            } else {
                throw new Error(`Source element doesn't exist. Selector: ${selector}`);
            }

            // Select target HTML Element
            if (target) {
                const _targetElement = document.querySelector(target);
                if (_targetElement) {
                    this.targetElement = _targetElement;
                } else {
                    throw new Error(`Target element doesn't exist. Selector: ${target}`);
                }
            } else {
                const _targetElement = this.sourceElement.parentElement;
                if (_targetElement) {
                    this.targetElement = _targetElement;
                } else {
                    throw new Error(`Source element doesn't have parent elements. Please define target element.`);
                }
            }

            // Render choosely
            const options = this.sourceElement.querySelectorAll("option");

            const renderOptions = () => {
                if (inheritAttributes) {
                    if (typeof inheritAttributes === 'object' && Array.isArray(inheritAttributes)) {
                        // Array
                        return Array.from(options).map(_option => {
                            const text = _option.innerText;

                            const _clone = _option.cloneNode();
                            _clone.classList.add("choosely-option");
                            const attributes = _clone.attributes;

                            return `<div ${createAttributesFromAttributeList(attributes, inheritAttributes)} ${!inheritAttributes.includes('class') ? 'class="choosely-option"' : ''}>${text}</div>`;
                        });
                    } else if (typeof inheritAttributes === 'boolean') {
                        // True
                        return Array.from(options).map(_option => {
                            const text = _option.innerText;

                            const _clone = _option.cloneNode();
                            _clone.classList.add("choosely-option");
                            const attributes = _clone.attributes;

                            return `<div ${createAttributesFromObject(attributes)} >${text}</div>`;
                        });
                    } else {
                        // Invalid type
                        throw new Error(`Invalid type for inheritAttributes property.`);
                    }
                } else {
                    // False
                    return Array.from(options).map(_option => {
                        const text = _option.innerText;

                        return `<div class="choosely-option'>${text}</div>`;
                    });
                }
            };

            const html = `
                <div class="choosely-select">
                    <div class="choosely-selected">
                        ${options[0].innerText}
                    </div>
                    <div class="choosely-option-container">
                        ${ searchable ? `
                            <div class="choosely-search">
                                <input type="search" autocomplete="off">
                            </div>` : ``
                }
                        ${renderOptions().join('')}
                    </div>
                </div >
                `;
            const _element = createElementFromHTML(html);
            this.targetElement.appendChild(_element);

            this.chooselyElement = _element;
            this.state.Selected = _element.querySelector(".choosely-selected");
            this.state.Options = _element.querySelectorAll(".choosely-option");

            const optionElements = this.chooselyElement.querySelectorAll(".choosely-option");
            this.state.Selected.addEventListener('click', () => {
                this.chooselyElement.classList.toggle("c-opened");
            });
            optionElements.forEach(_option => {
                _option.addEventListener('click', () => {
                    this.state.Selected.innerText = _option.innerText;
                    this.chooselyElement.classList.remove("c-opened");
                });
            });
            if (searchable) {
                const searchElement = this.chooselyElement.querySelector(".choosely-search > input");
                searchElement.addEventListener('input', event => {
                    const keyword = event.target.value;
                    this.state.Options.forEach(_option => {
                        if (!_option.innerText.includes(keyword)) {
                            _option.classList.add("hidden");
                        } else {
                            _option.classList.remove("hidden");
                        }
                    })
                });
            }

            return this;
        }
        catch (err) {
            console.error(err, "Choosely.js");
        }
    }
    Select() {

    }
    Open() {

    }
    Close() {

    }
};

const selector1 = new Choosely({
    selector: "form .form-item.form-type-select select",
    searchable: true,
    inheritAttributes: ["value", "style"], // default false
});