/**
 * This is jsdoc 'auto' documentation see https://jsdoc.app/
 * npm install -g jsdoc
 * jsdoc index.js -d ./docs/
 * 
 * 
 * @fileoverview INPUT-DURATION
 * @file INPUT-DURATION 
 * @author Stephan Luis
 * @see <a href="https://www.npmjs.com/package/input-duration">NPM input-duration</a>
 * @see <a href="https://github.com/StephanLuis/input-duration">GitHub input-duration</a>
 * @copyright MIT License, Copyright (c) 2022 
 */



/**
 * Class for the Input-Duration webcomponent
 * @class InputDuration
 * @extends HTMLElement
 */

class InputDuration extends HTMLElement {
    constructor() {

        super();

        this.myElement = this.attachShadow({ mode: 'open' });

        // needed for setting inputs when value attribute is added to chronlyHMS 
        // <chronly-hms id="bobPrepop" value="99:09:09.999"></chronly-hms>

        this.value = this.getAttribute('value');

        this.boot();

    }  // end constructor


    /**
     * get the input-duration value, pulls values from each input
     * so in js use var x = document.querySelector("#bobPrepop").value; 
     * @return {duration}
     */

    get value() {

        // return this.getAttribute('value');

        if (this.myElement.querySelector('input[name="startHours"]') !== null) {

            return this.myElement.querySelector('input[name="startHours"]').value +
                ':' + this.myElement.querySelector('input[name="startMinutes"]').value +
                ':' + this.myElement.querySelector('input[name="startSeconds"]').value +
                '.' + this.myElement.querySelector('input[name="startMilliSecs"]').value;

        }
        else {

            return null;

        }
    }


    /**
    * set the input-duration value
    * so in js use document.querySelector("#bobPrepop").value = "05:05:05.005"
    * @return {duration}
    * @param {duration} can be html attribute or set in js
    */

    set value(val) {

        // for setting the value in js (like document.querySelector("#bobPrepop").value = "05:05:05.005")
        if (val) {


            console.log(val);


            if (/(^[0-9][0-9]):([0-5][0-9]):([0-5][0-9])\.([0-9][0-9][0-9]$)/.exec(val)) {


                // split val

                var timeArray = val.split(/[.:]+/);

                console.log('time array is ' + timeArray[0] + ':' + timeArray[1] + ':' + timeArray[2] + ':' + timeArray[3]);

                console.log('this.id = ' + this.id);

                setTimeout(() => {

                    this.myElement.querySelector('input[name="startHours"]').value = timeArray[0];
                    this.myElement.querySelector('input[name="startMinutes"]').value = timeArray[1];
                    this.myElement.querySelector('input[name="startSeconds"]').value = timeArray[2];
                    this.myElement.querySelector('input[name="startMilliSecs"]').value = timeArray[3];

                }, 0);


                this.setAttribute('value', val);

            }

            else {

                console.warn(`The specified value ${val} does not conform to the required format.  The format is "HH:mm:ss.SSS" where HH is 00-99, mm is 00-59, ss is 00-59, and SSS is 000-999.`);

            }

            //  I think this is for empty string to clear value
            // gives a False bool and removes value from Webcomponent chronlyHMS

        } else {

            setTimeout(() => {

                this.myElement.querySelector('input[name="startHours"]').value = '00';
                this.myElement.querySelector('input[name="startMinutes"]').value = '00';
                this.myElement.querySelector('input[name="startSeconds"]').value = '00';
                this.myElement.querySelector('input[name="startMilliSecs"]').value = '000';

            }, 0);

            this.removeAttribute('value');

        }
    }


    /**
     * Called from constructor, sets up the html and event listeners
     * @method
     */

    boot() {

        this.addHTML();

        // // set up event listeners
        this.add0s();
        this.addNumberLooping();
        this.addArrowKeyInput();
        this.addNumericInput();
        this.addClicksToActivate();
        this.nonNumericBugInHTML();
        this.removeEprop();

    }


