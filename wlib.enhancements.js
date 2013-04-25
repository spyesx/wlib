/*
    Provide windows.location.origin to all browsers
 */
window.location.origin = window.location.origin || window.location.protocol+'//'+window.location.host;