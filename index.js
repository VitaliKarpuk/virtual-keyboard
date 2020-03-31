class Keyboard {
    constructor() {
        this.elements = {
            textArea: null,
            main: null,
            keysConteiner: null,
            keys: []
        },
        this.eventHandlers = {
            oninput: null,
            onclose: null
        },
        this.properties = {
            value: "",
            capsLock: false,
            isRrussian: localStorage.getItem("lang")
        },
        this.keyLayout = [
            ["`", "ё", "Backquote"], ["1", "!", "Digit1"], ["2", "@", "Digit2"], ["3", "#", "Digit3"], ["4", "$", "Digit4"], ["5", "%", "Digit5"], ["6", "^", "Digit6"], ["7", "&", "Digit7"], ["8", "*", "Digit8"], ["9", "(", "Digit9"], ["0", ")", "Digit0"], ["-", "_", "Minus"], ["=", "+", "Equal"], ["Backspace", "Backspace", "Backspace"],
            ["Tab", "Tab", "Tab"], ["q", "й", "KeyQ"], ["w", "ц", "KeyW"], ["e", "у", "KeyE"], ["r", "к", "KeyR"], ["t", "е", "KeyT"], ["y", "н", "KeyY"], ["u", "г", "KeyU"], ["i", "ш", "KeyI"], ["o", "щ", "KeyO"], ["p", "з", "KeyP"], ["[", "[", "BracketLeft"],["]", "]", "BracketRight"], ["\\", "\\", "Backslash"],
            ["CapsLock", "CapsLock", "CapsLock"], ["a", "ф", "KeyA"], ["s", "ы", "KeyS"], ["d", "в", "KeyD"], ["f", "а", "KeyF"], ["g", "п", "KeyG"], ["h", "р", "KeyH"], ["j", "о", "KeyJ"], ["k", "л", "KeyK"], ["l", "д", "KeyL"], [";", "ж", "Semicolon"], ["'", "э", "Quote"], ["Enter", "Enter", "Enter"],
            ["shift", "shift", "ShiftLeft"], ["z", "я", "KeyZ"], ["x", "ч", "KeyX"], ["c", "с", "KeyC"], ["v", "м", "KeyV"], ["b", "и", "KeyB"], ["n", "т", "KeyN"], ["m", "ь", "KeyM"], [",", "б", "Comma"], [".", "ю", "Period"], ["/", ".", "Slash"], ["▲", "▲", "ArrowUp"], 
            ["Ctr", "Ctr", "ControlLeft"], ["Win", "Win", "MetaLeft"], ["Alt", "Alt", "AltLeft"], ["space", "space", "Space"], ["Alt", "Alt", "AltRight"], ["◄", "◄", "ArrowLeft"], ["▼", "▼", "ArrowDown"], ["►", "►", "ArrowRight"]
        ];
    }
   initTextArea () {
       this.elements.textArea = document.createElement("textarea");
       this.elements.textArea.classList.add("use-keyboard-input");
       document.body.appendChild(this.elements.textArea);
   }
   initVertual () {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.main.classList.add("keyboard");
        document.body.appendChild(this.elements.main);
        // Create keysConteiner 
        this.elements.keysConteiner = document.createElement("div");
        this.elements.keysConteiner.classList.add("keyboard__keys");
        this.elements.main.appendChild(this.elements.keysConteiner);
        this.elements.keysConteiner.appendChild(this.createKeys());
        this.elements.keys = this.elements.keysConteiner.querySelectorAll(".keyboard__key");
   }
   createKeys(){
    const fragment = document.createDocumentFragment();
    let index = this.properties.isRrussian;
    
    this.keyLayout.forEach(key => {
        const keyElement = document.createElement("button")
        const lineBreak = ['Backspace', '\\', 'Enter', '▲'].indexOf(key[0]) == -1
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");

        keyElement.setAttribute('data-key', `${key[2]}`);   
        switch (key[+index]) {
            case 'Backspace':
                keyElement.classList.add("keyboard__key--wide");
                keyElement.addEventListener('click', () => {
                    this.properties.value = document.querySelector('.use-keyboard-input').value;
                    this.properties.value = this.properties.value
                    .slice(0, this.properties.value.length - 1);
                    document.querySelector('.use-keyboard-input').value = this.properties.value;
                })
                break;
            case 'Tab':
                keyElement.classList.add("keyboard__key--wide");
                keyElement.textContent.toLowerCase()
                keyElement.addEventListener('click', () => {
                    this.properties.value = document.querySelector('.use-keyboard-input').value;
                    this.properties.value += '\t';
                    document.querySelector('.use-keyboard-input').value = this.properties.value;
                });
                break;
            case "CapsLock":
                keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable')
                keyElement.addEventListener('click', () => {
                    this.toggleCapsLock();
                    
                })
                break;
            case 'Enter':
                keyElement.classList.add('keyboard__key--wide');
                keyElement.addEventListener('click', () => {
                    this.properties.value = document.querySelector('.use-keyboard-input').value;
                    this.properties.value += '\n';
                    document.querySelector(".use-keyboard-input").value = this.properties.value;
                });
                break;
            case "shift":
                    keyElement.classList.add('keyboard__key_wide');                        
                break;
            case 'Control':
                keyElement.classList.add('keyboard__key_wide');
                break;
            case 'Win':
                keyElement.classList.add('keyboard__key_wide');
                break;
            case 'Alt':
                keyElement.classList.add('keyboard__key_wide');
                break;
            case 'space':
                keyElement.classList.add('keyboard__key--extra-wide');
                keyElement.addEventListener('click', () => {
                    this.properties.value = document.querySelector('.use-keyboard-input').value;
                    this.properties.value += ' ';
                    document.querySelector('.use-keyboard-input').value = this.properties.value;
                  });
                break;
            default:
                keyElement.addEventListener('click', () => {
                    if (this.properties.capsLock) {
                        document.querySelector('.use-keyboard-input').value += keyElement.textContent 
                        this.properties.value += keyElement.textContent 
                    } else {
                        document.querySelector('.use-keyboard-input').value += keyElement.textContent 
                        this.properties.value += keyElement.textContent 
                    }
                })
                break;
        }
        if(+index === 0){
            keyElement.textContent = key[1].toLowerCase();
        }else{
            keyElement.textContent = key[0].toLowerCase();
        }

        fragment.appendChild(keyElement);
        
        if(!lineBreak){
            fragment.appendChild(document.createElement("br"))
        }
    })
    return fragment
}

   toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        this.elements.keys.forEach((key) => {
            if (key.textContent.length < 2) {
              if (this.properties.capsLock) {
                key.textContent = key.textContent.toUpperCase();
                document.querySelector('.keyboard__key--activatable').classList.add('keyboard__key--active')
              } else {
                key.textContent = key.textContent.toLowerCase();
                document.querySelector('.keyboard__key--activatable').classList.remove('keyboard__key--active')
              }
            }
        });
   }
}
window.addEventListener("DOMContentLoaded", function() {
    const keyboard = new Keyboard()
    keyboard.initTextArea();
    keyboard.initVertual();
    keyboard.createKeys();
});
