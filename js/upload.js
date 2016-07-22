$(document).ready(function() {
    var fileInput = $('#file-field');
    var imgList = $('ul#img-list');
    var dropBox = $(document);
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
            console.log('Загружен: ' + file.name);
            console.log('Размер изображения: ' + file.size + 'kb');
            console.log(file)
            reader.readAsDataURL(file);
        });
    }
    fileInput.bind({
        change: function() {
            displayFiles(this.files);
        }
    });
    dropBox.bind({
        dragenter: function() {
            return false;
        },
        dragover: function() {
            return false;
        },
        dragleave: function() {
            return false;
        },
        drop: function(e) {
            var dt = e.originalEvent.dataTransfer;
            displayFiles(dt.files);
            return false;
        }
    });
    if(window.FileReader == null) {
        alert('Ваш браузер не поддерживает File API!');
    }
});