    /**
     * eventlistener that adds arrow key input of values (up/down) and place toggling (left/right) triggered by
     * the change event of the input 
     * @method
     * @see boot()
     */

    addArrowKeyInput() {

        console.log('1 this: ' + this);
        console.log('1 this.myElement: ' + this.myElement);
        console.log('1 this.myElement active: ' + this.myElement);

        var mE = this.myElement;

        // Left and Right arrow key toggle between HMSmS
        // this depends on data-attributes ex. data-tp="1" in HTML

        this.myElement.querySelector("div.timeCase")
            .addEventListener('keydown', function (event) {

                var et = event.target;
                var tp_active = mE.activeElement.dataset.tp;

                switch (true) {

                    case event.key == "ArrowLeft":

                        if (tp_active >= 2) {
                            tp_active--;
                        }

                        et.parentElement.querySelector("[data-tp='" + tp_active + "']").focus();
                        setTimeout(function () { et.parentElement.querySelector("[data-tp='" + tp_active + "']").select(); }, 5);

                        break;

                    case event.key == "ArrowRight":
                        // tp_active = this.myElement.shadowRoot.activeElement.dataset.tp;

                        if (tp_active <= 3) {
                            tp_active++;
                        }

                        et.parentElement.querySelector("[data-tp='" + tp_active + "']").focus();
                        setTimeout(function () { et.parentElement.querySelector("[data-tp='" + tp_active + "']").select(); }, 5);

                        break;

                    // these keep the input selected
                    case event.key == "ArrowUp":

                        setTimeout(function () { mE.activeElement.select(); }, 5);

                        break;

                    case event.key == "ArrowDown":

                        setTimeout(function () { mE.activeElement.select(); }, 5);

                        break;

                    // this is good for testing, to determine whether a key press is detected
                    case /^([0-9]?)$/.test(event.key):

                        break;

                }
            });
    }


    /**
     * updates inputs-duration marked with shadow html and css
     * @method
     * @see boot()
     */

    addHTML() {

        var spanIn = document.createElement("div");

        spanIn.classList.add('timeCase');

        var template = document.createElement('template');

        template.innerHTML = `
          <input type="number" class="sH D2 ts_digit" name="startHours" data-tp="1" min="-1" max="100" value="00" >
          <span class="bds-h">:</span>
          <input type="number" class="sM D2 ts_digit" name="startMinutes" data-tp="2" min="-1" max="60" value="00">
          <span class="bds-m">:</span>
          <input type="number" class="sS D2 ts_digit" name="startSeconds" data-tp="3" min="-1" max="60" value="00">
          <span class="bds-s">.</span>
          <input type="number" class="sMS D3 ts_digit" name="startMilliSecs" data-tp="4" min="-10" max="1010" step="10" value="000">
          <div id="svgContainer">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
              focusable="false" data-prefix="fal" data-icon="stopwatch" class="svg-inline--fa fa-stopwatch fa-w-14"
              role="img" viewBox="0 0 448 512">
              <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M393.9 184l22.6-22.6c4.7-4.7 4.7-12.3 0-17l-17-17c-4.7-4.7-12.3-4.7-17 0l-20.7 20.7c-31.1-27.5-70.4-45.9-113.8-50.8V48h28c6.6 0 12-5.4 12-12V12c0-6.6-5.4-12-12-12H172c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12h28v49.4C96.4 109.3 16 197.2 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-44.7-14.1-86.1-38.1-120zM224 464c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm12-112h-24c-6.6 0-12-5.4-12-12V204c0-6.6 5.4-12 12-12h24c6.6 0 12 5.4 12 12v136c0 6.6-5.4 12-12 12z"/>
              </svg>
          </div>
          <style>
                *:focus {
                outline: none;
                }


                div.timeCase{
                display: inline-flex;
                flex-direction: row;
                max-width: 300px;
                padding: 3px;
                border-style: solid;
                border-width: 1px;
                border-radius: 2px;
                }


                /* Each input width set and blinking cursor 'caret' removed */
                div.timeCase input{
                caret-color: transparent;
                width: 15px;
                padding-top:1px;
                }


                div.timeCase .D3{
                width: 25px;
                }


                /* Hiding the up and down arrow */
                /*https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp*/
                /* Chrome, Safari, Edge, Opera */

                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
                }


                /* Firefox */

                input[type=number] {
                /* -moz-appearance: textfield; */
                -moz-appearance: textarea;
                -webkit-appearance: textarea;
                }


                div.timeCase:focus-within {
                border: 2px solid black;
                padding: 2px;
                }


                .ts_digit {
                border: none;
                } 

                /* between digit span */
                .bds{
                padding-bottom: 1px;
                }

                #svgContainer {
                width: 12px;
                height: 12px;
                padding-top: 1px;
                padding-right: 2px;
                color: black;
                }  

                *:disabled {
                background-color: grey;
                color: lightgrey;
                opacity: .6;
                }
                </style> `

        spanIn.appendChild(template.content);

        this.myElement.appendChild(spanIn);

    }


