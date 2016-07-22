$(document).ready(function() {
    var fileInput = $('#file-field');    
    var imgList = $('ul#img-list');
     var dropBox = $('#img-container');
    function displayFiles(files) {
        var imageType = /image.*/;
        var num = 0;
        $('#img-list li').remove();
        $.each(files, function(i, file) {
            if (!file.type.match(imageType)) {
                return true;
            }
            num++;
            var li = $('<li/>').appendTo(imgList);
            var img = $('<img/>').appendTo(li);
            li.get(0).file = file;
            var reader = new FileReader();
            reader.onload = (function(aImg) {
                return function(e) {
                    aImg.attr('src', e.target.result);
                };
            })(img);
            reader.readAsDataURL(file);
        });
    }
    fileInput.bind({
        change: function() {
            displayFiles(this.files);
        }
    });
    if(window.FileReader == null) {
        alert('Ваш браузер не поддерживает File API!');
    }
});