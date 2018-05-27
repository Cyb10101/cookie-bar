# Cookie Bar

Licence: Public Domain - Feel free to use it, but you can also improve this.

## Simplest configuration

Include JavaScript after the jQuery library

```html
<link rel="stylesheet" href="jquery.cookie-bar.css"/>
<script src="jquery.cookie-bar.js" type="text/javascript"></script>
```

Add JavaScript call to run the cookie bar

```javascript
jQuery(function ($) {
    $.cookieBar();
});
```

## Fixed navigation bar

How to set for fixed top navigation

* HTML

```html
<div class="fixed-top" style="position: fixed; top: 0; right: 0; left: 0;">
    <nav class="navbar">
        Content
    </nav>
</div>
```

* JavaScript

```javascript
$.cookieBar({
    attach: '.fixed-top',
    fixed: false
});
```

## Advanced/full configuration

```javascript
$.cookieBar({
    attach: 'body',
    fixed: true,
    language: 'en', // Empty for auto detection [en,de]
    classText: '',
    classButtonAccept: '',
    classButtonDecline: '',
    showButtonDecline: true,
    animationSpeed: 400,
    cookieName: 'cookies',
    cookieValueAccept: 'allowed',
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
```

## Run Cookiebar with own template

JavaScript adaptations

```javascript
$('#cookie-bar-template').cookieBar({
    classText: 'text',
    classButtonAccept: 'button-accept',
    classButtonDecline: 'button-decline',
});
```

HTML template. The cookiebar-* classes then only used for styling.  

```html
<div id="cookie-bar-template" class="cookie-bar" style="display: none;">
    <a class="button-accept cookiebar-decline">No, that's my cookies!</a>
    <a class="button-decline cookiebar-accept">Okay, we could share...</a>
    <p class="text cookiebar-text">Give cookie monster cookies!</p>
</div>
```

## Add your own language or override existing

```javascript
Cyb.CookieBar.languageText.en = {
    accept: 'Okay, we could share...',
    decline: 'No, that\'s my cookies!',
    cookieText: 'Give cookie monster cookies!'
};

$.cookieBar();
```

## Opt Out

Add opt out button to reset cookie bar.

* JavaScript

```javascript
// Without settings
$('.cookie-bar-optout').cookieBarOptOut();

// With settings
$('.cookie-bar-optout').cookieBarOptOut({
    cookieName: 'cookies',
    cookieValueDecline: 'denied',
    cookiePath: '/',
    cookieSecure: false,
    cookieDomain: '',
    callAfterClickedOptOut: function () {
        console.log('Run method');
    }
});
```

*  HTML Button

```html
<a class="cookie-bar-optout">Cookie Bar Opt Out</a>
```