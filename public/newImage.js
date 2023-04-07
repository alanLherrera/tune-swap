"use strict";
function newImage(url) {
    let image = document.createElement('img');
    image.src = url;
    image.style.position = 'absolute';
    document.body.append(image);
    return image;
}