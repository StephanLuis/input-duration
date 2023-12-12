// SL: these are also needed

function resizePlayer() {
    var n = $(".video-container").width();
    $(".video-container").height(Math.ceil(n / 16 * 9));
    $(".video-container iframe").css("height", "98%")
}

function initSelectDates() {
    $(".clip-date").length && $(".clip-date").selectpicker({
        style: "btn-clip-date form-control input-lg",
        size: 4
    })
}

function loadPlayer(n, t) {
    var i = $("#ProgramDateTime").val(),
        r = $("#getVideoUrl").val();
    $.getJSON(r, {
        audioOnly: n,
        autoStart: t
    }, function(n) {
        if ($("#videoContainer").html(n.scriptableEmbedCode), $("#ProgramDateTime").val(""), i != "") var t = setInterval(function() {
            $("#ProgramDateTime").val() != "" && (clearInterval(t), setTimeout(function() {
                var n = $("#UKPPlayer")[0],
                    t = {
                        "function": "seekPostMessage",
                        sender: document.location.href,
                        data: "seek-program-date-time_" + i + "_delaystart"
                    };
                $.postMessage(JSON.stringify(t), n.src, n.contentWindow)
            }, 600))
        }, 200)
    })
}

function updateTitle() {
    var n = $("#eventTitleContainer").data("load-url");
    $.get(n, function(n) {
        $("#eventTitleContainer").html(n)
    })
}

function updateDownloadForm() {
    var n = $("#downloadFormContainer").data("load-url");
    $.get(n, function(n) {
        $("#downloadFormContainer").html(n)
    })
}

function updateDownloadTab() {
    var n = $("#download").data("load-url");
    $.get(n, function(n) {
        $("#download").html(n)
    })
}

function updateClipping() {
    var n = $("#clippingContainer").data("load-url");
    $.get(n, function(n) {
        $("#clippingContainer").html(n);
        initSelectDates();
        initCheckbox();
        reloadEmbedData();
        initSetShareTime();
        initShareInputMask();
        initShareUpdateEmbed()
    })
}

function updateAudioButton() {
    if ($("#audioToggle").hasClass("hidden")) {
        var n = $("#audioToggle").data("load-url");
        $.get(n, function(n) {
            n && $("#audioToggle").removeClass("hidden")
        })
    }
}

function updateStacksAndLogs() {
    $("#index-message").addClass("hidden")
}

function pollEvent() {
    setTimeout(function() {
        updateTitle();
        updateAudioButton();
        $("#AllowClippingRefresh").val() == "True" && updateClipping();
        pollEvent()
    }, eventPollingsInterval)
}

function stateChanged(n, t, i) {
    updateTitle();
    updateDownloadTab();
    updateClipping();
    updateAudioButton();
    updateDownloadForm();
    i == "REVOKE" && window.location.reload();
    t == "COMPLETED" && updateStacksAndLogs()
}

function reloadEmbedData() {
    function t() {
        clearTimeout(embedGenTimeoutId);
        embedGenTimeoutId = setTimeout(function() {
            var t = n.options.start.input.val(),
                r;
            t == undefined && (t = "");
            t != "" && (n.options.start.checkbox.prop("checked", !0), t = n.options.start.date.val() + "T" + t);
            r = n.urlBase + "/" + n.eventId + "?in=" + t;
            $.ajax(r, {
                success: i
            })
        }, 500)
    }

    function i(t) {
        n.fields.longUrl.val(t.pageUrl);
        n.fields.embed.text(t.embedCode);
        n.fields.longUrl.trigger("updated-url", t.pageUrl)
    }
    var n = {
        options: {
            start: {
                input: $("#shareStartTime"),
                date: $("#startClipDate"),
                hiddenStart: $("#hiddenStart"),
                checkbox: $("#startTimeCheck")
            },
            end: {
                input: $("#shareEndTime"),
                date: $("#endClipDate"),
                hiddenEnd: $("#hiddenEnd"),
                checkbox: $("#endTimeCheck")
            }
        },
        urlBase: $("#share").data("url"),
        eventId: $("#eventId").val(),
        fields: {
            longUrl: $("#url"),
            embed: $("#embed")
        },
        timepickerOpts: {
            defaultTime: !1,
            showSeconds: !0,
            showMeridian: !1,
            minuteStep: 1,
            secondStep: 1
        }
    };
    $.each(n.options, function() {
        if (this.hasOwnProperty("input")) this.input.on("changeTime.timepicker", t);
        if (this.hasOwnProperty("date")) this.date.on("change", t)
    });
    $(n.options.start.checkbox).click(function() {
        n.options.start.checkbox.prop("checked") == !1 ? (n.options.start.input.val(""), n.options.end.input.val(""), n.options.end.checkbox.prop("checked", !1), initCheckbox()) : n.options.start.input.val(n.options.start.hiddenStart.val());
        t()
    });
    n.options.end.checkbox.click(function() {
        n.options.end.checkbox.prop("checked") == !1 ? n.options.end.input.val("") : n.options.end.input.val(n.options.end.hiddenEnd.val());
        t()
    });
    t()
}

function selectableEmbedCode() {
    var n = $("#embed, #url");
    n.bind("click", function() {
        this.focus();
        this.setSelectionRange(0, 9999)
    })
}

function updateSocialLinks(n, t) {
    var i = [$(".btn-facebook"), $(".btn-twitter"), $(".btn-google"), $(".btn-linkedin")];
    t = encodeURIComponent(t);
    $.each(i, function() {
        var n = $(this).data("share-url");
        this.hasClass("btn-twitter") ? (n += "Parliamentlive.tv ", n += "&url=" + t) : n += t;
        $(this).attr("href", n)
    })
}

function setAudioButtonState(n) {
    var t = $("#audioToggle"),
        i = $(t).data("audioonly-on-state");
    if (i == "True") {
        $(t).data("audioonly-on-state", "False");
        n || loadPlayer(!0, !0);
        $(t).html('video with audio  <i class="fa fa-player-volume fa-2x"><\/i>');
        return
    }
    if (i == "False") {
        $(t).data("audioonly-on-state", "True");
        n || loadPlayer(!1, !0);
        $(t).html('audio only  <i class="fa fa-player-volume fa-2x"><\/i>');
        return
    }
}

function audiOnlySwitch() {
    setAudioButtonState(!0);
    $(document).on("click", "#audioToggle", null, function() {
        setAudioButtonState(!1)
    })
}

function stopHub() {
    $.connection.hub.stop()
}

function randomIntFromInterval(n, t) {
    return Math.floor(Math.random() * (t - n + 1) + n)
}

function scrollStackAndLogs() {
    $(".log-list").length && ($(".log-list").slimScroll({
        railVisible: !0,
        railColor: "#9c9c9c",
        railOpacity: 1,
        color: "#000",
        size: "16px",
        height: "525px",
        alwaysVisible: !0,
        disableFadeOut: !0,
        start: logPos
    }), $(".log-list").slimScroll().bind("slimscroll", function(n, t) {
        logPos = t
    }));
    var n = window.matchMedia("(max-width: 480px)");
    n.matches || $(".stack-list").length && ($(".stack-list").slimScroll({
        railVisible: !0,
        railColor: "#9c9c9c",
        railOpacity: 1,
        color: "#000",
        size: "16px",
        height: "525px",
        alwaysVisible: !0,
        disableFadeOut: !0,
        start: logPos
    }), $(".stack-list").slimScroll().bind("slimscroll", function(n, t) {
        stackPos = t
    }))
}

function refreshStackItems() {
    var n = $("#stackTab").data("refresh-stack-url");
    $.get(n, {}, function(n) {
        $(".stack-list").html(n);
        scrollStackAndLogs()
    })
}

function refreshStackInterval() {
    setInterval(refreshStackItems, 24e4)
}

function appendArchiveLog() {
    $($(".log-list > li").get().reverse()).each(function(n, t) {
        var i = $(t).find(".time-code").data("time"),
            r;
        return i == "" ? !0 : (r = $("#logTab").data("load-new-log-url"), $.get(r, {
            startTime: i
        }, function(n) {
            $(n).insertAfter($(t))
        }), !1)
    })
}

function appendLiveLog() {
    var n = randomIntFromInterval(1, 15) * 1e3;
    setTimeout(function() {
        var n = $(".log-list > li").first().find(".time-code").data("time"),
            t = $("#logTab").data("load-new-log-url");
        $.get(t, {
            startTime: n
        }, function(n) {
            $(".log-list").prepend(n)
        })
    }, n)
}

function appendLogMoments() {
    $("#LiveLogging").val() == "True" ? appendLiveLog() : appendArchiveLog()
}

function refreshLogMoments() {
    var n = $("#logTab").data("refresh-log-url"),
        t = randomIntFromInterval(1, 45) * 1e3;
    setTimeout(function() {
        $.get(n, {}, function(n) {
            $(".log-list").html(n);
            scrollStackAndLogs()
        })
    }, t)
}

function highlightLiveLog(n) {
    var t = $(".log-list > li.logouter");
    t.removeClass("active");
    t = $(".log-list > li.logouter").get().reverse();
    $(t).each(function(i, r) {
        var u = $(r),
            f = new Date(u.find(".time-code").data("time"));
        if (n >= f) {
            $(t[i - 1]).removeClass("active");
            u.addClass("active");
            return
        }
    })
}

function highlightArchiveLog(n) {
    var t = $(".log-list > li.logouter");
    t.removeClass("active");
    t.each(function(i, r) {
        var u = $(r),
            f = new Date(u.find(".time-code").data("time"));
        if (n >= f) {
            $(t[i - 1]).removeClass("active");
            u.addClass("active");
            return
        }
    })
}

function highlightLogItems(n) {
    $("#LiveLogging").val() == "True" ? highlightLiveLog(n) : highlightArchiveLog(n)
}

function logItemClicked(n) {
    var r = $(this),
        t, u, i, f;
    return highlightItem = !1, t = r.find(".time-code").data("time"), lastClickedTimecode = new Date(t), u = $(".log-list > li.logouter"), u.removeClass("active"), r.addClass("active"), $("#seekToLiveButton").removeClass("btn-seek-to-live-grey"), i = $("#UKPPlayer")[0], f = {
        "function": "seekPostMessage",
        sender: document.location.href,
        data: "seek-program-date-time_" + t
    }, $.postMessage(JSON.stringify(f), i.src, i.contentWindow), setTimeout(function() {
        highlightItem = !0
    }, 6e3), n.preventDefault(), !1
}

function seekToLive() {
    $("#seekToLiveButton").addClass("btn-seek-to-live-grey");
    var n = $("#UKPPlayer")[0],
        t = {
            "function": "seekPostMessage",
            sender: document.location.href,
            data: "seek-to-live_true"
        };
    $.postMessage(JSON.stringify(t), n.src, n.contentWindow);
    setTimeout(function() {
        var n = $(".log-list > li.logouter");
        n.removeClass("active")
    }, 2e3)
}

function timeUpdate(n) {
    var i = n.timeUpdateString.split("_"),
        t;
    i.length < 2 || i[0].indexOf("program-date-time") != -1 && (t = new Date(i[1]), $("#ProgramDateTime").val(t.toISOString()), (lastClickedTimecode == null || t > lastClickedTimecode) && highlightItem && highlightLogItems(t))
}

function initTermsAndConditions() {
    var n = $(".acceptance");
    n.on("click", termsAndConditionsClickHandler)
}

function initEnableEmbed() {
    var n = document.getElementById("shareContinue");
    n.addEventListener("click", enableEmbed)
}

function initEnableEmail() {
    var n = document.getElementById("downloadContinue");
    n.addEventListener("click", enableEmail)
}

function initSetShareTime() {
    var n = $(".set-share-time");
    n.on("click", getShareTime)
}

function initSetDownloadTime() {
    var n = $(".set-download-time");
    n.on("click", getDownloadTime)
}

function initSetClipboard() {
    var n = $(".fa-clipboard");
    n.on("click", copyToClipbloard)
}

function initSetFileType() {
    var n = $(".fileType");
    n.on("change", checkMakeClip)
}

function initEmailValid() {
    var n = $("#email");
    n.on("change", checkMakeClip)
}

