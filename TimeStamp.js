// Manual test page setup

function myFunction() {
  var x = document.getElementById("timeEnd").value;
  document.getElementById("itv").innerHTML = x;
}

document.querySelector("#timeCase")
  .addEventListener('change', function(event) {
    var hour = document.querySelector("#sH").value;
    var minute = document.querySelector("#sM").value;
    var second = document.querySelector("#sS").value;
    var milliSecs = document.querySelector("#sMS").value;
    document.getElementById("timePoint").innerHTML = hour + ":" + minute + ":" + second + "." + milliSecs;

  });



// https://stackoverflow.com/questions/20684737/force-leading-zero-in-number-input
// Pad with leading 0, two parts


// hours, minutes, seconds
document.querySelectorAll("#timeCase input").forEach(i => i.addEventListener('change', function() {
  if (!isNaN(this.value) && this.value.length === 1) {
    this.value = '0' + this.value;
  }
}));


// milliseconds
document.querySelector("#sMS").addEventListener('change', function() {
  if (!isNaN(this.value) && this.value.length === 2) {
    this.value = '0' + this.value;
  }
});




// Numeric Value looping (eventually this can be 'parameterised' refactored)
// 99 uparrow to 0 hours, 59 uparrow to 0 minutes and seconds, 990 uparrow to 010, downarrow 000 milliseconds


document.querySelector("#sH")
  .addEventListener('change', function(event) {
    if (document.querySelector("#sH").value == 100) {
      document.querySelector("#sH").value = 0;
    }
    if (document.querySelector("#sH").value == -1) {
      document.querySelector("#sH").value = 99;
    }
  });

document.querySelector("#sM")
  .addEventListener('change', function(event) {
    if (document.querySelector("#sM").value == 60) {
      document.querySelector("#sM").value = 0;
    }
    if (document.querySelector("#sM").value == -1) {
      document.querySelector("#sM").value = 59;
    }
  });

document.querySelector("#sS")
  .addEventListener('change', function(event) {
    if (document.querySelector("#sS").value == 60) {
      document.querySelector("#sS").value = 0;
    }
    if (document.querySelector("#sS").value == -1) {
      document.querySelector("#sS").value = 59;
    }
  });

document.querySelector("#sMS")
  .addEventListener('change', function(event) {
    if (document.querySelector("#sMS").value == 1000) {
      document.querySelector("#sMS").value = "010";
    }
    if (document.querySelector("#sMS").value == -10) {
      document.querySelector("#sMS").value = 990;
    }
    if (document.querySelector("#sMS").value == 0) {
      document.querySelector("#sMS").value = this.value + "0";
    }
  });





// Left and Right arrow key toggle between HMSmS
// this depends on data-attributes ex. data-tp="1" in the HTML

document.querySelector("#timeCase")
  .addEventListener('keydown', function(event) {

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
       document.querySelector("[data-tp='" + tp_active + "']").focus();
      setTimeout(function () {  document.querySelector("[data-tp='" + tp_active + "']").select(); }, 10);
        el_disp.innerHTML = event.key;
        console.log("tp_active: " + tp_active);
        break;

      case event.key == "ArrowRight":
        tp_active = document.activeElement.dataset.tp;
        if (tp_active <= 3) {
          tp_active++;
        }
       document.querySelector("[data-tp='" + tp_active + "']").focus();
         setTimeout(function () {  document.querySelector("[data-tp='" + tp_active + "']").select(); }, 10);
        el_disp.innerHTML = event.key;
        console.log("tp_active: " + tp_active)
        break;


        // these will be kept short term for testing
      case event.key == "ArrowUp":
        el_disp.innerHTML = event.key;
        setTimeout(function () {  document.activeElement.select(); }, 10);
        break;

      case event.key == "ArrowDown":
        el_disp.innerHTML = event.key;
        setTimeout(function () { document.activeElement.select(); }, 10);
        break;

      case /^([0-9]?)$/.test(event.key):
        el_disp.innerHTML = event.key;
        break;
    }
  });



// https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
// Digit input 0-9  (typed in by user)

function setInputFilter(textbox, inputFilter) {
// this sets a listener and  immediately updates the value of the input number (note: can update this from input text, like by removing setSelectionRange )
  textbox.addEventListener('keyup', function() {
    if (/^([0-9]?)$/.test(event.key)) {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    }
  });
}


// three types of boxes, hours or minutes and seconds (are the same) or milliseconds
// 
setInputFilter(document.getElementById("sH"), function(value) {

  
  var newV = /^([0-9]?|[0-9][0-9]?)$/.test(value);

  console.log("value: " + value);

  if (value.length === 2) {
    document.getElementById("sM").focus();
  }

  return newV;

});


setInputFilter(document.getElementById("sM"), function(value) {


  var newV = /^([0-9]?|[1-5][0-9]?)$/.test(value);

  console.log("value: " + value);

  if (value > 5 || value.length === 2) {
    document.getElementById("sS").focus();
  }

  return newV;

});

setInputFilter(document.getElementById("sS"), function(value) {

  
  var newV = /^([0-9]?|[1-5][0-9]?)$/.test(value);

  console.log("value: " + value);

  if (value > 5 || value.length === 2) {
    document.getElementById("sMS").focus();
  }

  return newV;

});


setInputFilter(document.getElementById("sMS"), function(value) {

  
  var newV = /^([0-9]?|[0-9][0-9]?|[0-9][0-9][0-9]?)$/.test(value);

  console.log("value: " + value);

  // if (value.length === 3) {
  //  document.getElementById("sMS").focus();
 //  }

  return newV;

});


// for setting selection

document.querySelector("#sH").addEventListener("click", function() { this.select(); });
document.querySelector("#sM").addEventListener("click", function() { this.select(); });
document.querySelector("#sS").addEventListener("click", function() { this.select(); });
document.querySelector("#sMS").addEventListener("click", function() { this.select(); });
 
