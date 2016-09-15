lotusJS
=============

Inversion of control framework basaed on x-tag and lavenderJS for developing HTML5 applications using web components. The framework is an adaptation of the MVP pattern in an IOC container, but implements the Lotus web component objects as the presenter (MVWC).

**Seperates presentation from code with web component skins**

Web component skins are html `<template>` elements which define skin parts for a component. For example:

Component creation in the HTML DOM:
`<x-lotus-button2 type="navButton" template-url="templates/button.html" component-root='[skin-part="button"]' attribute-type="testButton"></x-lotus-button2>`

Notice the ise of template-url