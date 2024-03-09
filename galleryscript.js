var gallery = document.querySelector('#gallery');

var files;

function cd(dir) {
    current_dir = decodeURIComponent(dir);
    console.log(current_dir);
    names = loadFileNames(current_dir);
    names.then(function(val) {
        console.log(val);
        for (i = 0; i < val.length; i++) {
            parent = document.createElement("div");
            parent.setAttribute("class", "gallery-item");
            parent.setAttribute("style", "grid-row-end: span 13;")
            child = document.createElement("div");
            child.setAttribute("class", "content");
            image = document.createElement("img");
            image.setAttribute("src", "/gallery/files/test (1).png");
            image.setAttribute("alt", "");
            image.setAttribute("class", "");
            child.append(image);
            parent.append(child);
            document.getElementById("gallery").append(parent);

            console.log(image)
                //val[i]
        }
    });

    setup();
}

function loadFileNames(dir) {
    return new Promise((resolve, reject) => {
        try {
            var fileNames = new Array();
            $.ajax({
                url: dir,
                success: function(data) {
                    for (var i = 1; i < $(data).find('li span.name').length; i++) {
                        var elem = $(data).find('li span.name')[i];
                        fileNames.push(elem.innerHTML);
                    }
                    return resolve(fileNames);
                }
            });
        } catch (ex) {
            return reject(new Error(ex));
        }
    });
}

var base_dir = (location.pathname.replace('/index.html', '/') +
    "/files/").replace(/\/\//g, '/');


files = cd(base_dir)


function setup() {

    var getVal = function(elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
    var getHeight = function(item) { return item.querySelector('.content').getBoundingClientRect().height; };
    var resizeAll = function() {
        var altura = getVal(gallery, 'grid-auto-rows');
        var gap = getVal(gallery, 'grid-row-gap');
        gallery.querySelectorAll('.gallery-item').forEach(function(item) {
            var el = item;
            el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
        });
    };

    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        item = images[i];
        console.log(item)
        item.classList.add('byebye');
        if (item.complete) {
            console.log(item.src);
        } else {
            item.addEventListener('load', function() {
                var altura = getVal(gallery, 'grid-auto-rows');
                var gap = getVal(gallery, 'grid-row-gap');
                var gitem = item.parentElement.parentElement;
                gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
                item.classList.remove('byebye');
            });
        }
    }
    window.addEventListener('resize', resizeAll);

    var elementss = document.getElementsByTagName("img").elements;

    function allAreNull(arr) {
        return arr.every(element => element === null);
    }

    console.log(allAreNull(elementss)); // 👉️ true
    console.log(allAreNull([null, undefined])); // 👉️ false


    for (var i = 0, element; element = elementss[i++];) {
        if (element.type === "text" && element.value === "")
            console.log("it's an empty textfield")
    }

    var gallery = document.getElementsByClassName('.gallery-item');
    for (var i = 0; i < gallery.length; i++) {
        item = gallery[i];
        item.addEventListener('click', function() {
            item.classList.toggle('full');
        });
    }
}