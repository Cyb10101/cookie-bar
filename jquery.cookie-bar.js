(function ($) {
    /**
     * Get or set a cookie
     * cookie('getName')
     * cookie('getRaw', {raw: true})
     * cookie('setName', 'data')
     *
     * @param {String} key
     * @param {mixed} value
     * @param {Object} options
     * @returns {*}
     */
    $.cookie = function (key, value = {}, options = {}) {
        // Set cookie
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires;
                options.expires = new Date();
                options.expires.setDate(options.expires.getDate() + days);
            }

            value = String(value);

            var cookieString = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // max-age is not supported by Internet Explorer
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join('');
            return (document.cookie = cookieString);
        }

        // Get cookie
        options = value || {};
        var decode = options.raw ? function (string) {return string;} : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (key === decode(pair[0])) {
                return decode(pair[1] || '');
            }
        }
        return null;
    };

    /**
     * Generate a random string
     *
     * @param {int} length
     * @param {String} characters
     * @return {String}
     */
    $.generateRandomString = function (length = 12, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-') {
        var string = '';
        for (var i = 0; i < length; i++) {
            string += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return string;
    };

    /**
     * Run with a selector
     * $('selector').cookieBar();
     *
     * @param {Object} options
     * @returns {void}
     */
    $.fn.cookieBar = function (options) {
        var settings = $.extend({
            language: '',
            classText: '',
            classButtonAccept: '',
            classButtonDecline: '',
            showButtonDecline: true,
            animationSpeed: 400,
            cookieName: 'cookies',
            cookieValue: 'allowed',
            cookiePath: '/',
            cookieSecure: false,
            cookieDomain: '',
            cookieExpires: 365,
            callAfterClickedAccept: null,
            callAfterClickedDecline: null
        }, options);

        settings.language = $.fn.cookieBar.getUserLanguage(settings.language);
        var languageText = $.fn.cookieBar.languageText[settings.language];

        return this.each(function () {
            var $instance = $(this);
            $instance.hide();

            if (settings.showButtonDecline && settings.classButtonDecline === '') {
                settings.classButtonDecline = 'cookiebar-decline';
                $instance.append('<a class="' + settings.classButtonDecline + '">' + languageText.decline + '</a>');
            }

            if (settings.classButtonAccept === '') {
                settings.classButtonAccept = 'cookiebar-accept';
                $instance.append('<a class="' + settings.classButtonAccept + '">' + languageText.accept + '</a>');
            }

            if (settings.classText === '') {
                settings.classText = 'cookiebar-text';
                $instance.append('<p class="' + settings.classText + '">' + languageText.cookieText + '</p>');
            }

            if ($.cookie(settings.cookieName) !== settings.cookieValue) {
                $instance.slideDown(settings.animationSpeed);
            }

            $instance.find('.' + settings.classButtonAccept).click(function (event) {
                event.preventDefault();
                $instance.slideUp(settings.animationSpeed);

                $.cookie(settings.cookieName, settings.cookieValue, {
                    path: settings.cookiePath,
                    secure: settings.cookieSecure,
                    domain: settings.cookieDomain,
                    expires: settings.cookieExpires
                });

                if (settings.callAfterClickedAccept !== null && {}.toString.call(settings.callAfterClickedAccept) === '[object Function]') {
                    settings.callAfterClickedAccept();
                }

                return false;
            });
            $instance.find('.' + settings.classButtonDecline).click(function (event) {
                event.preventDefault();
                $instance.slideUp(settings.animationSpeed);

                if (settings.callAfterClickedDecline !== null && {}.toString.call(settings.callAfterClickedDecline) === '[object Function]') {
                    settings.callAfterClickedDecline();
                }

                return false;
            });
        });
    };

    /**
     * Run with a selector
     * $('selector').cookieBar.optOut();
     *
     * @param {Object} options
     * @returns {void}
     */
    $.fn.cookieBarOptOut = function (options) {
        var settings = $.extend({
            cookieName: 'cookies',
            cookieValue: 'denied',
            cookiePath: '/',
            cookieSecure: false,
            cookieDomain: '',
            cookieExpires: 0,
            callAfterClicked: null
        }, options);

        return this.each(function () {
            var $instance = $(this);

            $instance.click(function (event) {
                event.preventDefault();

                $.cookie(settings.cookieName, settings.cookieValue, {
                    path: settings.cookiePath,
                    secure: settings.cookieSecure,
                    domain: settings.cookieDomain,
                    expires: settings.cookieExpires
                });

                if (settings.callAfterClicked !== null && {}.toString.call(settings.callAfterClicked) === '[object Function]') {
                    settings.callAfterClicked();
                    return;
                }

                window.location.reload(false);
                return false;
            });
        });
    };

    /**
     * Detect current language code and return it
     *
     * @return {String}
     */
    $.fn.cookieBar.getUserLanguage = function (language = '') {
        if (language === '') {
            language = navigator.language || navigator.userLanguage;
        }
        language = language.substr(0, 2);
        if (!$.fn.cookieBar.languageText.hasOwnProperty(language)) {
            language = 'en';
        }
        return language;
    };

    /**
     * Language texts
     *
     * @return {Object}
     */
    $.fn.cookieBar.languageText = {
        'en': {
            accept: 'Understood',
            decline: 'Decline',
            cookieText: 'This website makes use of cookies to enhance browsing experience and provide additional functionality. None of this data can or will be used to identify or contact you.'
        },
        'de': {
            accept: 'Verstanden',
            decline: 'Ablehnen',
            cookieText: 'Diese Internetseite verwendet Cookies, um die Nutzererfahrung zu verbessern und den Benutzern bestimmte Dienste und Funktionen bereitzustellen. Es werden keine der so gesammelten Daten genutzt, um Sie zu identifizieren oder zu kontaktieren.'
        }
    };

    /**
     * Cookie law states
     * @todo Maybe want to develop optional recognition by geo ip later
     *
     * http://php.net/manual/en/geoip.setup.php
     * http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz
     *
     * https://ipstack.com/
     *
     * https://developers.google.com/maps/documentation/geolocation/intro
     *
     * @return {Array}
     */
    $.fn.cookieBar.cookieLawStates = [
        'AT',
        'BE', 'BG',
        'CY', 'CZ',
        'DE', 'DK',
        'EE', 'EL', 'ES',
        'FI', 'FR',
        'GB',
        'HR', 'HU',
        'IE', 'IT',
        'LT', 'LU', 'LV',
        'MT',
        'NL',
        'PL', 'PT',
        'RO',
        'SE', 'SI', 'SK'
    ];

    /**
     * Run without selector
     * $.cookieBar();
     *
     * @param {Object} options
     * @return {void}
     */
    $.cookieBar = function (options = {}) {
        var id = 'cookie-bar-' + $.generateRandomString();
        $('body').prepend('<div id="' + id + '" class="cookie-bar" style="display: none;"></div>');
        $('#' + id).cookieBar(options);
    };
})(jQuery);