function checkStartTime() {
    var r = $("#downloadStartTime").val().split(":"),
        e = $('[data-id="startDownloadDate"]')[0],
        n = new Date(Date.parse(e.title)),
        u, i, t, f;
    if (n.setHours(n.getHours() + r[0]), n.setMinutes(n.getMinutes() + r[1]), n.setSeconds(n.getSeconds() + r[2]), u = document.getElementById("MeetingStartTime").value, !isNaN(n.valueOf()))
        if (i = n.toISOString().split(".")[0] + "Z", t = $("#EndTime").val(), t === "" && (t = document.getElementById("MeetingEndTime").value), i < t && i >= u) {
            if (f = new Date(t), f - n >= 324e5) {
                setErrorMessage("Clip cannot exceed 9 hours");
                return
            }
            setDownloadTimeForm("StartTime", i);
            timesValid = !0;
            keepError || $(".error-message").prop("hidden", !0);
            checkMakeClip()
        } else keepError = !1, i > t ? setErrorMessage("Start Time cannot be later than the End Time") : i === t ? setErrorMessage("Start Time cannot be equal to the End Time") : setErrorMessage("Start Time cannot be earlier than the meeting start time")
}

function setErrorMessage(n) {
    $(".error-message").text(n);
    $(".error-message").removeAttr("hidden");
    timesValid = !1;
    checkMakeClip()
}

function setDownloadTimeForm(n, t) {
    document.getElementById(n).value = t
}

function checkEndTime() {
    var r = $("#downloadEndTime").val().split(":"),
        o = $('[data-id="endDownloadDate"]')[0],
        n = new Date(Date.parse(o.title)),
        u, t, i, f, e;
    if (n.setHours(n.getHours() + r[0]), n.setMinutes(n.getMinutes() + r[1]), n.setSeconds(n.getSeconds() + r[2]), u = document.getElementById("MeetingEndTime").value, !isNaN(n.valueOf()))
        if (t = n.toISOString().split(".")[0] + "Z", i = $("#StartTime").val(), t > i && t <= u) {
            if (isLivePlayer() && (f = new Date(u).getTime() / 1e3, e = n.getTime() / 1e3, f - e <= 11)) {
                setErrorMessage("End Time cannot be within 10 seconds of the live edge");
                timesValid = !1;
                return
            }
            setDownloadTimeForm("EndTime", t);
            timesValid = !0;
            keepError || $(".error-message").prop("hidden", !0);
            checkMakeClip()
        } else keepError = !1, t < i ? setErrorMessage("End Time cannot be earlier than the Start Time") : t === i ? setErrorMessage("End Time cannot be equal to the Start Time") : setErrorMessage("End Time cannot be later than the meeting end time")
}

function compareTimes() {
    var s = document.getElementById("downloadStartTime").value.split(":"),
        h = document.querySelectorAll('[data-id="startDownloadDate"]')[0],
        c = document.getElementById("downloadEndTime").value.split(":"),
        l = document.querySelectorAll('[data-id="endDownloadDate"]')[0],
        t = getDate(s, h),
        n = getDate(c, l),
        u = document.getElementById("MeetingStartTime").value,
        f = document.getElementById("MeetingEndTime").value,
        i, r;
    if (isNaN(n.valueOf()) || isNaN(t.valueOf())) return !1;
    if (i = t.toISOString().split(".")[0] + "Z", r = n.toISOString().split(".")[0] + "Z", n - t >= 1e4 && r <= f && i >= u) return n - t >= 324e5 ? (setErrorMessage("Clip cannot exceed 9 hours"), !1) : checkLiveEdge(f, n) ? (setDownloadTimeForm("StartTime", i), setDownloadTimeForm("EndTime", r), timesValid = !0, keepError || (document.getElementsByClassName("error-message")[0].hidden = !0), checkMakeClip()) : !1;
    keepError = !1;
    setTimeError(i, r, u);
    var e = new Date(u),
        a = new Date(e.getFullYear(), e.getMonth(), e.getDate()),
        o = new Date(f),
        v = new Date(o.getFullYear(), o.getMonth(), o.getDate());
    return Math.floor((v.getTime() - a.getTime()) / 864e5) > 0 && $(".error-message").append(" Please ensure you have selected the correct date"), !1
}

function getDate(n, t) {
    var i = "+0000";
    return document.getElementById("IsEventDaylightSavingTime").value === "True" && (i = "+0100"), new Date(Date.parse(t.title + " " + n[0] + ":" + n[1] + ":" + n[2] + " GMT" + i))
}

function checkLiveEdge(n, t) {
    if (isLivePlayer()) {
        var i = new Date(n).getTime() / 1e3,
            r = t.getTime() / 1e3;
        if (i - r <= 11) return setErrorMessage("End Time cannot be within 10 seconds of the live edge"), timesValid = !1, !1
    }
    return !0
}

function setTimeError(n, t, i) {
    startDate = new Date(n);
    endDate = new Date(t);
    n > t ? setErrorMessage("Start Time cannot be later than the End Time.") : endDate - startDate < 1e4 ? setErrorMessage("Start Time and End Time must be at least 10 seconds apart.") : n < i ? setErrorMessage("Start Time cannot be earlier than the meeting start time.") : t < n ? setErrorMessage("End Time cannot be earlier than the Start Time.") : setErrorMessage("End Time cannot be later than the meeting end time.")
}

function termsAndConditionsClickHandler(n) {
    var t = n.target.dataset.continueId;
    enableDisableButton(t, n.target.checked)
}

function enableDisableButton(n, t) {
    var i = document.getElementById(n);
    t ? $(i).removeAttr("disabled") : $(i).prop("disabled", !0)
}

function enableEmbed() {
    var n = $(".embed-code"),
        t = $(".share-terms");
    t.fadeOut();
    n.fadeIn();
    urlPageNavigation("#player-tabs")
}

function enableEmail() {
    var n = $(".email-me"),
        t = $(".download-terms");
    t.fadeOut();
    n.fadeIn();
    urlPageNavigation("#player-tabs")
}

function urlPageNavigation(n) {
    var t = window.location.href;
    t.indexOf("#") !== -1 ? t = t.substring(0, t.indexOf("#")) + n : t += n;
    window.location.href = t
}

function copyToClipbloard() {
    var i = document.querySelector("#embed"),
        n, t, r;
    i.select();
    n = $(".response-message");
    try {
        t = document.execCommand("copy");
        r = t ? "successful" : "unsuccessful";
        n.text("Copied to Clipboard");
        n.addClass("show")
    } catch (u) {
        n.text("unable to copy")
    }
}

function resetDownloadTab() {
    $(".thankyou").prop("hidden", !0);
    $(".download-form").removeAttr("hidden");
    $("#email").val("");
    document.getElementById("ClipRequested").value = !1;
    document.getElementById("EmailAddress").value = "";
    grecaptcha.reset()
}

function checkMakeClip() {
    var n = !1,
        t = document.getElementById("ClipRequested").value === "true";
    return isRadioChecked() && isValidEmail() && captchaValid && timesValid && !t && (n = !0), n ? ($("#downloadSubmit").removeAttr("disabled"), keepError || $(".error-message").prop("hidden", !0)) : $("#downloadSubmit").prop("disabled", !0), n
}

function isRadioChecked() {
    var n = $("input:radio.radioFileType:checked");
    return n.length > 0 ? ($("#AudioOnly").val(n[0].id === "fileType2"), !0) : !1
}

function isValidEmail() {
    var n = $("#email").val(),
        t = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(n);
    return t && $("#EmailAddress").val(n), t
}

function captchaResponse() {
    return grecaptcha.getResponse()
}

function expCallback() {
    captchaValid = !1;
    checkMakeClip()
}

function recaptchaCallback() {
    captchaValid = !0;
    checkMakeClip()
}

function initShareUpdateEmbed() {
    var n = document.getElementById("shareStartTime"),
        t = document.getElementById("shareEndTime");
    n != null && t != null && (n.addEventListener("focusout", reloadEmbedData), t.addEventListener("focusout", reloadEmbedData), n.addEventListener("focusout", updatePartnerElement), t.addEventListener("focusout", updatePartnerElement), n.addEventListener("focusout", compareTimes), t.addEventListener("focusout", compareTimes))
}

function updatePartnerElement(n) {
    document.getElementById(n.target.dataset.partnerId).value = n.target.value;
    reloadEmbedData()
}

function initInputMask() {
    var n = document.getElementById("downloadStartTime"),
        t = document.getElementById("downloadEndTime");
    n != null && t != null && (n.addEventListener("keydown", inputMask), n.addEventListener("input", mobileMask), t.addEventListener("keydown", inputMask), t.addEventListener("input", mobileMask))
}

function initShareInputMask() {
    var n = document.getElementById("shareStartTime"),
        t = document.getElementById("shareEndTime");
    n != null && t != null && (n.addEventListener("keydown", inputMask), n.addEventListener("input", mobileMask), t.addEventListener("keydown", inputMask), t.addEventListener("input", mobileMask))
}

function mobileMask(n) {
    var e = "00:00:00",
        r = n.target.dataset.lastInput,
        t, u, f, i;
    if (androidInput) {
        if (t = this.selectionStart, u = this.selectionEnd, t === u ? (f = n.target.value.substring(t - 1, u), t--) : f = n.target.value.substring(t, u), r !== n.target.value) {
            if (i = parseInt(f), isNaN(i) || t === 8) {
                n.target.value = r;
                return
            }
            r.substring(t, t + 1) === ":" && (t++, u++);
            n.target.value.substring(t + 1, t + 2) === ":" && (t++, u++);
            t === 0 && i > 2 && (i = 2, parseInt(n.target.value.substr(t + 1, t + 2)) > 3 && i > 1 && (i = 1));
            t === 1 && n.target.value.substr(0, 1) === "2" && i > 3 && (i = 3);
            (t === 3 || t === 6 || t === 2 || t === 5) && i > 5 && (i = 5);
            n.target.value = r.substring(0, t) + i + r.substring(u, r.length);
            n.target.value += e.substr(n.target.value.length, e.length);
            r = n.target.value;
            n.target.dataset.lastInput = r;
            this.selectionStart = t + 1;
            this.selectionEnd = t + 1
        }
        androidInput = !1
    }
}

function inputMask(n) {
    var e = "00:00:00",
        i = n.target.value,
        t = this.selectionStart,
        r = this.selectionEnd,
        f = "",
        u, o, s;
    if (n.keyCode === 229) {
        androidInput = !0;
        return
    }
    n.keyCode < 41 && n.keyCode > 36 || (n.preventDefault(), n.keyCode === 8 && (t === r && t--, f = i.substring(0, t) + e.substring(t, r) + i.substring(r, i.length), ApplyMask(n.target, f, e, t)), n.keyCode === 46 && (t === r && n.keyCode === 46 && r++, f = i.substring(0, t) + e.substring(t, r) + i.substring(r, i.length), ApplyMask(n.target, f, e, r)), u = parseInt(n.key), isNaN(u)) || t !== 8 && (t === 0 && u > 2 && (u = 2), parseInt(i.substr(t + 1, t + 2)) > 3 && u > 1 && (u = 1), t === 1 && i.substr(0, 1) === "2" && u > 3 && (u = 3), (t === 3 || t === 6 || t === 2 || t === 5) && u > 5 && (u = 5), i.substring(t, t + 1) === ":" && (t++, r++), t === r ? f = i.substr(0, t) + u + i.substr(r + 1, i.length) : (o = u + e.substr(t + 1, r - 1), f = i.substring(0, t) + o, s = f.length, f += i.substr(s, 8)), ApplyMask(n.target, f, e, t + 1))
}

