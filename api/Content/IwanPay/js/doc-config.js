// API documentation branding and endpoint configuration.
(function (window, document) {
    var config = {
        defaultPlatform: 'qixing',
        platforms: {
            qixing: {
                name: '七星技术服务7XPAY',
                apiBaseUrl: 'https://newapi.7xpay.com'
            },
            haochongzhi: {
                name: '好充值',
                apiBaseUrl: 'https://api.haocz.com'
            }
        }
    };

    function resolvePlatform(hostname) {
        var host = (hostname || '').toLowerCase();
        if (host === 'haocz.com' || /\.haocz\.com$/.test(host)) {
            return config.platforms.haochongzhi;
        }

        return config.platforms[config.defaultPlatform];
    }

    function replaceApiBase(value, apiBaseUrl) {
        if (!value) {
            return value;
        }

        return value.replace(
            /https?:\/\/(?:newapi\.7xpay\.com|api\.haocz\.com)/gi,
            apiBaseUrl
        );
    }

    function applyPlatformConfig() {
        var platform = resolvePlatform(window.location.hostname);
        window.docPlatformConfig = platform;

        var nameElements = document.querySelectorAll('[data-doc-platform-name]');
        for (var i = 0; i < nameElements.length; i++) {
            nameElements[i].textContent = platform.name;
        }

        var walker = document.createTreeWalker(
            document.body,
            window.NodeFilter.SHOW_TEXT,
            null,
            false
        );
        var textNode;
        while ((textNode = walker.nextNode())) {
            textNode.nodeValue = replaceApiBase(textNode.nodeValue, platform.apiBaseUrl);
        }

        var linkedElements = document.querySelectorAll('[href], [action]');
        for (var j = 0; j < linkedElements.length; j++) {
            if (linkedElements[j].hasAttribute('href')) {
                linkedElements[j].setAttribute(
                    'href',
                    replaceApiBase(linkedElements[j].getAttribute('href'), platform.apiBaseUrl)
                );
            }
            if (linkedElements[j].hasAttribute('action')) {
                linkedElements[j].setAttribute(
                    'action',
                    replaceApiBase(linkedElements[j].getAttribute('action'), platform.apiBaseUrl)
                );
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyPlatformConfig);
    } else {
        applyPlatformConfig();
    }
})(window, document);

