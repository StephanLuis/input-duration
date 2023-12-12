//  SL: this is used to create a download video from full length live stream
function createDownload() {
    var n = document.getElementById("ClipRequested"),
        t, i;
    if (n.value !== !0 && compareTimes()) {
        t = document.getElementById("EndTime");
        t.value === "" && (t.value = document.getElementById("MeetingEndTime").value);
        i = captchaResponse();
        $("#CaptchaToken").val(i);
        var r = document.getElementById("createDownloadForm"),
            u = $(r).serialize(),
            f = r.dataset.postUrl;
        $(".error-message").prop("hidden", !0);
        $("#downloadSubmit").prop("disabled", !0);
        n.value = !0;
        $.ajax({
            method: "POST",
            url: f,
            data: u,
            success: function(t) {
                var i = JSON.parse(t);
                i.Success ? ($(".thankyou-header").text("Thank you"), $(".thankyou-message").text(i.Message), $(".thankyou-email").text(i.Email), $(".download-form").prop("hidden", !0), $(".thankyou").removeAttr("hidden"), urlPageNavigation("#player-tabs")) : ($(".error-message").removeAttr("hidden"), $(".error-message").text(i.Message), keepError = !0, n.value = !1, grecaptcha.reset())
            }
        })
    }
}

function receiveMessage(n) {
    var t, i;
    try {
        if (t = JSON.parse(n.data), t === null) return;
        if (i = $("#UKPPlayer")[0].src, t.sender !== i) return;
        window[t.function](t.data)
    } catch (r) {
        console.warn("receiveMessage > inconsitent data ", n, r)
    }
}

function updateCurrentTime(n) {
    var t = n.currentTime.split("_");
    document.getElementById("ProgramDateTime").value = t[1]
}

function generateDateString(n) {
    document.getElementById("IsEventDaylightSavingTime").value === "True" && n.setHours(n.getHours() + 1);
    var u = n.getUTCFullYear(),
        i = n.getUTCMonth() + 1,
        r = n.getUTCDate(),
        t = u + "-";
    return i < 10 && (t += "0"), t += i + "-", r < 10 && (t += "0"), t + r
}

function updateDatePickers(n, t) {
    var r = document.getElementById(t.dataset.dateSelectId),
        u = document.getElementById(t.dataset.partnerDateSelectId),
        i = generateDateString(n);
    $(r).selectpicker("val", i);
    $(u).selectpicker("val", i)
}

function initEnableEmail() {
    var n = document.getElementById("downloadContinue");
    n.addEventListener("click", enableEmail)
}

function initCreateDownload() {
    var n = $("#downloadSubmit");
    n.on("click", createDownload)
}

function initDownloadStartEndKeyPress() {
    var n = $("#downloadStartTime"),
        t = $("#downloadEndTime");
    n.val(new Date(document.getElementById("StartTime").value).toTimeString().split(" ")[0]);
    t.val(new Date(document.getElementById("EndTime").value).toTimeString().split(" ")[0]);
    n.on("focusout", compareTimes);
    t.on("focusout", compareTimes);
    n.on("focusout", updatePartnerElement);
    t.on("focusout", updatePartnerElement)
}

function initMakeAnotherClip() {
    document.getElementById("newClip").addEventListener("click", resetDownloadTab)
}
window.addEventListener("message", receiveMessage, !1);
$(function() {
    initInputMask();
    initEnableEmail();
    initCreateDownload();
    initDownloadStartEndKeyPress();
    initMakeAnotherClip()
})