    /**
     * eventlistener that adds number looping for up and down keys triggered by
     * the change event of the input 
     * @method
     * @see boot()
     */

    addNumberLooping() {

        // Numeric Value looping (eventually this can be 'parameterised' refactored)
        // ex. 99 uparrow to 0 hours, 59 uparrow to 0 minutes and seconds, 990 uparrow to 010, downarrow 000 milliseconds

        const sH = this.myElement.querySelector("input.sH");
        sH.addEventListener('change', function (event) {

            if (sH.value == 100) {
                sH.value = '00';
            }
            if (sH.value == -1) {
                sH.value = 99;
            }

        });

        const sM = this.myElement.querySelector("input.sM");
        sM.addEventListener('change', function (event) {

            if (sM.value == 60) {
                sM.value = '00';
            }
            if (sM.value == -1) {
                sM.value = 59;
            }

        });

        const sS = this.myElement.querySelector("input.sS");
        sS.addEventListener('change', function (event) {

            if (sS.value == 60) {
                sS.value = '00';
            }

            if (sS.value == -1) {
                sS.value = 59;
            }

        });

        const sMS = this.myElement.querySelector("input.sMS");
        sMS.addEventListener('change', function (event) {

            if (sMS.value == 1000) {
                sMS.value = "010";
            }

            if (sMS.value == -10) {
                sMS.value = 990;
            }

            if (sMS.value == 0) {
            }

        });
    }


    /**
    * eventlistener that adds number input for keyed values triggered by the keyup event
    * @method
    * @see boot()
    */

