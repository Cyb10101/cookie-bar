# Cookie Bar

Licence: Public Domain - Feel free to use it, but you can also improve this.

## Simplest configuration

* Add JavaScript and CSS includes in HTML

```html
<link rel="stylesheet" href="jquery.cookie-bar.css"/>
<script src="jquery.cookie-bar.js" type="text/javascript"></script>
```

* Add JavaScript call

```javascript
$(function () {
    $.cookieBar();
});
```

## Advanced configuration

```javascript
$(function () {
    $.cookieBar({
        language: 'en', // Empty for auto detection [en,de]
        classText: '',
        classButtonAccept: '',
        classButtonDecline: '',
        showButtonDecline: true,
        animationSpeed: 400,
        cookieName: 'cookies',
        cookieValue: 'allowed',
        cookiePath: '/',
        cookieSecure: false,
        cookieDomain: '', // example.org
        cookieExpires: 365, // Date or days if it is a number
        callAfterClickedAccept: function () {
            console.log('Run method');
        },
        callAfterClickedDecline: function () {
            console.log('Run method');
        }
    });
});
```

## Run Cookiebar with own template

* JavaScript

```javascript
$(function () {
    $('#cookie-bar-template').cookieBar({
        classText: 'text',
        classButtonAccept: 'button-accept',
        classButtonDecline: 'button-decline',
    });
});
```

* HTML template, you can add your own css for cookie-* classes

```html
<div id="cookie-bar-template" class="cookie-bar" style="display: none;">
    <a class="button-accept cookiebar-decline">No, that's my cookies!</a>
    <a class="button-decline cookiebar-accept">Okay, we could share...</a>
    <p class="text cookiebar-text">Give cookie monster cookies!</p>
</div>
```

## Add your own language or override existing

```javascript
$(function () {
    $.fn.cookieBar.languageText.en = {
        accept: 'Okay, we could share...',
        decline: 'No, that\'s my cookies!',
        cookieText: 'Give cookie monster cookies!'
    };

    $.cookieBar();
});
```

## Opt Out

Add opt out button to reset cookie bar.

* JavaScript

```javascript
$(function () {
    // Without settings
    $('.cookie-bar-optout').cookieBarOptOut();

    // With settings
    $('.cookie-bar-optout').cookieBarOptOut({
        cookieName: 'cookies',
        cookieValue: 'denied',
        cookiePath: '/',
        cookieSecure: false,
        cookieDomain: '',
        cookieExpires: 0, // Expire immediately
        callAfterClicked: function () {
            console.log('Run method');
        }
    });
});
```

*  HTML Button

```html
<a class="cookie-bar-optout">Cookie Bar Opt Out</a>
```