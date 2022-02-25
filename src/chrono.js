import './chrono.css'

// A HH:MM:SS.mmm control that is unaffected by OSX and works on 'all' browsers.
// ChronlyHMS requires an input element with the attribute 'data-univHMS'

class ChronlyHMS {


  constructor() {

    // fire HTML input replacement

    this.addHTML();

    // set up event listeners
    this.add0s();
    this.addNumberLooping();
    this.addArrowKeyInput();
    this.addNumericInput();
    this.addClicksToActivate();
    this.nonNumericBugInHTML();
    this.updateDivPrototype();

  }


  // this removes the elements and removes their events
  removeChronlyHMS() {


    var chronoInputs = document.querySelectorAll('.timeCase').forEach(tc => {

      tc.querySelectorAll('input').forEach(input => {

        input.remove();
        input = '';

      });

  });

}

  // convert input data-univHMS to'univHMS'

  addHTML() {


    const univHMSinp = document.querySelectorAll("input[data-univHMS]");

    univHMSinp.forEach(el => {
      // code

      var spanIn = document.createElement("div");

      [...el.attributes].forEach(attr => { spanIn.setAttribute(attr.nodeName, attr.nodeValue) });

      el.replaceWith(spanIn);

      spanIn.classList.add('timeCase');

      var template = document.createElement('template');

      template.innerHTML = `
      <input type="number" class="sH D2 ts_digit" name="startHours" data-tp="1" min="-1" max="100" value="00" >
      <span class="bds">:</span>
      <input type="number" class="sM D2 ts_digit" name="startMinutes" data-tp="2" min="-1" max="60" value="00">
      <span class="bds">:</span>
      <input type="number" class="sS D2 ts_digit" name="startSeconds" data-tp="3" min="-1" max="60" value="00">
      <span class="bds">.</span>
      <input type="number" class="sMS D3 ts_digit" name="startMilliSecs" data-tp="4" min="-10" max="1010" step="10" value="000">
      <div id="svgContainer">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
          focusable="false" data-prefix="fal" data-icon="stopwatch" class="svg-inline--fa fa-stopwatch fa-w-14"
          role="img" viewBox="0 0 448 512">
          <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M393.9 184l22.6-22.6c4.7-4.7 4.7-12.3 0-17l-17-17c-4.7-4.7-12.3-4.7-17 0l-20.7 20.7c-31.1-27.5-70.4-45.9-113.8-50.8V48h28c6.6 0 12-5.4 12-12V12c0-6.6-5.4-12-12-12H172c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12h28v49.4C96.4 109.3 16 197.2 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-44.7-14.1-86.1-38.1-120zM224 464c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm12-112h-24c-6.6 0-12-5.4-12-12V204c0-6.6 5.4-12 12-12h24c6.6 0 12 5.4 12 12v136c0 6.6-5.4 12-12 12z"/>
        </svg>
      </div>
  `

      spanIn.appendChild(template.content)
      console.log(el);

    });
  }



  // add preceeding 0s when necessary (on update)

  add0s() {

    // input for hours, minutes, seconds
    document.querySelectorAll("div.timeCase input").forEach(i => i.addEventListener('change', function () {
      if (!isNaN(this.value) && this.value.length === 1) {
        this.value = '0' + this.value;
      }
    }));


    // milliseconds
    document.querySelectorAll("input.sMS").forEach(i => i.addEventListener('change', function () {

      if (!isNaN(this.value) && this.value.length === 2) {
        this.value = '0' + this.value;
      }

    }));

  }