    addNumericInput() {

        const mE = this.myElement;

        // https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
        // Digit input 0-9  (typed in by user)

        function setInputFilter(inputElement, inputFilter) {
            // this sets a listener and  immediately updates the value of the input number (note: can update this from input text, like by removing setSelectionRange )

            console.log('inputElement: ' + inputElement);
            window.inputElement = inputElement;

            inputElement.addEventListener('keyup', function (event) {

                window.kue = event;

                if (/^([0-9]?)$/.test(event.key)) {
                    if (inputFilter(this.value)) {
                        this.oldValue = this.value;
                        this.oldSelectionStart = this.selectionStart;
                        this.oldSelectionEnd = this.selectionEnd;
                    } else if (this.hasOwnProperty("oldValue")) {
                        this.value = this.oldValue;
                        // this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                    } else {
                        this.value = "";
                    }
                }
            });
        }

        // three filters, hours or minutes and seconds (are the same) but milliseconds is different

        var sH = this.myElement.querySelector('input.sH');

        setInputFilter(sH, function (value) {

            var newV = /^([0-9]?|[0-9][0-9]?)$/.test(value);


            if (value.length === 2) {

                mE.querySelector('input.sM').focus();
                mE.querySelector('input.sM').select();

            }

            return newV;

        });

        var sM = this.myElement.querySelector('input.sM');
        setInputFilter(sM, function (value) {


            var newV = /^([0-9]?|[0-5][0-9]?)$/.test(value);

            if (value > 5 || value.length === 2) {

                mE.querySelector('input.sS').focus();
                mE.querySelector('input.sS').select();

            }

            return newV;

        });

        var sS = this.myElement.querySelector('input.sS');
        setInputFilter(sS, function (value) {

            var newV = /^([0-9]?|[0-5][0-9]?)$/.test(value);

            if (value > 5 || value.length === 2) {

                mE.querySelector('input.sMS').focus();
                mE.querySelector('input.sMS').select();

            }

            return newV;

        });


        var sMS = this.myElement.querySelector('input.sMS');
        setInputFilter(sMS, function (value) {

            var newV = /^([0-9]?|[0-9][0-9]?|[0-9][0-9][0-9]?)$/.test(value);


            if (value.length === 3) {

                mE.querySelector('input.sMS').blur();

            }

            return newV;

        });
    }


    /**
     * eventlistener that adds 0s to preface numbers less than 10 triggered by
     * the change event of the input 
     * @method
     * @see boot()
     */

    add0s() {

        // input for hours, minutes, seconds
        this.myElement.querySelectorAll('input').forEach(i => i.addEventListener('change', function () {
            if (!isNaN(this.value) && this.value.length === 1) {
                this.value = '0' + this.value;
            }
        }));

        // milliseconds
        this.myElement.querySelectorAll("input.sMS").forEach(i => i.addEventListener('change', function () {

            if (!isNaN(this.value) && this.value.length === 2) {
                this.value = '0' + this.value;
            }

        }));

    }
    

    /**
     * eventlistener that adds click to activate input of values by the keyboard triggered by
     * the click event of the input 
     * @method
     * @see boot()
     */

    addClicksToActivate() {

        this.myElement.querySelectorAll('input').forEach(i => i.addEventListener("click", function () { this.select(); }))
    }


    /**
     * eventlistener that adds key filtering to stop letters (or other non-numerics) from being input triggered by
     * the keypress event of the input 
     * @method
     * @see boot()
     */

    nonNumericBugInHTML() {

        this.myElement.querySelectorAll(".timeCase input").forEach(item =>

            item.addEventListener('keypress', function (e) {

                e = e || window.event;
                var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
                var charStr = String.fromCharCode(charCode);

                if (!charStr.match(/^[0-9]+$/))
                    e.preventDefault();

            }));
    }

    /**
     * Stop event propigation from the timeCase up through the DOM so when keys 
     * are being used they don't affect other controls (like volume on plyr)
     * @method
     */

    removeEprop()   {
        
        document.querySelector('input-duration').shadowRoot.querySelector('.timeCase')
        .addEventListener('keydown', function (event) { event.stopPropagation();}); 

    }


    
    // formatting and behaviour options

    /**
     * disables entire control => read-only
     * @method 
     */

    disable() {

        var closure = this;

        // disable chronly inputs on page

        closure.shadowRoot.querySelectorAll(".timeCase input").forEach(el => el.disabled = 'true')

    }


    /**
     * removes the hours, so the display is mm:ss.uuu
     * @method
     */

    noHours() {

        var closure = this;

        // hide chronly hours inputs on page

        closure.shadowRoot.querySelectorAll(".timeCase input.sH").forEach(el => el.style.display = 'none');


        // hide the hours colon on page

        closure.shadowRoot.querySelectorAll(".timeCase span.bds-h").forEach(el => el.style.display = 'none');

    }
} 
// end class


export default customElements.define('input-duration', InputDuration);

// an option is to make all above an IIFE