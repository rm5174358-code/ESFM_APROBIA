(function () {
    "use strict";

    var config = window.APP_CONFIG || {};
    var root = document.documentElement;
    var megaUrl = config.downloadMegaUrl || "";
    var githubUrl = config.downloadGithubUrl || "";
    var isConfigured = function (url) {
        return url && url.indexOf("AQUI_PONDRE") === -1;
    };

    document.querySelectorAll("[data-app-name]").forEach(function (element) {
        element.textContent = config.appName || "APROBIA";
    });
    document.querySelectorAll("[data-site-name]").forEach(function (element) {
        element.textContent = config.siteName || "Keysen Progresiva";
    });
    document.querySelectorAll("[data-app-version]").forEach(function (element) {
        element.textContent = config.version || "1.0.0";
    });
    document.querySelectorAll("[data-update-date]").forEach(function (element) {
        element.textContent = config.updateDate || "Agosto 2026";
    });

    var description = document.querySelector("[data-short-description]");
    if (description) {
        description.textContent = config.shortDescription || "";
    }

    var links = document.querySelectorAll("[data-download]");
    links.forEach(function (link) {
        var url = link.dataset.download === "mega" ? megaUrl : githubUrl;
        if (isConfigured(url)) {
            link.href = url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        } else {
            link.href = "#descargas";
            link.addEventListener("click", function (event) {
                event.preventDefault();
                var message = document.querySelector("[data-download-message]");
                if (message) {
                    message.textContent = "El enlace de descarga se habilitara cuando se configure en app-config.js.";
                    message.hidden = false;
                }
            });
        }
    });

    var updates = document.querySelector("[data-whats-new]");
    if (updates && Array.isArray(config.whatsNew) && config.whatsNew.length) {
        updates.innerHTML = "";
        config.whatsNew.forEach(function (item) {
            var listItem = document.createElement("li");
            listItem.textContent = item;
            updates.appendChild(listItem);
        });
    }

    var observer = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 }) : null;

    document.querySelectorAll("[data-reveal]").forEach(function (element) {
        if (observer) {
            observer.observe(element);
        } else {
            element.classList.add("is-visible");
        }
    });

    root.classList.add("js-ready");
}());