  addNumberLooping() {
    // Numeric Value looping (eventually this can be 'parameterised' refactored)
    // ex. 99 uparrow to 0 hours, 59 uparrow to 0 minutes and seconds, 990 uparrow to 010, downarrow 000 milliseconds

    document.querySelectorAll("input.sH").forEach(i =>
      i.addEventListener('change', function (event) {

        if (i.value == 100) {
          i.value = '00';
        }
        if (i.value == -1) {
          i.value = 99;
        }

      }));

    document.querySelectorAll("input.sM").forEach(i =>
      i.addEventListener('change', function (event) {

        if (i.value == 60) {
          i.value = '00';
        }
        if (i.value == -1) {
          i.value = 59;
        }

      }));

    document.querySelectorAll("input.sS").forEach(i =>
      i.addEventListener('change', function (event) {

        if (i.value == 60) {
          i.value = '00';
        }

        if (i.value == -1) {
          i.value = 59;
        }

      }));

    document.querySelectorAll("input.sMS").forEach(i =>
      i.addEventListener('change', function (event) {

        if (i.value == 1000) {
          i.value = "010";
        }

        if (i.value == -10) {
          i.value = 990;
        }

        if (i.value == 0) {
        }

      }));
  }


  // arrow key input of values (up/down) and place toggling (left/right)

  addArrowKeyInput() {

    // Left and Right arrow key toggle between HMSmS
    // this depends on data-attributes ex. data-tp="1" in HTML

    document.querySelectorAll("div.timeCase").forEach(d =>
      d.addEventListener('keydown', function (event) {


        var et = event.target;
        var dId = d.id;
        var tp_active;

        // these help manual testing by posting to the webapge
        var el_disp = document.querySelector("#keyHolder");
        el_disp.innerHTML = "None";

        switch (true) {

          case event.key == "ArrowLeft":
            tp_active = document.activeElement.dataset.tp;

            if (tp_active >= 2) {
              tp_active--;
            }

            document.querySelector('#' + dId).querySelector("[data-tp='" + tp_active + "']").focus();
            setTimeout(function () { document.querySelector('#' + dId).querySelector("[data-tp='" + tp_active + "']").select(); }, 5);
            el_disp.innerHTML = event.key;

            break;

          case event.key == "ArrowRight":
            tp_active = document.activeElement.dataset.tp;

            if (tp_active <= 3) {
              tp_active++;
            }

            document.querySelector('#' + dId).querySelector("[data-tp='" + tp_active + "']").focus();
            setTimeout(function () { document.querySelector('#' + dId).querySelector("[data-tp='" + tp_active + "']").select(); }, 5);
            el_disp.innerHTML = event.key;

            break;

          // these keep the input selected
          case event.key == "ArrowUp":
            el_disp.innerHTML = event.key;
            setTimeout(function () { document.activeElement.select(); }, 5);

            break;

          case event.key == "ArrowDown":
            el_disp.innerHTML = event.key;

            setTimeout(function () { document.activeElement.select(); }, 5);

            break;

          // this is good for testing, to determine whether a key press is detected
          case /^([0-9]?)$/.test(event.key):

            el_disp.innerHTML = event.key;

            break;

        }
      }));
  }

  // numeric input (and auto toggling)