function ApplyMask(n, t, i, r) {
    t += i.substr(t.length, i.length);
    n.value = t;
    n.selectionStart = r;
    n.selectionEnd = n.selectionStart;
    n.dataset.lastInput = n.value
}
var embedGenTimeoutId, eventPollingsInterval, androidInput;
$(function() {
        resizePlayer();
        setTimeout(function() {
            resizePlayer()
        }, 1e3);
        $(window).resize(function() {
            resizePlayer()
        })
    }),
    function(n, t, i) {
        function v(t, i) {
            var u, f;
            if (n.isArray(t)) {
                for (u = t.length - 1; u >= 0; u--) f = t[u], n.type(f) === "string" && r.transports[f] || (i.log("Invalid transport: " + f + ", removing it from the transports list."), t.splice(u, 1));
                t.length === 0 && (i.log("No transports remain within the specified transport array."), t = null)
            } else if (r.transports[t] || t === "auto") {
                if (t === "auto" && r._.ieVersion <= 8) return ["longPolling"]
            } else i.log("Invalid transport: " + t.toString() + "."), t = null;
            return t
        }

        function y(n) {
            return n === "http:" ? 80 : n === "https:" ? 443 : void 0
        }

        function h(n, t) {
            return t.match(/:\d+$/) ? t : t + ":" + y(n)
        }

        function p(t, i) {
            var u = this,
                r = [];
            u.tryBuffer = function(i) {
                return t.state === n.signalR.connectionState.connecting ? (r.push(i), !0) : !1
            };
            u.drain = function() {
                if (t.state === n.signalR.connectionState.connected)
                    while (r.length > 0) i(r.shift())
            };
            u.clear = function() {
                r = []
            }
        }
        var f = {
            nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.",
            noTransportOnInit: "No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.",
            errorOnNegotiate: "Error during negotiation request.",
            stoppedWhileLoading: "The connection was stopped during page load.",
            stoppedWhileNegotiating: "The connection was stopped during the negotiate request.",
            errorParsingNegotiateResponse: "Error parsing negotiate response.",
            errorDuringStartRequest: "Error during start request. Stopping the connection.",
            stoppedDuringStartRequest: "The connection was stopped during the start request.",
            errorParsingStartResponse: "Error parsing start response: '{0}'. Stopping the connection.",
            invalidStartResponse: "Invalid start response: '{0}'. Stopping the connection.",
            protocolIncompatible: "You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.",
            sendFailed: "Send failed.",
            parseFailed: "Failed at parsing response: {0}",
            longPollFailed: "Long polling request failed.",
            eventSourceFailedToConnect: "EventSource failed to connect.",
            eventSourceError: "Error raised by EventSource",
            webSocketClosed: "WebSocket closed.",
            pingServerFailedInvalidResponse: "Invalid ping response when pinging server: '{0}'.",
            pingServerFailed: "Failed to ping server.",
            pingServerFailedStatusCode: "Failed to ping server.  Server responded with status code {0}, stopping the connection.",
            pingServerFailedParse: "Failed to parse ping server response, stopping the connection.",
            noConnectionTransport: "Connection is in an invalid state, there is no transport active.",
            webSocketsInvalidState: "The Web Socket transport is in an invalid state, transitioning into reconnecting.",
            reconnectTimeout: "Couldn't reconnect within the configured timeout of {0} ms, disconnecting.",
            reconnectWindowTimeout: "The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection."
        };
        if (typeof n != "function") throw new Error(f.nojQuery);
        var r, c, s = t.document.readyState === "complete",
            e = n(t),
            l = "__Negotiate Aborted__",
            u = {
                onStart: "onStart",
                onStarting: "onStarting",
                onReceived: "onReceived",
                onError: "onError",
                onConnectionSlow: "onConnectionSlow",
                onReconnecting: "onReconnecting",
                onReconnect: "onReconnect",
                onStateChanged: "onStateChanged",
                onDisconnect: "onDisconnect"
            },
            w = function(n, i) {
                if (i !== !1) {
                    var r;
                    typeof t.console != "undefined" && (r = "[" + (new Date).toTimeString() + "] SignalR: " + n, t.console.debug ? t.console.debug(r) : t.console.log && t.console.log(r))
                }
            },
            o = function(t, i, r) {
                return i === t.state ? (t.state = r, n(t).triggerHandler(u.onStateChanged, [{
                    oldState: i,
                    newState: r
                }]), !0) : !1
            },
            b = function(n) {
                return n.state === r.connectionState.disconnected
            },
            a = function(n) {
                return n._.keepAliveData.activated && n.transport.supportsKeepAlive(n)
            },
            k = function(i) {
                var f, e;
                i._.configuredStopReconnectingTimeout || (e = function(t) {
                    var i = r._.format(r.resources.reconnectTimeout, t.disconnectTimeout);
                    t.log(i);
                    n(t).triggerHandler(u.onError, [r._.error(i, "TimeoutException")]);
                    t.stop(!1, !1)
                }, i.reconnecting(function() {
                    var n = this;
                    n.state === r.connectionState.reconnecting && (f = t.setTimeout(function() {
                        e(n)
                    }, n.disconnectTimeout))
                }), i.stateChanged(function(n) {
                    n.oldState === r.connectionState.reconnecting && t.clearTimeout(f)
                }), i._.configuredStopReconnectingTimeout = !0)
            };
        r = function(n, t, i) {
            return new r.fn.init(n, t, i)
        };
        r._ = {
            defaultContentType: "application/x-www-form-urlencoded; charset=UTF-8",
            ieVersion: function() {
                var i, n;
                return t.navigator.appName === "Microsoft Internet Explorer" && (n = /MSIE ([0-9]+\.[0-9]+)/.exec(t.navigator.userAgent), n && (i = t.parseFloat(n[1]))), i
            }(),
            error: function(n, t, i) {
                var r = new Error(n);
                return r.source = t, typeof i != "undefined" && (r.context = i), r
            },
            transportError: function(n, t, r, u) {
                var f = this.error(n, r, u);
                return f.transport = t ? t.name : i, f
            },
            format: function() {
                for (var t = arguments[0], n = 0; n < arguments.length - 1; n++) t = t.replace("{" + n + "}", arguments[n + 1]);
                return t
            },
            firefoxMajorVersion: function(n) {
                var t = n.match(/Firefox\/(\d+)/);
                return !t || !t.length || t.length < 2 ? 0 : parseInt(t[1], 10)
            },
            configurePingInterval: function(i) {
                var f = i._.config,
                    e = function(t) {
                        n(i).triggerHandler(u.onError, [t])
                    };
                f && !i._.pingIntervalId && f.pingInterval && (i._.pingIntervalId = t.setInterval(function() {
                    r.transports._logic.pingServer(i).fail(e)
                }, f.pingInterval))
            }
        };
        r.events = u;
        r.resources = f;
        r.ajaxDefaults = {
            processData: !0,
            timeout: null,
            async: !0,
            global: !1,
            cache: !1
        };
        r.changeState = o;
        r.isDisconnecting = b;
        r.connectionState = {
            connecting: 0,
            connected: 1,
            reconnecting: 2,
            disconnected: 4
        };
        r.hub = {
            start: function() {
                throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'><\/script>.");
            }
        };
        e.load(function() {
            s = !0
        });
        r.fn = r.prototype = {
            init: function(t, i, r) {
                var f = n(this);
                this.url = t;
                this.qs = i;
                this.lastError = null;
                this._ = {
                    keepAliveData: {},
                    connectingMessageBuffer: new p(this, function(n) {
                        f.triggerHandler(u.onReceived, [n])
                    }),
                    onFailedTimeoutHandle: null,
                    lastMessageAt: (new Date).getTime(),
                    lastActiveAt: (new Date).getTime(),
                    beatInterval: 5e3,
                    beatHandle: null,
                    totalTransportConnectTimeout: 0
                };
                typeof r == "boolean" && (this.logging = r)
            },
            _parseResponse: function(n) {
                var t = this;
                return n ? typeof n == "string" ? t.json.parse(n) : n : n
            },
            _originalJson: t.JSON,
            json: t.JSON,
            isCrossDomain: function(i, r) {
                var u;
                return (i = n.trim(i), r = r || t.location, i.indexOf("http") !== 0) ? !1 : (u = t.document.createElement("a"), u.href = i, u.protocol + h(u.protocol, u.host) !== r.protocol + h(r.protocol, r.host))
            },
            ajaxDataType: "text",
            contentType: "application/json; charset=UTF-8",
            logging: !1,
            state: r.connectionState.disconnected,
            clientProtocol: "1.4",
            reconnectDelay: 2e3,
            transportConnectTimeout: 0,
            disconnectTimeout: 3e4,
            reconnectWindow: 3e4,
            keepAliveWarnAt: 2 / 3,
            start: function(i, h) {
                var c = this,
                    y = {
                        pingInterval: 3e5,
                        waitForPageLoad: !0,
                        transport: "auto",
                        jsonp: !1
                    },
                    d, p = c._deferral || n.Deferred(),
                    w = t.document.createElement("a"),
                    b, g;
                if (c.lastError = null, c._deferral = p, !c.json) throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8.");
                if (n.type(i) === "function" ? h = i : n.type(i) === "object" && (n.extend(y, i), n.type(y.callback) === "function" && (h = y.callback)), y.transport = v(y.transport, c), !y.transport) throw new Error("SignalR: Invalid transport(s) specified, aborting start.");
                return (c._.config = y, !s && y.waitForPageLoad === !0) ? (c._.deferredStartHandler = function() {
                    c.start(i, h)
                }, e.bind("load", c._.deferredStartHandler), p.promise()) : c.state === r.connectionState.connecting ? p.promise() : o(c, r.connectionState.disconnected, r.connectionState.connecting) === !1 ? (p.resolve(c), p.promise()) : (k(c), w.href = c.url, w.protocol && w.protocol !== ":" ? (c.protocol = w.protocol, c.host = w.host) : (c.protocol = t.document.location.protocol, c.host = w.host || t.document.location.host), c.baseUrl = c.protocol + "//" + c.host, c.wsProtocol = c.protocol === "https:" ? "wss://" : "ws://", y.transport === "auto" && y.jsonp === !0 && (y.transport = "longPolling"), c.url.indexOf("//") === 0 && (c.url = t.location.protocol + c.url, c.log("Protocol relative URL detected, normalizing it to '" + c.url + "'.")), this.isCrossDomain(c.url) && (c.log("Auto detected cross domain url."), y.transport === "auto" && (y.transport = ["webSockets", "serverSentEvents", "longPolling"]), typeof y.withCredentials == "undefined" && (y.withCredentials = !0), y.jsonp || (y.jsonp = !n.support.cors, y.jsonp && c.log("Using jsonp because this browser doesn't support CORS.")), c.contentType = r._.defaultContentType), c.withCredentials = y.withCredentials, c.ajaxDataType = y.jsonp ? "jsonp" : "text", n(c).bind(u.onStart, function() {
                    n.type(h) === "function" && h.call(c);
                    p.resolve(c)
                }), d = function(i, s) {
                    var y = r._.error(f.noTransportOnInit);
                    if (s = s || 0, s >= i.length) {
                        n(c).triggerHandler(u.onError, [y]);
                        p.reject(y);
                        c.stop();
                        return
                    }
                    if (c.state !== r.connectionState.disconnected) {
                        var w = i[s],
                            h = r.transports[w],
                            l = !1,
                            v = function() {
                                l || (l = !0, t.clearTimeout(c._.onFailedTimeoutHandle), h.stop(c), d(i, s + 1))
                            };
                        c.transport = h;
                        try {
                            c._.onFailedTimeoutHandle = t.setTimeout(function() {
                                c.log(h.name + " timed out when trying to connect.");
                                v()
                            }, c._.totalTransportConnectTimeout);
                            h.start(c, function() {
                                var i = function() {
                                    var i = r._.firefoxMajorVersion(t.navigator.userAgent) >= 11,
                                        f = !!c.withCredentials && i;
                                    c.log("The start request succeeded. Transitioning to the connected state.");
                                    a(c) && r.transports._logic.monitorKeepAlive(c);
                                    r.transports._logic.startHeartbeat(c);
                                    r._.configurePingInterval(c);
                                    o(c, r.connectionState.connecting, r.connectionState.connected) || c.log("WARNING! The connection was not in the connecting state.");
                                    c._.connectingMessageBuffer.drain();
                                    n(c).triggerHandler(u.onStart);
                                    e.bind("unload", function() {
                                        c.log("Window unloading, stopping the connection.");
                                        c.stop(f)
                                    });
                                    i && e.bind("beforeunload", function() {
                                        t.setTimeout(function() {
                                            c.stop(f)
                                        }, 0)
                                    })
                                };
                                if (!l) {
                                    if (l = !0, t.clearTimeout(c._.onFailedTimeoutHandle), c.state === r.connectionState.disconnected) return;
                                    c.log(h.name + " transport selected. Initiating start request.");
                                    r.transports._logic.ajaxStart(c, i)
                                }
                            }, v)
                        } catch (b) {
                            c.log(h.name + " transport threw '" + b.message + "' when attempting to start.");
                            v()
                        }
                    }
                }, b = c.url + "/negotiate", g = function(t, i) {
                    var e = r._.error(f.errorOnNegotiate, t, i._.negotiateRequest);
                    n(i).triggerHandler(u.onError, e);
                    p.reject(e);
                    i.stop()
                }, n(c).triggerHandler(u.onStarting), b = r.transports._logic.prepareQueryString(c, b), c.log("Negotiating with '" + b + "'."), c._.negotiateRequest = r.transports._logic.ajax(c, {
                    url: b,
                    error: function(n, t) {
                        t !== l ? g(n, c) : p.reject(r._.error(f.stoppedWhileNegotiating, null, c._.negotiateRequest))
                    },
                    success: function(t) {
                        var i, e, h, o = [],
                            s = [];
                        try {
                            i = c._parseResponse(t)
                        } catch (l) {
                            g(r._.error(f.errorParsingNegotiateResponse, l), c);
                            return
                        }
                        if (e = c._.keepAliveData, c.appRelativeUrl = i.Url, c.id = i.ConnectionId, c.token = i.ConnectionToken, c.webSocketServerUrl = i.WebSocketServerUrl, c._.longPollDelay = i.LongPollDelay * 1e3, c.disconnectTimeout = i.DisconnectTimeout * 1e3, c._.totalTransportConnectTimeout = c.transportConnectTimeout + i.TransportConnectTimeout * 1e3, i.KeepAliveTimeout ? (e.activated = !0, e.timeout = i.KeepAliveTimeout * 1e3, e.timeoutWarning = e.timeout * c.keepAliveWarnAt, c._.beatInterval = (e.timeout - e.timeoutWarning) / 3) : e.activated = !1, c.reconnectWindow = c.disconnectTimeout + (e.timeout || 0), !i.ProtocolVersion || i.ProtocolVersion !== c.clientProtocol) {
                            h = r._.error(r._.format(f.protocolIncompatible, c.clientProtocol, i.ProtocolVersion));
                            n(c).triggerHandler(u.onError, [h]);
                            p.reject(h);
                            return
                        }
                        n.each(r.transports, function(n) {
                            if (n.indexOf("_") === 0 || n === "webSockets" && !i.TryWebSockets) return !0;
                            s.push(n)
                        });
                        n.isArray(y.transport) ? n.each(y.transport, function(t, i) {
                            n.inArray(i, s) >= 0 && o.push(i)
                        }) : y.transport === "auto" ? o = s : n.inArray(y.transport, s) >= 0 && o.push(y.transport);
                        d(o)
                    }
                }), p.promise())
            },
            starting: function(t) {
                var i = this;
                return n(i).bind(u.onStarting, function() {
                    t.call(i)
                }), i
            },
            send: function(n) {
                var t = this;
                if (t.state === r.connectionState.disconnected) throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()");
                if (t.state === r.connectionState.connecting) throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started.");
                return t.transport.send(t, n), t
            },
            received: function(t) {
                var i = this;
                return n(i).bind(u.onReceived, function(n, r) {
                    t.call(i, r)
                }), i
            },
            stateChanged: function(t) {
                var i = this;
                return n(i).bind(u.onStateChanged, function(n, r) {
                    t.call(i, r)
                }), i
            },
            error: function(t) {
                var i = this;
                return n(i).bind(u.onError, function(n, r, u) {
                    i.lastError = r;
                    t.call(i, r, u)
                }), i
            },
            disconnected: function(t) {
                var i = this;
                return n(i).bind(u.onDisconnect, function() {
                    t.call(i)
                }), i
            },
            connectionSlow: function(t) {
                var i = this;
                return n(i).bind(u.onConnectionSlow, function() {
                    t.call(i)
                }), i
            },
            reconnecting: function(t) {
                var i = this;
                return n(i).bind(u.onReconnecting, function() {
                    t.call(i)
                }), i
            },
            reconnected: function(t) {
                var i = this;
                return n(i).bind(u.onReconnect, function() {
                    t.call(i)
                }), i
            },
            stop: function(i, h) {
                var c = this,
                    v = c._deferral;
                if (c._.deferredStartHandler && e.unbind("load", c._.deferredStartHandler), delete c._.config, delete c._.deferredStartHandler, !s && (!c._.config || c._.config.waitForPageLoad === !0)) {
                    c.log("Stopping connection prior to negotiate.");
                    v && v.reject(r._.error(f.stoppedWhileLoading));
                    return
                }
                if (c.state !== r.connectionState.disconnected) return c.log("Stopping connection."), o(c, c.state, r.connectionState.disconnected), t.clearTimeout(c._.beatHandle), t.clearTimeout(c._.onFailedTimeoutHandle), t.clearInterval(c._.pingIntervalId), c.transport && (c.transport.stop(c), h !== !1 && c.transport.abort(c, i), a(c) && r.transports._logic.stopMonitoringKeepAlive(c), c.transport = null), c._.negotiateRequest && (c._.negotiateRequest.abort(l), delete c._.negotiateRequest), r.transports._logic.tryAbortStartRequest(c), n(c).triggerHandler(u.onDisconnect), delete c._deferral, delete c.messageId, delete c.groupsToken, delete c.id, delete c._.pingIntervalId, delete c._.lastMessageAt, delete c._.lastActiveAt, delete c._.longPollDelay, c._.connectingMessageBuffer.clear(), c
            },
            log: function(n) {
                w(n, this.logging)
            }
        };
        r.fn.init.prototype = r.fn;
        r.noConflict = function() {
            return n.connection === r && (n.connection = c), r
        };
        n.connection && (c = n.connection);
        n.connection = n.signalR = r
    }(window.jQuery, window),
    function(n, t) {
        function e(n) {
            n._.keepAliveData.monitoring && s(n);
            r.markActive(n) && (n._.beatHandle = t.setTimeout(function() {
                e(n)
            }, n._.beatInterval))
        }

        function s(t) {
            var r = t._.keepAliveData,
                f;
            t.state === i.connectionState.connected && (f = (new Date).getTime() - t._.lastMessageAt, f >= r.timeout ? (t.log("Keep alive timed out.  Notifying transport that connection has been lost."), t.transport.lostConnection(t)) : f >= r.timeoutWarning ? r.userNotified || (t.log("Keep alive has been missed, connection may be dead/slow."), n(t).triggerHandler(u.onConnectionSlow), r.userNotified = !0) : r.userNotified = !1)
        }

        function f(n, t) {
            var i = n.url + t;
            return n.transport && (i += "?transport=" + n.transport.name), r.prepareQueryString(n, i)
        }
        var i = n.signalR,
            u = n.signalR.events,
            h = n.signalR.changeState,
            o = "__Start Aborted__",
            r;
        i.transports = {};
        r = i.transports._logic = {
            ajax: function(t, i) {
                return n.ajax(n.extend(!0, {}, n.signalR.ajaxDefaults, {
                    type: "GET",
                    data: {},
                    xhrFields: {
                        withCredentials: t.withCredentials
                    },
                    contentType: t.contentType,
                    dataType: t.ajaxDataType
                }, i))
            },
            pingServer: function(t) {
                var e, f, u = n.Deferred();
                return t.transport ? (e = t.url + "/ping", e = r.addQs(e, t.qs), f = r.ajax(t, {
                    url: e,
                    success: function(n) {
                        var r;
                        try {
                            r = t._parseResponse(n)
                        } catch (e) {
                            u.reject(i._.transportError(i.resources.pingServerFailedParse, t.transport, e, f));
                            t.stop();
                            return
                        }
                        r.Response === "pong" ? u.resolve() : u.reject(i._.transportError(i._.format(i.resources.pingServerFailedInvalidResponse, n), t.transport, null, f))
                    },
                    error: function(n) {
                        n.status === 401 || n.status === 403 ? (u.reject(i._.transportError(i._.format(i.resources.pingServerFailedStatusCode, n.status), t.transport, n, f)), t.stop()) : u.reject(i._.transportError(i.resources.pingServerFailed, t.transport, n, f))
                    }
                })) : u.reject(i._.transportError(i.resources.noConnectionTransport, t.transport)), u.promise()
            },
            prepareQueryString: function(n, i) {
                var u;
                return u = r.addQs(i, "clientProtocol=" + n.clientProtocol), u = r.addQs(u, n.qs), n.token && (u += "&connectionToken=" + t.encodeURIComponent(n.token)), n.data && (u += "&connectionData=" + t.encodeURIComponent(n.data)), u
            },
            addQs: function(t, i) {
                var r = t.indexOf("?") !== -1 ? "&" : "?",
                    u;
                if (!i) return t;
                if (typeof i == "object") return t + r + n.param(i);
                if (typeof i == "string") return u = i.charAt(0), (u === "?" || u === "&") && (r = ""), t + r + i;
                throw new Error("Query string property must be either a string or object.");
            },
            getUrl: function(n, i, u, f) {
                var s = i === "webSockets" ? "" : n.baseUrl,
                    e = s + n.appRelativeUrl,
                    o = "transport=" + i;
                return n.groupsToken && (o += "&groupsToken=" + t.encodeURIComponent(n.groupsToken)), u ? (e += f ? "/poll" : "/reconnect", n.messageId && (o += "&messageId=" + t.encodeURIComponent(n.messageId))) : e += "/connect", e += "?" + o, e = r.prepareQueryString(n, e), e + ("&tid=" + Math.floor(Math.random() * 11))
            },
            maximizePersistentResponse: function(n) {
                return {
                    MessageId: n.C,
                    Messages: n.M,
                    Initialized: typeof n.S != "undefined" ? !0 : !1,
                    Disconnect: typeof n.D != "undefined" ? !0 : !1,
                    ShouldReconnect: typeof n.T != "undefined" ? !0 : !1,
                    LongPollDelay: n.L,
                    GroupsToken: n.G
                }
            },
            updateGroups: function(n, t) {
                t && (n.groupsToken = t)
            },
            stringifySend: function(n, t) {
                return typeof t == "string" || typeof t == "undefined" || t === null ? t : n.json.stringify(t)
            },
            ajaxSend: function(t, e) {
                var h = r.stringifySend(t, e),
                    c = f(t, "/send"),
                    o, s = function(t, r) {
                        n(r).triggerHandler(u.onError, [i._.transportError(i.resources.sendFailed, r.transport, t, o), e])
                    };
                return o = r.ajax(t, {
                    url: c,
                    type: t.ajaxDataType === "jsonp" ? "GET" : "POST",
                    contentType: i._.defaultContentType,
                    data: {
                        data: h
                    },
                    success: function(n) {
                        var i;
                        if (n) {
                            try {
                                i = t._parseResponse(n)
                            } catch (u) {
                                s(u, t);
                                t.stop();
                                return
                            }
                            r.triggerReceived(t, i)
                        }
                    },
                    error: function(n, i) {
                        i !== "abort" && i !== "parsererror" && s(n, t)
                    }
                })
            },
            ajaxAbort: function(n, t) {
                if (typeof n.transport != "undefined") {
                    t = typeof t == "undefined" ? !0 : t;
                    var i = f(n, "/abort");
                    r.ajax(n, {
                        url: i,
                        async: t,
                        timeout: 1e3,
                        type: "POST"
                    });
                    n.log("Fired ajax abort async = " + t + ".")
                }
            },
            ajaxStart: function(t, e) {
                var h = function(n) {
                        var i = t._deferral;
                        i && i.reject(n)
                    },
                    s = function(i) {
                        t.log("The start request failed. Stopping the connection.");
                        n(t).triggerHandler(u.onError, [i]);
                        h(i);
                        t.stop()
                    };
                t._.startRequest = r.ajax(t, {
                    url: f(t, "/start"),
                    success: function(n, r, u) {
                        var f;
                        try {
                            f = t._parseResponse(n)
                        } catch (o) {
                            s(i._.error(i._.format(i.resources.errorParsingStartResponse, n), o, u));
                            return
                        }
                        f.Response === "started" ? e() : s(i._.error(i._.format(i.resources.invalidStartResponse, n), null, u))
                    },
                    error: function(n, r, u) {
                        r !== o ? s(i._.error(i.resources.errorDuringStartRequest, u, n)) : (t.log("The start request aborted because connection.stop() was called."), h(i._.error(i.resources.stoppedDuringStartRequest, null, n)))
                    }
                })
            },
            tryAbortStartRequest: function(n) {
                n._.startRequest && (n._.startRequest.abort(o), delete n._.startRequest)
            },
            tryInitialize: function(n, t) {
                n.Initialized && t()
            },
            triggerReceived: function(t, i) {
                t._.connectingMessageBuffer.tryBuffer(i) || n(t).triggerHandler(u.onReceived, [i])
            },
            processMessages: function(t, i, u) {
                var f;
                r.markLastMessage(t);
                i && (f = r.maximizePersistentResponse(i), r.updateGroups(t, f.GroupsToken), f.MessageId && (t.messageId = f.MessageId), f.Messages && (n.each(f.Messages, function(n, i) {
                    r.triggerReceived(t, i)
                }), r.tryInitialize(f, u)))
            },
            monitorKeepAlive: function(t) {
                var i = t._.keepAliveData;
                i.monitoring ? t.log("Tried to monitor keep alive but it's already being monitored.") : (i.monitoring = !0, r.markLastMessage(t), t._.keepAliveData.reconnectKeepAliveUpdate = function() {
                    r.markLastMessage(t)
                }, n(t).bind(u.onReconnect, t._.keepAliveData.reconnectKeepAliveUpdate), t.log("Now monitoring keep alive with a warning timeout of " + i.timeoutWarning + " and a connection lost timeout of " + i.timeout + "."))
            },
            stopMonitoringKeepAlive: function(t) {
                var i = t._.keepAliveData;
                i.monitoring && (i.monitoring = !1, n(t).unbind(u.onReconnect, t._.keepAliveData.reconnectKeepAliveUpdate), t._.keepAliveData = {}, t.log("Stopping the monitoring of the keep alive."))
            },
            startHeartbeat: function(n) {
                n._.lastActiveAt = (new Date).getTime();
                e(n)
            },
            markLastMessage: function(n) {
                n._.lastMessageAt = (new Date).getTime()
            },
            markActive: function(n) {
                return r.verifyLastActive(n) ? (n._.lastActiveAt = (new Date).getTime(), !0) : !1
            },
            isConnectedOrReconnecting: function(n) {
                return n.state === i.connectionState.connected || n.state === i.connectionState.reconnecting
            },
            ensureReconnectingState: function(t) {
                return h(t, i.connectionState.connected, i.connectionState.reconnecting) === !0 && n(t).triggerHandler(u.onReconnecting), t.state === i.connectionState.reconnecting
            },
            clearReconnectTimeout: function(n) {
                n && n._.reconnectTimeout && (t.clearTimeout(n._.reconnectTimeout), delete n._.reconnectTimeout)
            },
            verifyLastActive: function(t) {
                if ((new Date).getTime() - t._.lastActiveAt >= t.reconnectWindow) {
                    var r = i._.format(i.resources.reconnectWindowTimeout, new Date(t._.lastActiveAt), t.reconnectWindow);
                    return t.log(r), n(t).triggerHandler(u.onError, [i._.error(r, "TimeoutException")]), t.stop(!1, !1), !1
                }
                return !0
            },
            reconnect: function(n, u) {
                var f = i.transports[u];
                if (r.isConnectedOrReconnecting(n) && !n._.reconnectTimeout) {
                    if (!r.verifyLastActive(n)) return;
                    n._.reconnectTimeout = t.setTimeout(function() {
                        r.verifyLastActive(n) && (f.stop(n), r.ensureReconnectingState(n) && (n.log(u + " reconnecting."), f.start(n)))
                    }, n.reconnectDelay)
                }
            },
            handleParseFailure: function(t, r, f, e, o) {
                t.state === i.connectionState.connecting ? (t.log("Failed to parse server response while attempting to connect."), e()) : (n(t).triggerHandler(u.onError, [i._.transportError(i._.format(i.resources.parseFailed, r), t.transport, f, o)]), t.stop())
            },
            foreverFrame: {
                count: 0,
                connections: {}
            }
        }
    }(window.jQuery, window),
    function(n, t) {
        var r = n.signalR,
            u = n.signalR.events,
            f = n.signalR.changeState,
            i = r.transports._logic;
        r.transports.webSockets = {
            name: "webSockets",
            supportsKeepAlive: function() {
                return !0
            },
            send: function(t, f) {
                var e = i.stringifySend(t, f);
                try {
                    t.socket.send(e)
                } catch (o) {
                    n(t).triggerHandler(u.onError, [r._.transportError(r.resources.webSocketsInvalidState, t.transport, o, t.socket), f])
                }
            },
            start: function(e, o, s) {
                var h, c = !1,
                    l = this,
                    a = !o,
                    v = n(e);
                if (!t.WebSocket) {
                    s();
                    return
                }
                e.socket || (h = e.webSocketServerUrl ? e.webSocketServerUrl : e.wsProtocol + e.host, h += i.getUrl(e, this.name, a), e.log("Connecting to websocket endpoint '" + h + "'."), e.socket = new t.WebSocket(h), e.socket.onopen = function() {
                    c = !0;
                    e.log("Websocket opened.");
                    i.clearReconnectTimeout(e);
                    f(e, r.connectionState.reconnecting, r.connectionState.connected) === !0 && v.triggerHandler(u.onReconnect)
                }, e.socket.onclose = function(t) {
                    if (this === e.socket) {
                        if (c) typeof t.wasClean != "undefined" && t.wasClean === !1 ? (n(e).triggerHandler(u.onError, [r._.transportError(r.resources.webSocketClosed, e.transport, t)]), e.log("Unclean disconnect from websocket: " + t.reason || "[no reason given].")) : e.log("Websocket closed.");
                        else {
                            s ? s() : a && l.reconnect(e);
                            return
                        }
                        l.reconnect(e)
                    }
                }, e.socket.onmessage = function(t) {
                    var r;
                    try {
                        r = e._parseResponse(t.data)
                    } catch (u) {
                        i.handleParseFailure(e, t.data, u, s, t);
                        return
                    }
                    r && (n.isEmptyObject(r) || r.M ? i.processMessages(e, r, o) : i.triggerReceived(e, r))
                })
            },
            reconnect: function(n) {
                i.reconnect(n, this.name)
            },
            lostConnection: function(n) {
                this.reconnect(n)
            },
            stop: function(n) {
                i.clearReconnectTimeout(n);
                n.socket && (n.log("Closing the Websocket."), n.socket.close(), n.socket = null)
            },
            abort: function(n, t) {
                i.ajaxAbort(n, t)
            }
        }
    }(window.jQuery, window),
    function(n, t) {
        var i = n.signalR,
            u = n.signalR.events,
            e = n.signalR.changeState,
            r = i.transports._logic,
            f = function(n) {
                t.clearTimeout(n._.reconnectAttemptTimeoutHandle);
                delete n._.reconnectAttemptTimeoutHandle
            };
        i.transports.serverSentEvents = {
            name: "serverSentEvents",
            supportsKeepAlive: function() {
                return !0
            },
            timeOut: 3e3,
            start: function(o, s, h) {
                var c = this,
                    l = !1,
                    a = n(o),
                    v = !s,
                    y;
                if (o.eventSource && (o.log("The connection already has an event source. Stopping it."), o.stop()), !t.EventSource) {
                    h && (o.log("This browser doesn't support SSE."), h());
                    return
                }
                y = r.getUrl(o, this.name, v);
                try {
                    o.log("Attempting to connect to SSE endpoint '" + y + "'.");
                    o.eventSource = new t.EventSource(y, {
                        withCredentials: o.withCredentials
                    })
                } catch (p) {
                    o.log("EventSource failed trying to connect with error " + p.Message + ".");
                    h ? h() : (a.triggerHandler(u.onError, [i._.transportError(i.resources.eventSourceFailedToConnect, o.transport, p)]), v && c.reconnect(o));
                    return
                }
                v && (o._.reconnectAttemptTimeoutHandle = t.setTimeout(function() {
                    l === !1 && o.eventSource.readyState !== t.EventSource.OPEN && c.reconnect(o)
                }, c.timeOut));
                o.eventSource.addEventListener("open", function() {
                    o.log("EventSource connected.");
                    f(o);
                    r.clearReconnectTimeout(o);
                    l === !1 && (l = !0, e(o, i.connectionState.reconnecting, i.connectionState.connected) === !0 && a.triggerHandler(u.onReconnect))
                }, !1);
                o.eventSource.addEventListener("message", function(n) {
                    var t;
                    if (n.data !== "initialized") {
                        try {
                            t = o._parseResponse(n.data)
                        } catch (i) {
                            r.handleParseFailure(o, n.data, i, h, n);
                            return
                        }
                        r.processMessages(o, t, s)
                    }
                }, !1);
                o.eventSource.addEventListener("error", function(n) {
                    if (this === o.eventSource) {
                        if (!l) {
                            h && h();
                            return
                        }
                        o.log("EventSource readyState: " + o.eventSource.readyState + ".");
                        n.eventPhase === t.EventSource.CLOSED ? (o.log("EventSource reconnecting due to the server connection ending."), c.reconnect(o)) : (o.log("EventSource error."), a.triggerHandler(u.onError, [i._.transportError(i.resources.eventSourceError, o.transport, n)]))
                    }
                }, !1)
            },
            reconnect: function(n) {
                r.reconnect(n, this.name)
            },
            lostConnection: function(n) {
                this.reconnect(n)
            },
            send: function(n, t) {
                r.ajaxSend(n, t)
            },
            stop: function(n) {
                f(n);
                r.clearReconnectTimeout(n);
                n && n.eventSource && (n.log("EventSource calling close()."), n.eventSource.close(), n.eventSource = null, delete n.eventSource)
            },
            abort: function(n, t) {
                r.ajaxAbort(n, t)
            }
        }
    }(window.jQuery, window),
    function(n, t) {
        var r = n.signalR,
            e = n.signalR.events,
            o = n.signalR.changeState,
            i = r.transports._logic,
            u = function() {
                var n = t.document.createElement("iframe");
                return n.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;"), n
            },
            f = function() {
                var i = null,
                    f = 1e3,
                    n = 0;
                return {
                    prevent: function() {
                        r._.ieVersion <= 8 && (n === 0 && (i = t.setInterval(function() {
                            var n = u();
                            t.document.body.appendChild(n);
                            t.document.body.removeChild(n);
                            n = null
                        }, f)), n++)
                    },
                    cancel: function() {
                        n === 1 && t.clearInterval(i);
                        n > 0 && n--
                    }
                }
            }();
        r.transports.foreverFrame = {
            name: "foreverFrame",
            supportsKeepAlive: function() {
                return !0
            },
            iframeClearThreshold: 50,
            start: function(n, r, e) {
                var l = this,
                    s = i.foreverFrame.count += 1,
                    h, o = u(),
                    c = function() {
                        n.log("Forever frame iframe finished loading and is no longer receiving messages.");
                        l.reconnect(n)
                    };
                if (t.EventSource) {
                    e && (n.log("This browser supports SSE, skipping Forever Frame."), e());
                    return
                }
                o.setAttribute("data-signalr-connection-id", n.id);
                f.prevent();
                h = i.getUrl(n, this.name);
                h += "&frameId=" + s;
                t.document.body.appendChild(o);
                n.log("Binding to iframe's load event.");
                o.addEventListener ? o.addEventListener("load", c, !1) : o.attachEvent && o.attachEvent("onload", c);
                o.src = h;
                i.foreverFrame.connections[s] = n;
                n.frame = o;
                n.frameId = s;
                r && (n.onSuccess = function() {
                    n.log("Iframe transport started.");
                    r()
                })
            },
            reconnect: function(n) {
                var r = this;
                i.isConnectedOrReconnecting(n) && i.verifyLastActive(n) && t.setTimeout(function() {
                    if (i.verifyLastActive(n) && n.frame && i.ensureReconnectingState(n)) {
                        var u = n.frame,
                            t = i.getUrl(n, r.name, !0) + "&frameId=" + n.frameId;
                        n.log("Updating iframe src to '" + t + "'.");
                        u.src = t
                    }
                }, n.reconnectDelay)
            },
            lostConnection: function(n) {
                this.reconnect(n)
            },
            send: function(n, t) {
                i.ajaxSend(n, t)
            },
            receive: function(t, u) {
                var f, e, o;
                if (t.json !== t._originalJson && (u = t._originalJson.stringify(u)), o = t._parseResponse(u), i.processMessages(t, o, t.onSuccess), t.state === n.signalR.connectionState.connected && (t.frameMessageCount = (t.frameMessageCount || 0) + 1, t.frameMessageCount > r.transports.foreverFrame.iframeClearThreshold && (t.frameMessageCount = 0, f = t.frame.contentWindow || t.frame.contentDocument, f && f.document && f.document.body)))
                    for (e = f.document.body; e.firstChild;) e.removeChild(e.firstChild)
            },
            stop: function(n) {
                var r = null;
                if (f.cancel(), n.frame) {
                    if (n.frame.stop) n.frame.stop();
                    else try {
                        r = n.frame.contentWindow || n.frame.contentDocument;
                        r.document && r.document.execCommand && r.document.execCommand("Stop")
                    } catch (u) {
                        n.log("Error occured when stopping foreverFrame transport. Message = " + u.message + ".")
                    }
                    n.frame.parentNode === t.document.body && t.document.body.removeChild(n.frame);
                    delete i.foreverFrame.connections[n.frameId];
                    n.frame = null;
                    n.frameId = null;
                    delete n.frame;
                    delete n.frameId;
                    delete n.onSuccess;
                    delete n.frameMessageCount;
                    n.log("Stopping forever frame.")
                }
            },
            abort: function(n, t) {
                i.ajaxAbort(n, t)
            },
            getConnection: function(n) {
                return i.foreverFrame.connections[n]
            },
            started: function(t) {
                o(t, r.connectionState.reconnecting, r.connectionState.connected) === !0 && n(t).triggerHandler(e.onReconnect)
            }
        }
    }(window.jQuery, window),
    function(n, t) {
        var r = n.signalR,
            u = n.signalR.events,
            e = n.signalR.changeState,
            f = n.signalR.isDisconnecting,
            i = r.transports._logic,
            o = function() {
                try {
                    return "onprogress" in new t.XMLHttpRequest
                } catch (n) {
                    return !1
                }
            }();
        r.transports.longPolling = {
            name: "longPolling",
            supportsKeepAlive: function(n) {
                return o && n.ajaxDataType !== "jsonp" && n._.longPollDelay === 0
            },
            reconnectDelay: 3e3,
            start: function(o, s, h) {
                var a = this,
                    v = function() {
                        v = n.noop;
                        h = null;
                        o.log("LongPolling connected.");
                        s()
                    },
                    y = function() {
                        return h ? (h(), h = null, o.log("LongPolling failed to connect."), !0) : !1
                    },
                    c = o._,
                    l = 0,
                    p = function(i) {
                        t.clearTimeout(c.reconnectTimeoutId);
                        c.reconnectTimeoutId = null;
                        e(i, r.connectionState.reconnecting, r.connectionState.connected) === !0 && (i.log("Raising the reconnect event"), n(i).triggerHandler(u.onReconnect))
                    },
                    w = 36e5;
                o.pollXhr && (o.log("Polling xhr requests already exists, aborting."), o.stop());
                o.messageId = null;
                c.reconnectTimeoutId = null;
                c.pollTimeoutId = t.setTimeout(function() {
                    (function e(s, h) {
                        var d = s.messageId,
                            g = d === null,
                            b = !g,
                            nt = !h,
                            k = i.getUrl(s, a.name, b, nt);
                        f(s) !== !0 && (o.log("Opening long polling request to '" + k + "'."), s.pollXhr = i.ajax(o, {
                            xhrFields: {
                                onprogress: function() {
                                    i.markLastMessage(o)
                                }
                            },
                            url: k,
                            success: function(r) {
                                var h, w = 0,
                                    u, a;
                                o.log("Long poll complete.");
                                l = 0;
                                try {
                                    h = o._parseResponse(r)
                                } catch (b) {
                                    i.handleParseFailure(s, r, b, y, s.pollXhr);
                                    return
                                }(c.reconnectTimeoutId !== null && p(s), h && (u = i.maximizePersistentResponse(h)), i.processMessages(s, h, v), u && n.type(u.LongPollDelay) === "number" && (w = u.LongPollDelay), u && u.Disconnect) || f(s) !== !0 && (a = u && u.ShouldReconnect, !a || i.ensureReconnectingState(s)) && (w > 0 ? c.pollTimeoutId = t.setTimeout(function() {
                                    e(s, a)
                                }, w) : e(s, a))
                            },
                            error: function(f, h) {
                                if (t.clearTimeout(c.reconnectTimeoutId), c.reconnectTimeoutId = null, h === "abort") {
                                    o.log("Aborted xhr request.");
                                    return
                                }
                                if (!y()) {
                                    if (l++, o.state !== r.connectionState.reconnecting && (o.log("An error occurred using longPolling. Status = " + h + ".  Response = " + f.responseText + "."), n(s).triggerHandler(u.onError, [r._.transportError(r.resources.longPollFailed, o.transport, f, s.pollXhr)])), (o.state === r.connectionState.connected || o.state === r.connectionState.reconnecting) && !i.verifyLastActive(o)) return;
                                    if (!i.ensureReconnectingState(s)) return;
                                    c.pollTimeoutId = t.setTimeout(function() {
                                        e(s, !0)
                                    }, a.reconnectDelay)
                                }
                            }
                        }), b && h === !0 && (c.reconnectTimeoutId = t.setTimeout(function() {
                            p(s)
                        }, Math.min(1e3 * (Math.pow(2, l) - 1), w))))
                    })(o)
                }, 250)
            },
            lostConnection: function(n) {
                n.pollXhr && n.pollXhr.abort("lostConnection")
            },
            send: function(n, t) {
                i.ajaxSend(n, t)
            },
            stop: function(n) {
                t.clearTimeout(n._.pollTimeoutId);
                t.clearTimeout(n._.reconnectTimeoutId);
                delete n._.pollTimeoutId;
                delete n._.reconnectTimeoutId;
                n.pollXhr && (n.pollXhr.abort(), n.pollXhr = null, delete n.pollXhr)
            },
            abort: function(n, t) {
                i.ajaxAbort(n, t)
            }
        }
    }(window.jQuery, window),
    function(n) {
        function r(n) {
            return n + s
        }

        function e(n, t, i) {
            for (var f = n.length, u = [], r = 0; r < f; r += 1) n.hasOwnProperty(r) && (u[r] = t.call(i, n[r], r, n));
            return u
        }

        function o(t) {
            return n.isFunction(t) ? null : n.type(t) === "undefined" ? null : t
        }

        function u(n) {
            for (var t in n)
                if (n.hasOwnProperty(t)) return !0;
            return !1
        }

        function f(n, t) {
            var i = n._.invocationCallbacks,
                r, f;
            u(i) && n.log("Clearing hub invocation callbacks with error: " + t + ".");
            n._.invocationCallbackId = 0;
            delete n._.invocationCallbacks;
            n._.invocationCallbacks = {};
            for (f in i) r = i[f], r.method.call(r.scope, {
                E: t
            })
        }

        function i(n, t) {
            return new i.fn.init(n, t)
        }

        function t(i, r) {
            var u = {
                qs: null,
                logging: !1,
                useDefaultPath: !0
            };
            return n.extend(u, r), (!i || u.useDefaultPath) && (i = (i || "") + "/signalr"), new t.fn.init(i, u)
        }
        var s = ".hubProxy",
            h = n.signalR;
        i.fn = i.prototype = {
            init: function(n, t) {
                this.state = {};
                this.connection = n;
                this.hubName = t;
                this._ = {
                    callbackMap: {}
                }
            },
            hasSubscriptions: function() {
                return u(this._.callbackMap)
            },
            on: function(t, i) {
                var u = this,
                    f = u._.callbackMap;
                return t = t.toLowerCase(), f[t] || (f[t] = {}), f[t][i] = function(n, t) {
                    i.apply(u, t)
                }, n(u).bind(r(t), f[t][i]), u
            },
            off: function(t, i) {
                var e = this,
                    o = e._.callbackMap,
                    f;
                return t = t.toLowerCase(), f = o[t], f && (f[i] ? (n(e).unbind(r(t), f[i]), delete f[i], u(f) || delete o[t]) : i || (n(e).unbind(r(t)), delete o[t])), e
            },
            invoke: function(t) {
                var i = this,
                    r = i.connection,
                    s = n.makeArray(arguments).slice(1),
                    c = e(s, o),
                    f = {
                        H: i.hubName,
                        M: t,
                        A: c,
                        I: r._.invocationCallbackId
                    },
                    u = n.Deferred(),
                    l = function(f) {
                        var e = i._maximizeHubResponse(f),
                            s, o;
                        n.extend(i.state, e.State);
                        e.Progress ? u.notifyWith ? u.notifyWith(i, [e.Progress.Data]) : r._.progressjQueryVersionLogged || (r.log("A hub method invocation progress update was received but the version of jQuery in use (" + n.prototype.jquery + ") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications."), r._.progressjQueryVersionLogged = !0) : e.Error ? (e.StackTrace && r.log(e.Error + "\n" + e.StackTrace + "."), s = e.IsHubException ? "HubException" : "Exception", o = h._.error(e.Error, s), o.data = e.ErrorData, r.log(i.hubName + "." + t + " failed to execute. Error: " + o.message), u.rejectWith(i, [o])) : (r.log("Invoked " + i.hubName + "." + t), u.resolveWith(i, [e.Result]))
                    };
                return r._.invocationCallbacks[r._.invocationCallbackId.toString()] = {
                    scope: i,
                    method: l
                }, r._.invocationCallbackId += 1, n.isEmptyObject(i.state) || (f.S = i.state), r.log("Invoking " + i.hubName + "." + t), r.send(f), u.promise()
            },
            _maximizeHubResponse: function(n) {
                return {
                    State: n.S,
                    Result: n.R,
                    Progress: n.P ? {
                        Id: n.P.I,
                        Data: n.P.D
                    } : null,
                    Id: n.I,
                    IsHubException: n.H,
                    Error: n.E,
                    StackTrace: n.T,
                    ErrorData: n.D
                }
            }
        };
        i.fn.init.prototype = i.fn;
        t.fn = t.prototype = n.connection();
        t.fn.init = function(t, i) {
            var e = {
                    qs: null,
                    logging: !1,
                    useDefaultPath: !0
                },
                u = this;
            n.extend(e, i);
            n.signalR.fn.init.call(u, t, e.qs, e.logging);
            u.proxies = {};
            u._.invocationCallbackId = 0;
            u._.invocationCallbacks = {};
            u.received(function(t) {
                var f, o, e, i, s, h;
                t && (typeof t.P != "undefined" ? (e = t.P.I.toString(), i = u._.invocationCallbacks[e], i && i.method.call(i.scope, t)) : typeof t.I != "undefined" ? (e = t.I.toString(), i = u._.invocationCallbacks[e], i && (u._.invocationCallbacks[e] = null, delete u._.invocationCallbacks[e], i.method.call(i.scope, t))) : (f = this._maximizeClientHubInvocation(t), u.log("Triggering client hub event '" + f.Method + "' on hub '" + f.Hub + "'."), s = f.Hub.toLowerCase(), h = f.Method.toLowerCase(), o = this.proxies[s], n.extend(o.state, f.State), n(o).triggerHandler(r(h), [f.Args])))
            });
            u.error(function(n, t) {
                var i, r;
                t && (i = t.I, r = u._.invocationCallbacks[i], r && (u._.invocationCallbacks[i] = null, delete u._.invocationCallbacks[i], r.method.call(r.scope, {
                    E: n
                })))
            });
            u.reconnecting(function() {
                u.transport && u.transport.name === "webSockets" && f(u, "Connection started reconnecting before invocation result was received.")
            });
            u.disconnected(function() {
                f(u, "Connection was disconnected before invocation result was received.")
            })
        };
        t.fn._maximizeClientHubInvocation = function(n) {
            return {
                Hub: n.H,
                Method: n.M,
                Args: n.A,
                State: n.S
            }
        };
        t.fn._registerSubscribedHubs = function() {
            var t = this;
            t._subscribedToHubs || (t._subscribedToHubs = !0, t.starting(function() {
                var i = [];
                n.each(t.proxies, function(n) {
                    this.hasSubscriptions() && (i.push({
                        name: n
                    }), t.log("Client subscribed to hub '" + n + "'."))
                });
                i.length === 0 && t.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to.");
                t.data = t.json.stringify(i)
            }))
        };
        t.fn.createHubProxy = function(n) {
            n = n.toLowerCase();
            var t = this.proxies[n];
            return t || (t = i(this, n), this.proxies[n] = t), this._registerSubscribedHubs(), t
        };
        t.fn.init.prototype = t.fn;
        n.hubConnection = t
    }(window.jQuery, window),
    function(n) {
        n.signalR.version = "2.1.1"
    }(window.jQuery),
    function($) {
        var n, f, h = 1,
            t, i = this,
            r = !1,
            u = "postMessage",
            e = "addEventListener",
            o, s = i[u];
        $[u] = function(n, t, i) {
            t && (n = typeof n == "string" ? n : $.param(n), i = i || parent, s ? i[u](n, t.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : t && (i.location = t.replace(/#.*$/, "") + "#" + +new Date + h++ + "&" + n))
        };
        $.receiveMessage = o = function(u, h, c) {
            s ? (u && (t && o(), t = function(n) {
                if (typeof h == "string" && n.origin !== h || $.isFunction(h) && h(n.origin) === r) return r;
                u(n)
            }), i[e] ? i[u ? e : "removeEventListener"]("message", t, r) : i[u ? "attachEvent" : "detachEvent"]("onmessage", t)) : (n && clearInterval(n), n = null, u && (c = typeof h == "number" ? h : typeof c == "number" ? c : 100, n = setInterval(function() {
                var n = document.location.hash,
                    t = /^#?\d+&/;
                n !== f && t.test(n) && (f = n, u({
                    data: n.replace(t, "")
                }))
            }, c)))
        }
    }(jQuery),
    function(n, t, i, r) {
        "use strict";
        var u = function(t, i) {
            this.widget = "";
            this.$element = n(t);
            this.defaultTime = i.defaultTime;
            this.disableFocus = i.disableFocus;
            this.isOpen = i.isOpen;
            this.minuteStep = i.minuteStep;
            this.modalBackdrop = i.modalBackdrop;
            this.secondStep = i.secondStep;
            this.showInputs = i.showInputs;
            this.showMeridian = i.showMeridian;
            this.showSeconds = i.showSeconds;
            this.template = i.template;
            this.appendWidgetTo = i.appendWidgetTo;
            this.upArrowStyle = i.upArrowStyle;
            this.downArrowStyle = i.downArrowStyle;
            this.containerClass = i.containerClass;
            this.timeSeparator = i.timeSeparator;
            this._init()
        };
        u.prototype = {
            constructor: u,
            _init: function() {
                var t = this;
                if (this.$element.parent().hasClass("input-group")) {
                    if (this.$element.parent(".input-group").find(".input-group-addon").length) this.$element.parent(".input-group").find(".input-group-addon").on({
                        mousedown: n.proxy(this.showWidget, this)
                    });
                    else this.$element.closest(this.containerClass).find(".input-group-addon").on({
                        mousedown: n.proxy(this.showWidget, this)
                    });
                    this.$element.on({
                        "focus.timepicker": n.proxy(this.highlightUnit, this),
                        mousedown: n.proxy(this.highlightUnit, this),
                        "keydown.timepicker": n.proxy(this.elementKeydown, this),
                        "blur.timepicker": n.proxy(this.blurElement, this)
                    })
                } else if (this.template) this.$element.on({
                    "focus.timepicker": n.proxy(this.showWidget, this),
                    mousedown: n.proxy(this.showWidget, this),
                    "blur.timepicker": n.proxy(this.blurElement, this)
                });
                else this.$element.on({
                    "focus.timepicker": n.proxy(this.highlightUnit, this),
                    mousedown: n.proxy(this.highlightUnit, this),
                    "keydown.timepicker": n.proxy(this.elementKeydown, this),
                    "blur.timepicker": n.proxy(this.blurElement, this)
                });
                this.$widget = this.template !== !1 ? n(this.getTemplate()).prependTo(this.$element.parents(this.appendWidgetTo)).on("click", n.proxy(this.widgetClick, this)) : !1;
                this.showInputs && this.$widget !== !1 && this.$widget.find("input").each(function() {
                    n(this).on({
                        mousedown: function() {
                            n(this).select()
                        },
                        "keydown.timepicker": n.proxy(t.widgetKeydown, t)
                    })
                });
                this.bindClickHandlers();
                this.setDefaultTime(this.defaultTime)
            },
            bindClickHandlers: function() {
                if (this.$element.parent().hasClass("input-group")) {
                    if (this.$element.parent(".input-group").find(".input-group-addon").length) this.$element.parent(".input-group").find(".input-group-addon").one({
                        mousedown: n.proxy(this.showWidget, this)
                    });
                    else this.$element.closest(this.containerClass).find(".input-group-addon").one({
                        mousedown: n.proxy(this.showWidget, this)
                    });
                    this.$element.one({
                        mousedown: n.proxy(this.highlightUnit, this)
                    })
                } else if (this.template) this.$element.one({
                    mousedown: n.proxy(this.showWidget, this)
                });
                else this.$element.one({
                    mousedown: n.proxy(this.highlightUnit, this)
                });
                this.showInputs && this.$widget !== !1 && this.$widget.find("input").each(function() {
                    n(this).one({
                        mousedown: function() {
                            n(this).select()
                        }
                    })
                })
            },
            blurElement: function() {
                this.highlightedUnit = r;
                this.updateFromElementVal()
            },
            decrementHour: function() {
                if (this.showMeridian)
                    if (this.hour === 1) this.hour = 12;
                    else {
                        if (this.hour === 12) return this.hour--, this.toggleMeridian();
                        if (this.hour === 0) return this.hour = 11, this.toggleMeridian();
                        this.hour--
                    }
                else this.hour === 0 ? this.hour = 23 : this.hour--
            },
            decrementMinute: function(n) {
                var t;
                t = n ? this.minute - n : this.minute - this.minuteStep;
                t < 0 ? (this.decrementHour(), this.minute = t + 60) : this.minute = t
            },
            decrementSecond: function() {
                var n = this.second - this.secondStep;
                n < 0 ? (this.decrementMinute(!0), this.second = n + 60) : this.second = n
            },
            elementKeydown: function(n) {
                switch (n.keyCode) {
                    case 9:
                        this.updateFromElementVal();
                        switch (this.highlightedUnit) {
                            case "hour":
                                n.preventDefault();
                                this.highlightNextUnit();
                                break;
                            case "minute":
                                (this.showMeridian || this.showSeconds) && (n.preventDefault(), this.highlightNextUnit());
                                break;
                            case "second":
                                this.showMeridian && (n.preventDefault(), this.highlightNextUnit())
                        }
                        break;
                    case 27:
                        this.updateFromElementVal();
                        break;
                    case 37:
                        n.preventDefault();
                        this.highlightPrevUnit();
                        this.updateFromElementVal();
                        break;
                    case 38:
                        n.preventDefault();
                        switch (this.highlightedUnit) {
                            case "hour":
                                this.incrementHour();
                                this.highlightHour();
                                break;
                            case "minute":
                                this.incrementMinute();
                                this.highlightMinute();
                                break;
                            case "second":
                                this.incrementSecond();
                                this.highlightSecond();
                                break;
                            case "meridian":
                                this.toggleMeridian();
                                this.highlightMeridian()
                        }
                        break;
                    case 39:
                        n.preventDefault();
                        this.updateFromElementVal();
                        this.highlightNextUnit();
                        break;
                    case 40:
                        n.preventDefault();
                        switch (this.highlightedUnit) {
                            case "hour":
                                this.decrementHour();
                                this.highlightHour();
                                break;
                            case "minute":
                                this.decrementMinute();
                                this.highlightMinute();
                                break;
                            case "second":
                                this.decrementSecond();
                                this.highlightSecond();
                                break;
                            case "meridian":
                                this.toggleMeridian();
                                this.highlightMeridian()
                        }
                }
            },
            formatTime: function(n, t, i, r) {
                return n = n < 10 ? "0" + n : n, t = t < 10 ? "0" + t : t, i = i < 10 ? "0" + i : i, n + ":" + t + (this.showSeconds ? ":" + i : "") + (this.showMeridian ? " " + r : "")
            },
            getCursorPosition: function() {
                var n = this.$element.get(0),
                    t, r;
                return "selectionStart" in n ? n.selectionStart : i.selection ? (n.focus(), t = i.selection.createRange(), r = i.selection.createRange().text.length, t.moveStart("character", -n.value.length), t.text.length - r) : void 0
            },
            getTemplate: function() {
                var n, t, i, r, u, f;
                this.showInputs ? (t = '<input type="text" name="hour" class="bootstrap-timepicker-hour form-control" maxlength="2"/>', i = '<input type="text" name="minute" class="bootstrap-timepicker-minute form-control" maxlength="2"/>', r = '<input type="text" name="second" class="bootstrap-timepicker-second form-control" maxlength="2"/>', u = '<input type="text" name="meridian" class="bootstrap-timepicker-meridian form-control" maxlength="2"/>') : (t = '<span class="bootstrap-timepicker-hour"><\/span>', i = '<span class="bootstrap-timepicker-minute"><\/span>', r = '<span class="bootstrap-timepicker-second"><\/span>', u = '<span class="bootstrap-timepicker-meridian"><\/span>');
                f = '<table><tr><td><a href="#" data-action="incrementHour"><i class="' + this.upArrowStyle + '"><\/i><\/a><\/td><td class="separator">&nbsp;<\/td><td><a href="#" data-action="incrementMinute"><i class="' + this.upArrowStyle + '"><\/i><\/a><\/td>' + (this.showSeconds ? '<td class="separator">&nbsp;<\/td><td><a href="#" data-action="incrementSecond"><i class="' + this.upArrowStyle + '"><\/i><\/a><\/td>' : "") + (this.showMeridian ? '<td class="separator">&nbsp;<\/td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="' + this.upArrowStyle + '"><\/i><\/a><\/td>' : "") + "<\/tr><tr><td>" + t + '<\/td> <td class="separator">' + this.timeSeparator + "<\/td><td>" + i + "<\/td> " + (this.showSeconds ? '<td class="separator">' + this.timeSeparator + "<\/td><td>" + r + "<\/td>" : "") + (this.showMeridian ? '<td class="separator">&nbsp;<\/td><td>' + u + "<\/td>" : "") + '<\/tr><tr><td><a href="#" data-action="decrementHour"><i class="' + this.downArrowStyle + '"><\/i><\/a><\/td><td class="separator"><\/td><td><a href="#" data-action="decrementMinute"><i class="' + this.downArrowStyle + '"><\/i><\/a><\/td>' + (this.showSeconds ? '<td class="separator">&nbsp;<\/td><td><a href="#" data-action="decrementSecond"><i class="' + this.downArrowStyle + '"><\/i><\/a><\/td>' : "") + (this.showMeridian ? '<td class="separator">&nbsp;<\/td><td><a href="#" data-action="toggleMeridian"><i class="' + this.downArrowStyle + '"><\/i><\/a><\/td>' : "") + "<\/tr><\/table>";
                switch (this.template) {
                    case "modal":
                        n = '<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="' + (this.modalBackdrop ? "true" : "false") + '"><div class="modal-header"><a href="#" class="close" data-dismiss="modal">Ã—<\/a><h3>Pick a Time<\/h3><\/div><div class="modal-content">' + f + '<\/div><div class="modal-footer"><a href="#" class="btn btn-primary" data-dismiss="modal">OK<\/a><\/div><\/div>';
                        break;
                    case "dropdown":
                        n = '<div class="bootstrap-timepicker-widget dropdown-menu">' + f + "<\/div>"
                }
                return n
            },
            getTime: function() {
                return this.formatTime(this.hour, this.minute, this.second, this.meridian)
            },
            hideWidget: function() {
                this.isOpen !== !1 && (this.showInputs && this.updateFromWidgetInputs(), this.$element.trigger({
                    type: "hide.timepicker",
                    time: {
                        value: this.getTime(),
                        hours: this.hour,
                        minutes: this.minute,
                        seconds: this.second,
                        meridian: this.meridian
                    }
                }), this.template === "modal" && this.$widget.modal ? this.$widget.modal("hide") : (this.$widget.removeClass("open"), this.$widget.hide()), n(i).off("mousedown.timepicker"), this.isOpen = !1, this.bindClickHandlers())
            },
            highlightUnit: function() {
                this.position = this.getCursorPosition();
                this.position >= 0 && this.position <= 2 ? this.highlightHour() : this.position >= 3 && this.position <= 5 ? this.highlightMinute() : this.position >= 6 && this.position <= 8 ? this.showSeconds ? this.highlightSecond() : this.highlightMeridian() : this.position >= 9 && this.position <= 11 && this.highlightMeridian()
            },
            highlightNextUnit: function() {
                switch (this.highlightedUnit) {
                    case "hour":
                        this.highlightMinute();
                        break;
                    case "minute":
                        this.showSeconds ? this.highlightSecond() : this.showMeridian ? this.highlightMeridian() : this.highlightHour();
                        break;
                    case "second":
                        this.showMeridian ? this.highlightMeridian() : this.highlightHour();
                        break;
                    case "meridian":
                        this.highlightHour()
                }
            },
            highlightPrevUnit: function() {
                switch (this.highlightedUnit) {
                    case "hour":
                        this.highlightMeridian();
                        break;
                    case "minute":
                        this.highlightHour();
                        break;
                    case "second":
                        this.highlightMinute();
                        break;
                    case "meridian":
                        this.showSeconds ? this.highlightSecond() : this.highlightMinute()
                }
            },
            highlightHour: function() {
                var n = this.$element.get(0);
                this.highlightedUnit = "hour";
                n.setSelectionRange && setTimeout(function() {
                    n.setSelectionRange(0, 2)
                }, 0)
            },
            highlightMinute: function() {
                var n = this.$element.get(0);
                this.highlightedUnit = "minute";
                n.setSelectionRange && setTimeout(function() {
                    n.setSelectionRange(3, 5)
                }, 0)
            },
            highlightSecond: function() {
                var n = this.$element.get(0);
                this.highlightedUnit = "second";
                n.setSelectionRange && setTimeout(function() {
                    n.setSelectionRange(6, 8)
                }, 0)
            },
            highlightMeridian: function() {
                var n = this.$element.get(0);
                this.highlightedUnit = "meridian";
                n.setSelectionRange && (this.showSeconds ? setTimeout(function() {
                    n.setSelectionRange(9, 11)
                }, 0) : setTimeout(function() {
                    n.setSelectionRange(6, 8)
                }, 0))
            },
            incrementHour: function() {
                if (this.showMeridian) {
                    if (this.hour === 11) return this.hour++, this.toggleMeridian();
                    this.hour === 12 && (this.hour = 0)
                }
                if (this.hour === 23) {
                    this.hour = 0;
                    return
                }
                this.hour++
            },
            incrementMinute: function(n) {
                var t;
                t = n ? this.minute + n : this.minute + this.minuteStep - this.minute % this.minuteStep;
                t > 59 ? (this.incrementHour(), this.minute = t - 60) : this.minute = t
            },
            incrementSecond: function() {
                var n = this.second + this.secondStep - this.second % this.secondStep;
                n > 59 ? (this.incrementMinute(!0), this.second = n - 60) : this.second = n
            },
            remove: function() {
                n("document").off(".timepicker");
                this.$widget && this.$widget.remove();
                delete this.$element.data().timepicker
            },
            setDefaultTime: function(n) {
                if (this.$element.val()) this.updateFromElementVal();
                else if (n === "current") {
                    var i = new Date,
                        t = i.getHours(),
                        u = Math.floor(i.getMinutes() / this.minuteStep) * this.minuteStep,
                        f = Math.floor(i.getSeconds() / this.secondStep) * this.secondStep,
                        r = "AM";
                    this.showMeridian && (t === 0 ? t = 12 : t >= 12 ? (t > 12 && (t = t - 12), r = "PM") : r = "AM");
                    this.hour = t;
                    this.minute = u;
                    this.second = f;
                    this.meridian = r;
                    this.update()
                } else n === !1 ? (this.hour = 0, this.minute = 0, this.second = 0, this.meridian = "AM") : this.setTime(n)
            },
            setTime: function(n) {
                var i, t;
                this.showMeridian ? (i = n.split(" "), t = i[0].split(":"), this.meridian = i[1]) : t = n.split(":");
                this.hour = parseInt(t[0], 10);
                this.minute = parseInt(t[1], 10);
                this.second = parseInt(t[2], 10);
                isNaN(this.hour) && (this.hour = 0);
                isNaN(this.minute) && (this.minute = 0);
                this.showMeridian ? (this.hour > 12 ? this.hour = 12 : this.hour < 1 && (this.hour = 12), this.meridian === "am" || this.meridian === "a" ? this.meridian = "AM" : (this.meridian === "pm" || this.meridian === "p") && (this.meridian = "PM"), this.meridian !== "AM" && this.meridian !== "PM" && (this.meridian = "AM")) : this.hour >= 24 ? this.hour = 23 : this.hour < 0 && (this.hour = 0);
                this.minute < 0 ? this.minute = 0 : this.minute >= 60 && (this.minute = 59);
                this.showSeconds && (isNaN(this.second) ? this.second = 0 : this.second < 0 ? this.second = 0 : this.second >= 60 && (this.second = 59));
                this.update()
            },
            showWidget: function(t) {
                if ((t.stopPropagation(), !this.isOpen) && !this.$element.is(":disabled")) {
                    var r = this;
                    n(i).on("mousedown.timepicker touchstart.timepicker", function(t) {
                        n(t.target).closest(".bootstrap-timepicker-widget").length === 0 && r.hideWidget()
                    });
                    if (this.$element.trigger({
                            type: "show.timepicker",
                            time: {
                                value: this.getTime(),
                                hours: this.hour,
                                minutes: this.minute,
                                seconds: this.second,
                                meridian: this.meridian
                            }
                        }), this.disableFocus && this.$element.blur(), this.updateFromElementVal(), this.template === "modal" && this.$widget.modal) this.$widget.modal("show").on("hidden", n.proxy(this.hideWidget, this));
                    else this.isOpen === !1 && (this.$widget.addClass("open"), this.$widget.show());
                    this.isOpen = !0
                }
            },
            toggleMeridian: function() {
                this.meridian = this.meridian === "AM" ? "PM" : "AM";
                this.update()
            },
            update: function() {
                this.$element.trigger({
                    type: "changeTime.timepicker",
                    time: {
                        value: this.getTime(),
                        hours: this.hour,
                        minutes: this.minute,
                        seconds: this.second,
                        meridian: this.meridian
                    }
                });
                this.updateElement();
                this.updateWidget()
            },
            updateElement: function() {
                this.$element.val(this.getTime()).change()
            },
            updateFromElementVal: function() {
                var n = this.$element.val();
                n && this.setTime(n)
            },
            updateWidget: function() {
                if (this.$widget !== !1) {
                    var n = this.hour < 10 ? "0" + this.hour : this.hour,
                        t = this.minute < 10 ? "0" + this.minute : this.minute,
                        i = this.second < 10 ? "0" + this.second : this.second;
                    this.showInputs ? (this.$widget.find("input.bootstrap-timepicker-hour").val(n), this.$widget.find("input.bootstrap-timepicker-minute").val(t), this.showSeconds && this.$widget.find("input.bootstrap-timepicker-second").val(i), this.showMeridian && this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)) : (this.$widget.find("span.bootstrap-timepicker-hour").text(n), this.$widget.find("span.bootstrap-timepicker-minute").text(t), this.showSeconds && this.$widget.find("span.bootstrap-timepicker-second").text(i), this.showMeridian && this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))
                }
            },
            updateFromWidgetInputs: function() {
                if (this.$widget !== !1) {
                    var t = n("input.bootstrap-timepicker-hour", this.$widget).val() + ":" + n("input.bootstrap-timepicker-minute", this.$widget).val() + (this.showSeconds ? ":" + n("input.bootstrap-timepicker-second", this.$widget).val() : "") + (this.showMeridian ? " " + n("input.bootstrap-timepicker-meridian", this.$widget).val() : "");
                    this.setTime(t)
                }
            },
            widgetClick: function(t) {
                t.stopPropagation();
                t.preventDefault();
                var i = n(t.target).closest("a").data("action");
                i && (this[i](), this.update())
            },
            widgetKeydown: function(t) {
                var r = n(t.target).closest("input"),
                    i = r.attr("name");
                switch (t.keyCode) {
                    case 9:
                        if (this.showMeridian) {
                            if (i === "meridian") return this.hideWidget()
                        } else if (this.showSeconds) {
                            if (i === "second") return this.hideWidget()
                        } else if (i === "minute") return this.hideWidget();
                        this.updateFromWidgetInputs();
                        break;
                    case 27:
                        this.hideWidget();
                        break;
                    case 38:
                        t.preventDefault();
                        switch (i) {
                            case "hour":
                                this.incrementHour();
                                this.update();
                                break;
                            case "minute":
                                this.incrementMinute();
                                this.update();
                                break;
                            case "second":
                                this.incrementSecond();
                                this.update();
                                break;
                            case "meridian":
                                this.toggleMeridian();
                                this.update()
                        }
                        break;
                    case 40:
                        t.preventDefault();
                        switch (i) {
                            case "hour":
                                this.decrementHour();
                                this.update();
                                break;
                            case "minute":
                                this.decrementMinute();
                                this.update();
                                break;
                            case "second":
                                this.decrementSecond();
                                this.update();
                                break;
                            case "meridian":
                                this.toggleMeridian();
                                this.update()
                        }
                }
            }
        };
        n.fn.timepicker = function(t) {
            var i = Array.apply(null, arguments);
            return i.shift(), this.each(function() {
                var f = n(this),
                    r = f.data("timepicker"),
                    e = typeof t == "object" && t;
                r || f.data("timepicker", r = new u(this, n.extend({}, n.fn.timepicker.defaults, e, n(this).data())));
                typeof t == "string" && r[t].apply(r, i)
            })
        };
        n.fn.timepicker.defaults = {
            defaultTime: "current",
            disableFocus: !1,
            isOpen: !1,
            minuteStep: 15,
            modalBackdrop: !1,
            secondStep: 15,
            showSeconds: !1,
            showInputs: !0,
            showMeridian: !0,
            template: "dropdown",
            appendWidgetTo: ".bootstrap-timepicker",
            upArrowStyle: "fa fa-arrow-up fa-2x",
            downArrowStyle: "fa fa-arrow-down fa-2x",
            containerClass: "bootstrap-timepicker",
            timeSeparator: ":"
        };
        n.fn.timepicker.Constructor = u
    }(jQuery, window, document);
embedGenTimeoutId = null;
eventPollingsInterval = 12e4;
$(function() {
    var t = 288e5,
        r = $.connection.eventStateHub,
        u = $("#eventId").val(),
        i = setTimeout(stopHub, t),
        n;
    r.client.eventStateChanged = function(n, r, f, e, o) {
        u == n && (stateChanged(r, f, e, o), clearTimeout(i), i = setTimeout(stopHub, t))
    };
    $.connection.hub.start().done(function() {});
    $(".embed-code").hide();
    $(".embed-terms .btn-agree").on("click", function(n) {
        n.preventDefault();
        $(".embed-terms").fadeOut();
        $(".embed-code").fadeIn()
    });
    n = {
        defaultTime: !1,
        showSeconds: !0,
        showMeridian: !0,
        minuteStep: 1,
        secondStep: 1
    };
    $("#startTime").timepicker(n);
    $("#endTime").timepicker(n);
    $(".embed-code").hide();
    $(".embed-terms .btn-agree").bind("click", function(n) {
        n.preventDefault();
        $(".embed-terms").fadeOut();
        $(".embed-code").fadeIn()
    });
    updateSocialLinks(null, $("#url").val());
    $("#url").bind("updated-url", updateSocialLinks);
    updateClipping();
    selectableEmbedCode();
    audiOnlySwitch();
    pollEvent()
});
var stackPos = "top",
    logPos = "top",
    lastClickedTimecode = null,
    highlightItem = !0;
$(function() {
    var n = $.connection.eventStateHub,
        t = $("#eventId").val();
    $("#ContainsLogMoments").val() == "True" && $("#DefaultToStackTab").val() == "False" && ($("#stacks").removeClass("active").removeClass("in"), $("#logs").addClass("active").addClass("in"));
    n.client.logUpdate = function(n, i) {
        if (t == i) {
            if ($("#ContainsLogMoments").val() == "False") {
                $("#LiveLogging").val("True");
                $("#index-message").removeClass("hidden");
                $("#ContainsLogMoments").val("True");
                $("#logTab").removeClass("invisible");
                $("#logTab a").tab("show");
                refreshLogMoments();
                return
            }
            n == "Add" ? appendLogMoments() : refreshLogMoments()
        }
    };
    $.connection.hub.start().done(function() {});
    scrollStackAndLogs();
    refreshStackInterval();
    $(document).on("tap", ".logouter", logItemClicked);
    $(document).on("click", ".logouter", logItemClicked);
    $(document).on("click", "#seekToLiveButton", seekToLive)
});
var captchaValid = !1,
    timesValid = !0,
    keepError = !1;
$(function() {
    initTermsAndConditions();
    initEnableEmbed();
    initSetShareTime();
    initSetDownloadTime();
    initSetClipboard();
    initSetFileType();
    initEmailValid()
});
$(function() {
    initInputMask()
});
androidInput = !1
