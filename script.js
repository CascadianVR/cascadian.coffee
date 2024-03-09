var imageThumbs = document.getElementById("image-thumbs");
var currentImage = document.getElementById("current-image");

for (var i = 31; i >= 1; i--) {
    var thumb = document.createElement("img");
    thumb.src = "gallery/" + i + ".jpg";
    thumb.alt = "Image " + i;
    thumb.classList.add("thumb");

    thumb.addEventListener(
        "click", function() {
            currentImage.src = this.src;
            currentImage.alt = this.alt;
        }
      );

    imageThumbs.appendChild(thumb);
}

var folder = "gallery/";

$.ajax({
    url : folder,
    success: function (data) {

        //List all .png file names in the page
        $(data).find("a:contains(" + ".jpg" + ")").each(function () {
            var filename = this.href.replace(window.location.host, "").replace("http://", "");
            console.log(filename)
            //$("body").append("<img src='" + dir + filename + "'>");
        });

    }
});