  addNumericInput() {

    // https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
    // Digit input 0-9  (typed in by user)

    function setInputFilter(textbox, inputFilter) {
      // this sets a listener and  immediately updates the value of the input number (note: can update this from input text, like by removing setSelectionRange )

      textbox.addEventListener('keyup', function () {
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


    // three boxes, hours or minutes and seconds (are the same) but milliseconds is different

    // sH
    document.querySelectorAll('input.sH').forEach(i => setInputFilter(i, function (value) {

      var newV = /^([0-9]?|[0-9][0-9]?)$/.test(value);

      if (value.length === 2) {

        i.parentNode.querySelector('input.sM').focus();
        i.parentNode.querySelector('input.sM').select();

      }

      return newV;

    }));

    document.querySelectorAll('input.sM').forEach(i => setInputFilter(i, function (value) {


      var newV = /^([0-9]?|[0-5][0-9]?)$/.test(value);

      if (value > 5 || value.length === 2) {

        i.parentNode.querySelector('input.sS').focus();
        i.parentNode.querySelector('input.sS').select();

      }

      return newV;

    }));

    document.querySelectorAll('input.sS').forEach(i => setInputFilter(i, function (value) {

      var newV = /^([0-9]?|[0-5][0-9]?)$/.test(value);

      if (value > 5 || value.length === 2) {

        i.parentNode.querySelector('input.sMS').focus();
        i.parentNode.querySelector('input.sMS').select();

      }

      return newV;

    }));


    document.querySelectorAll('input.sMS').forEach(i => setInputFilter(i, function (value) {

      var newV = /^([0-9]?|[0-9][0-9]?|[0-9][0-9][0-9]?)$/.test(value);


      if (value.length === 3) {

        i.parentNode.querySelector('input.sMS').blur();

      }

      return newV;

    }));

  }



  // click to activate input of values by the keyboard
  // old

  addClicksToActivate() {

    // document.querySelector("#sH").addEventListener("click", function () { this.select(); });

    document.querySelectorAll('input[name="startHours"]').forEach(
      item => item.addEventListener("click", function () { this.select(); })
    );

    // document.querySelector("#sM").addEventListener("click", function () { this.select(); });

    document.querySelectorAll('input[name="startMinutes"]').forEach(
      item => item.addEventListener("click", function () { this.select(); })
    )

    // document.querySelector("#sS").addEventListener("click", function () { this.select(); });
    document.querySelectorAll('input[name="startSeconds"]').forEach(
      item => item.addEventListener("click", function () { this.select(); })
    )

    // document.querySelector("#sMS").addEventListener("click", function () { this.select(); });

    document.querySelectorAll('input[name="startMilliSecs"]').forEach(
      item => item.addEventListener("click", function () { this.select(); })
    )

  }

  // click to activate input of values
  // addClicksToActivate() {

  //   document.querySelectorAll("input.sH").forEach(sh => sh.addEventListener("click", function () { this.select(); }));
  //   document.querySelectorAll("input.sM").forEach(sm => sm.addEventListener("click", function () { this.select(); }));
  //   document.querySelectorAll("input.sS").forEach(ss => ss.addEventListener("click", function () { this.select(); }));
  //   document.querySelectorAll("input.sMS").forEach(sms => sms.addEventListener("click", function () { this.select(); }));

  // }

  nonNumericBugInHTML() {

    document.querySelectorAll(".timeCase input").forEach(item =>

      item.addEventListener('keypress', function (e) {

        e = e || window.event;
        var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
        var charStr = String.fromCharCode(charCode);

        if (!charStr.match(/^[0-9]+$/))
          e.preventDefault();

      }));

  }


  // allows for getting and setting of values like
  // document.querySelector('#bob').value = "08:04:05.002"

  updateDivPrototype() {

    HTMLDivElement.prototype.__defineGetter__('value', function () {

      if (this.querySelector('input[name="startHours"]') !== null) {

        return this.querySelector('input[name="startHours"]').value +
          ':' + this.querySelector('input[name="startMinutes"]').value +
          ':' + this.querySelector('input[name="startSeconds"]').value +
          '.' + this.querySelector('input[name="startMilliSecs"]').value;

      }
      else {

        return null;

      }
    });


    HTMLDivElement.prototype.__defineSetter__('value', function (timeString) {

      // will need warning about timeString format (like input type='time')

      if (/(^[0-9][0-9]):([0-5][0-9]):([0-5][0-9])\.([0-9][0-9][0-9]$)/.exec(timeString)) {

        // split val



        var timeArray = timeString.split(/[.:]+/);



        this.querySelector('input[name="startHours"]').value = timeArray[0];
        this.querySelector('input[name="startMinutes"]').value = timeArray[1];
        this.querySelector('input[name="startSeconds"]').value = timeArray[2];
        this.querySelector('input[name="startMilliSecs"]').value = timeArray[3];

      }
      else {

        console.warn(`The specified value ${timeString} does not conform to the required format.  The format is "HH:mm:ss.SSS" where HH is 00-99, mm is 00-59, ss is 00-59, and SSS is 000-999.`);

      }


    });


  }
}

// console.log("Now I'll boot Chronolnly, by newing it up! External to constructor!")
//  window.chronlyhms = new ChronlyHMS;

export default ChronlyHMS;



