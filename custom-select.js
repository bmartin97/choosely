function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

function createAttributesFromObject(attrObject) {
    return Object.values(attrObject)
        .map((value) => `${value.nodeName}="${value.nodeValue}"`)
        .join(' ');
}

function createAttributesFromAttributeList(attrObject, attrArray) {
    return Object.values(attrObject)
        .map((value) => {
            if (attrArray.includes(value.nodeName)) {
                return `${value.nodeName}="${value.nodeValue}"`;
            }
        })
        .join(' ');
}

class Choosely {
    constructor({
        selector = undefined,
        target = undefined,
        searchable = false,
        inheritAttributes = false,
        on = {
            Init,
            Open,
            Close,
            Select
        }
    }) {
        if (on.Init) {
            if (typeof on.Init === 'function') {
                this.onInit = on.Init;
            } else {
                console.warn(`on Init property is not a function!`);
                this.onInit = function () {};
            }
        } else {
            this.onInit = function () {};
        }

        if (on.Open) {
            if (typeof on.Open === 'function') {
                this.onOpen = on.Open;
            } else {
                console.warn(`on Open property is not a function!`);
                this.onOpen = function () {};
            }
        } else {
            this.onOpen = function () {};
        }
        if (on.Close) {
            if (typeof on.Close === 'function') {
                this.onClose = on.Close;
            } else {
                console.warn(`on Close property is not a function!`);
                this.onClose = function () {};
            }
        } else {
            this.onClose = function () {};
        }
        if (on.Select) {
            if (typeof on.Select === 'function') {
                this.onSelect = on.Select;
            } else {
                console.warn(`on Select property is not a function!`);
                this.onSelect = function () {};
            }
        } else {
            this.onSelect = function () {};
        }

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
            },
            _filteredOptions: [],
            set FilteredOptions(value) {
                this._filteredOptions = value;
            },
            get FilteredOption() {
                return this._filteredOptions;
            },
            _isOpened: false,
            set IsOpened(value) {
                this._isOpened = value;
            },
            get IsOpened() {
                return this._isOpened;
            }
        };

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
                    throw new Error(
                        `Source element doesn't have parent elements. Please define target element.`
                    );
                }
            }

            // Render choosely
            const options = this.sourceElement.querySelectorAll('option');

            const renderOptions = () => {
                if (inheritAttributes) {
                    if (
                        typeof inheritAttributes === 'object' &&
                        Array.isArray(inheritAttributes)
                    ) {
                        // Array
                        return Array.from(options).map((_option) => {
                            const text = _option.innerText;

                            const _clone = _option.cloneNode();
                            _clone.classList.add('choosely-option');
                            const attributes = _clone.attributes;

                            return `<div ${createAttributesFromAttributeList(
                                attributes,
                                inheritAttributes
                            )} ${
                                !inheritAttributes.includes('class')
                                    ? 'class="choosely-option"'
                                    : ''
                            }>${text}</div>`;
                        });
                    } else if (typeof inheritAttributes === 'boolean') {
                        // True
                        return Array.from(options).map((_option) => {
                            const text = _option.innerText;

                            const _clone = _option.cloneNode();
                            _clone.classList.add('choosely-option');
                            const attributes = _clone.attributes;

                            return `<div ${createAttributesFromObject(
                                attributes
                            )} >${text}</div>`;
                        });
                    } else {
                        // Invalid type
                        throw new Error(`Invalid type for inheritAttributes property.`);
                    }
                } else {
                    // False
                    return Array.from(options).map((_option) => {
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
                        ${
                            searchable
                                ? `
                            <div class="choosely-search">
                                <input type="search" autocomplete="off">
                            </div>`
                                : ``
                        }
                        ${renderOptions().join('')}
                    </div>
                </div >
                `;
            const _element = createElementFromHTML(html);
            this.targetElement.appendChild(_element);

            this.chooselyElement = _element;
            this.state.Selected = _element.querySelector('.choosely-selected');
            this.state.Options = _element.querySelectorAll('.choosely-option');

            const optionElements = this.chooselyElement.querySelectorAll(
                '.choosely-option'
            );
            this.state.Selected.addEventListener('click', () => {
                if (this.IsOpened) {
                    this.Close();
                } else {
                    this.Open();
                }
            });
            optionElements.forEach((_option) => {
                _option.addEventListener('click', () => {
                    this.Select(_option);
                    this.Close();
                });
            });
            window.addEventListener('click', (evt) => {
                if (this.IsOpened && !this.chooselyElement.contains(evt.target)) {
                    this.Close();
                }
            });
            if (searchable) {
                const searchElement = this.chooselyElement.querySelector(
                    '.choosely-search > input'
                );
                searchElement.addEventListener('input', (event) => {
                    const keyword = event.target.value;
                    this.state.Options.forEach((_option) => {
                        if (!_option.innerText.includes(keyword)) {
                            _option.classList.add('hidden');
                        } else {
                            _option.classList.remove('hidden');
                        }
                    });
                });
            }

            return this;
        } catch (err) {
            console.error(err, 'Choosely.js');
        } finally {
            this.onInit();
        }
    }
    /**
     * @param {HTMLElement} option
     */
    Select(option) {
        this.state.Selected.innerText = option.innerText;
        this.onSelect();
    }
    Open() {
        this.chooselyElement.classList.add('c-opened');
        this.IsOpened = true;
        this.onOpen();
    }
    Close() {
        this.chooselyElement.classList.remove('c-opened');
        this.IsOpened = false;
        this.onClose();
    }
}

const selector1 = new Choosely({
    selector: 'form .form-item.form-type-select select',
    searchable: true,
    inheritAttributes: ['value', 'style'], // default false,
    on: {
        Init() {
            console.log('Init.');
        },
        Open() {
            console.log('Open.');
        },
        Close() {
            console.log('Close.');
        },
        Select() {
            console.log('Select.');
        }
    }
});

console.log(selector1);
