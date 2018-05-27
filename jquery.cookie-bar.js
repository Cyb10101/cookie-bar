var Cyb = Cyb || {};

Cyb.CookieBar = {
    /**
     * @return {Object}
     */
    settings: {
        attach: 'body',
        fixed: true,
        language: '',
        classText: '',
        classButtonAccept: '',
        classButtonDecline: '',
        showButtonDecline: true,
        animationSpeed: 400,
        cookieName: 'cookies',
        cookieValueAccept: 'allowed',
        cookieValueDecline: 'denied',
        cookiePath: '/',
        cookieSecure: false,
        cookieDomain: '',
        cookieExpires: 365,
        callAfterClickedAccept: null,
        callAfterClickedDecline: null,
        callAfterClickedOptOut: null
    },

    /**
     * Public function to initialize class
     */
    initialize: function () {
        console.log('todo');
    },

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
    cookie: function (key, value = {}, options = {}) {
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
    },

    /**
     * Remove all the cookies and empty localStorage when user refuses cookies
     *
     * @return null
     */
    removeAllCookiesAndStorage: function () {
        // Clear cookies
        document.cookie.split(';').forEach(function(c) {
            document.cookie = c.replace(/^\ +/, '').replace(/\=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });

        document.cookie.split(';').forEach(function(c) {document.cookie = c.replace(/^\ +/, '').replace(/\=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');});

        // Clear localStorage
        localStorage.clear();
    },

    /**
     * @return null
     */
    setCookieBySettings: function (settings, value) {
        Cyb.CookieBar.cookie(settings.cookieName, value, {
            path: settings.cookiePath,
            secure: settings.cookieSecure,
            domain: settings.cookieDomain,
            expires: settings.cookieExpires
        });
    },

    /**
     * Generate a random string
     *
     * @param {int} length
     * @param {String} characters
     * @return {String}
     */
    generateRandomString: function (length = 12, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-') {
        var string = '';
        for (var i = 0; i < length; i++) {
            string += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return string;
    },

    /**
     * Detect current language code and return it
     *
     * @return {String}
     */
    getUserLanguage: function (language = '') {
        if (language === '') {
            language = navigator.language || navigator.userLanguage;
        }
        language = language.substr(0, 2);
        if (!this.languageText.hasOwnProperty(language)) {
            language = 'en';
        }
        return language;
    },

    /**
     *
     * @param {jQuery} $instance
     * @param {Object} settings
     */
    toggleFixed: function ($instance, settings) {
        if (settings.fixed) {
            $instance.css({
                position: 'fixed',
                top: 0, left: 0, right: 0
            });
        } else {
            $instance.css({
                position: 'unset',
                top: 0, left: 0, right: 0
            });
        }
    },

    /**
     * Language texts
     *
     * @return {Object}
     */
    languageText: {
        'en': {
            accept: 'Understood',
            decline: 'Decline',
            cookieText: 'This website makes use of cookies to enhance browsing experience and provide additional functionality. None of this data can or will be used to identify or contact you.',
            declineConfirm: 'By clicking Disallow cookies, you deny your consent to store any cookies and localStorage data for this website, eventually deleting already stored cookies (some parts of the site may stop working properly).'
        },
        'de': {
            accept: 'Verstanden',
            decline: 'Ablehnen',
            cookieText: 'Diese Internetseite verwendet Cookies, um die Nutzererfahrung zu verbessern und den Benutzern bestimmte Dienste und Funktionen bereitzustellen. Es werden keine der so gesammelten Daten genutzt, um Sie zu identifizieren oder zu kontaktieren.',
            declineConfirm: 'Durch das Klicken von Cookies verbieten verweigern Sie Ihre Zustimmung, Cookies oder lokalen Speicher zu nutzen. Weiterhin werden alle Cookies und lokal gespeicherte Daten gelöscht und Teile der Internetseite könnten aufhören, ordnungsgemäß zu funktionieren.'
        }
    },

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
    cookieLawStates: [
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
    ]
};


(function ($) {
    /**
     * Run with a selector
     * $('selector').cookieBar();
     *
     * @param {Object} options
     * @returns {void}
     */
    $.fn.cookieBar = function (options) {
        var settings = $.extend(Cyb.CookieBar.settings, options);

        settings.language = Cyb.CookieBar.getUserLanguage(settings.language);
        var languageText = Cyb.CookieBar.languageText[settings.language];

        return this.each(function () {
            var $instance = $(this);
            $instance.hide();

            $instance.prependTo(settings.attach);
            Cyb.CookieBar.toggleFixed($instance, settings);

            if (Cyb.CookieBar.cookie(settings.cookieName) === settings.cookieValueDecline) {
                Cyb.CookieBar.removeAllCookiesAndStorage();
                Cyb.CookieBar.setCookieBySettings(settings, settings.cookieValueDecline);
                return;
            }

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

            if (Cyb.CookieBar.cookie(settings.cookieName) !== settings.cookieValueAccept) {
                $instance.slideDown(settings.animationSpeed);
            }

            $instance.find('.' + settings.classButtonAccept).click(function (event) {
                event.preventDefault();
                $instance.slideUp(settings.animationSpeed);

                Cyb.CookieBar.setCookieBySettings(settings, settings.cookieValueAccept);
                if (settings.callAfterClickedAccept !== null && {}.toString.call(settings.callAfterClickedAccept) === '[object Function]') {
                    settings.callAfterClickedAccept();
                }
            });

            if (settings.showButtonDecline) {
                $instance.find('.' + settings.classButtonDecline).click(function (event) {
                    event.preventDefault();

                    var confirm = window.confirm(languageText.declineConfirm);
                    if (confirm === true) {
                        Cyb.CookieBar.removeAllCookiesAndStorage();
                        Cyb.CookieBar.setCookieBySettings(settings, settings.cookieValueDecline);

                        $instance.slideUp(settings.animationSpeed);

                        if (settings.callAfterClickedDecline !== null && {}.toString.call(settings.callAfterClickedDecline) === '[object Function]') {
                            settings.callAfterClickedDecline();
                        }
                    }
                });
            }
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
        var settings = $.extend(Cyb.CookieBar.settings, options);

        return this.each(function () {
            var $instance = $(this);

            $instance.click(function (event) {
                event.preventDefault();

                Cyb.CookieBar.removeAllCookiesAndStorage();
                if (settings.callAfterClickedOptOut !== null && {}.toString.call(settings.callAfterClickedOptOut) === '[object Function]') {
                    settings.callAfterClickedOptOut();
                    return;
                }

                window.location.reload(false);
                return false;
            });
        });
    };

    /**
     * Run without selector
     * $.cookieBar();
     *
     * @param {Object} options
     * @return {void}
     */
    $.cookieBar = function (options = {}) {
        var settings = $.extend(Cyb.CookieBar.settings, options);
        var id = 'cookie-bar-' + Cyb.CookieBar.generateRandomString();
        $(settings.attach).prepend('<div id="' + id + '" class="cookie-bar" style="display: none;"></div>');
        $('#' + id).cookieBar(options);
    };
})(jQuery);
