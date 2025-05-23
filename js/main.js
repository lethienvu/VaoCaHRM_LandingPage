const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
});


const switchEl = document.getElementById("language-switcher");

switchEl.addEventListener("change", function () {
    const lang = switchEl.value;
    const translateCombo = document.querySelector(".goog-te-combo");
    if (translateCombo) {
        translateCombo.value = lang;
        translateCombo.dispatchEvent(new Event("change"));
    }
});

let lastScroll = 0;
var topbar = document.querySelector('.top-bar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 50) {
      topbar.style.transform = 'translateY(-100%)';
    } else {
      topbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

if (!Util)
    function Util() {}
Util.addClass = function(t, e) {
    var s = e.split(" ");
    t.classList.add(s[0]),
    1 < s.length && Util.addClass(t, s.slice(1).join(" "))
}
,
Util.removeClass = function(t, e) {
    var s = e.split(" ");
    t.classList.remove(s[0]),
    1 < s.length && Util.removeClass(t, s.slice(1).join(" "))
}
,
Util.addClass = function(t, e) {
    var s = e.split(" ");
    t.classList.add(s[0]),
    1 < s.length && Util.addClass(t, s.slice(1).join(" "))
}
,
Util.toggleClass = function(t, e, s) {
    s ? Util.addClass(t, e) : Util.removeClass(t, e)
}
,
Util.setAttributes = function(t, e) {
    for (var s in e)
        t.setAttribute(s, e[s])
}
,
Util.hasClass = function(t, e) {
    return t.classList.contains(e)
}
,
Util.getChildrenByClassName = function(t, e) {
    for (var s = t.children, i = [], a = 0; a < s.length; a++)
        Util.hasClass(s[a], e) && i.push(s[a]);
    return i
}
,
Util.getIndexInArray = function(t, e) {
    return Array.prototype.indexOf.call(t, e)
}
,
function() {
    var t = function(t) {
        this.element = t,
        this.tabList = this.element.getElementsByClassName("js-tabs__controls")[0],
        this.listItems = this.tabList.getElementsByTagName("li"),
        this.triggers = this.tabList.getElementsByTagName("a"),
        this.panelsList = this.element.getElementsByClassName("js-tabs__panels")[0],
        this.panels = Util.getChildrenByClassName(this.panelsList, "js-tabs__panel"),
        this.hideClass = this.element.getAttribute("data-hide-panel-class") ? this.element.getAttribute("data-hide-panel-class") : "hide",
        this.customShowClass = !!this.element.getAttribute("data-show-panel-class") && this.element.getAttribute("data-show-panel-class"),
        this.layout = this.element.getAttribute("data-tabs-layout") ? this.element.getAttribute("data-tabs-layout") : "horizontal",
        this.deepLinkOn = "on" == this.element.getAttribute("data-deep-link"),
        this.initTab()
    };
    t.prototype.initTab = function() {
        this.tabList.setAttribute("role", "tablist"),
        Util.addClass(this.element, "tabs--no-interaction");
        for (var t = 0; t < this.triggers.length; t++) {
            var e = 0 == t
              , s = this.panels[t].getAttribute("id");
            this.listItems[t].setAttribute("role", "presentation"),
            Util.setAttributes(this.triggers[t], {
                role: "tab",
                "aria-selected": e,
                "aria-controls": s,
                id: "tab-" + s
            }),
            Util.addClass(this.triggers[t], "js-tabs__trigger"),
            Util.setAttributes(this.panels[t], {
                role: "tabpanel",
                "aria-labelledby": "tab-" + s
            }),
            Util.toggleClass(this.panels[t], this.hideClass, !e),
            e && this.customShowClass && Util.addClass(this.panels[t], this.customShowClass),
            e || this.triggers[t].setAttribute("tabindex", "-1")
        }
        this.initTabEvents(),
        this.initDeepLink()
    }
    ,
    t.prototype.initTabEvents = function() {
        var l = this;
        this.tabList.addEventListener("click", function(t) {
            t.target.closest(".js-tabs__trigger") && l.triggerTab(t.target.closest(".js-tabs__trigger"), t)
        }),
        this.tabList.addEventListener("keydown", function(t) {
            var e, s, i, a;
            t.target.closest(".js-tabs__trigger") && (i = t,
            "horizontal" == (a = l.layout) && (i.keyCode && 39 == i.keyCode || i.key && "ArrowRight" == i.key) || "vertical" == a && (i.keyCode && 40 == i.keyCode || i.key && "ArrowDown" == i.key) ? (t.preventDefault(),
            l.selectNewTab("next")) : (e = t,
            ("horizontal" == (s = l.layout) && (e.keyCode && 37 == e.keyCode || e.key && "ArrowLeft" == e.key) || "vertical" == s && (e.keyCode && 38 == e.keyCode || e.key && "ArrowUp" == e.key)) && (t.preventDefault(),
            l.selectNewTab("prev"))))
        })
    }
    ,
    t.prototype.selectNewTab = function(t) {
        var e = this.tabList.querySelector('[aria-selected="true"]')
          , s = Util.getIndexInArray(this.triggers, e);
        (s = "next" == t ? s + 1 : s - 1) < 0 && (s = this.listItems.length - 1),
        s >= this.listItems.length && (s = 0),
        this.triggerTab(this.triggers[s]),
        this.triggers[s].focus()
    }
    ,
    t.prototype.triggerTab = function(t, e) {
        e && e.preventDefault();
        var s = Util.getIndexInArray(this.triggers, t);
        if ("true" != this.triggers[s].getAttribute("aria-selected")) {
            Util.removeClass(this.element, "tabs--no-interaction");
            for (var i = 0; i < this.triggers.length; i++) {
                var a = i == s;
                Util.toggleClass(this.panels[i], this.hideClass, !a),
                this.customShowClass && Util.toggleClass(this.panels[i], this.customShowClass, a),
                this.triggers[i].setAttribute("aria-selected", a),
                a ? this.triggers[i].setAttribute("tabindex", "0") : this.triggers[i].setAttribute("tabindex", "-1")
            }
            this.deepLinkOn && history.replaceState(null, "", "#" + t.getAttribute("aria-controls"))
        }
    }
    ,
    t.prototype.initDeepLink = function() {
        if (this.deepLinkOn) {
            var t = window.location.hash.substr(1)
              , e = this;
            if (t && "" != t)
                for (var s = 0; s < this.panels.length; s++)
                    if (this.panels[s].getAttribute("id") == t) {
                        this.triggerTab(this.triggers[s], !1),
                        setTimeout(function() {
                            e.panels[s].scrollIntoView(!0)
                        });
                        break
                    }
        }
    }
    ,
    window.Tab = t;
    var e = document.getElementsByClassName("js-tabs");
    if (0 < e.length)
        for (var s = 0; s < e.length; s++)
            new t(e[s])
}();





