// ==UserScript==
// @name         NovoFilter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes annoying advertisements
// @author       Not Officer
// @match        https://high-minded.net/*
// ==/UserScript==

const settings = {
    posts: {
        scan: true,
        links: true,
        images: true
    },
    signatures: {
        scan: true,
        links: true,
        images: true
    }
};

const novolineImages = [
    "novoline",
    "pic-upload.de/img/36532693/XncYDZk",
    "imgur.com/LeWTLA",
    "imgur.com/94njs19",
    "imgur.com/AxRhhLy",
    "imgur.com/94njs19"
];


(function() {
    'use strict';

    if (settings.posts.scan) {
        scanPosts();
    }

    if (settings.signatures.scan) {
        scanSignatures();
    }
})();

function scanPosts() {
    var messages = document.getElementsByClassName("message-inner");

    for (var message of messages) {
        if (settings.posts.images) {
            removeNovolineImages(message);
        }

        if (settings.posts.links) {
            removeNovolineLinks(message);
        }
    }
}

function scanSignatures() {
    var signatures = document.getElementsByClassName("message-signature");

    for (var signature of signatures) {
        if (settings.signatures.images) {
            removeNovolineImages(signature);
        }

        if (settings.signatures.links) {
            removeNovolineLinks(signature);
            removeEmptyTags(signature);
        }
    }
}

function removeNovolineLinks(element) {
    while (removeNovolineLinksInternal(element)) {
    }
}

function removeNovolineLinksInternal(element) {
    var result = false;
    var links = element.getElementsByTagName("a");

    for (var link of links) {
        var src = link.href.toLowerCase();

        if (src.includes("novoline")) {
            var parent = link.parentElement;

            if (parent && parent.tagName.toLowerCase() == "span") {
                parent.remove();
            }
            else {
                link.remove();
            }

            result = true;
        }
    }

    return result;
}

function removeNovolineImages(element) {
    var images = element.getElementsByTagName("img");

    for (var image of images) {
        var src = image.src.toLowerCase();

        for (var url of novolineImages) {
            if (src.includes(url.toLowerCase())) {
                image.remove();
                break;
            }
        }
    }
}

function removeEmptyTags(element) {
    for (var child of element.children) {
        if (child.childElementCount == 0) {
            child.remove();
        }
    }
}