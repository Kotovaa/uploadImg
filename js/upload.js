$(document).ready(function() {
    // Стандарный input для файлов
    var fileInput = $('#file-field');
    
    // ul-список, содержащий миниатюрки выбранных файлов
    var imgList = $('ul#img-list');
    function displayFiles(files) {
        var imageType = /image.*/;
        var num = 0;
        $('#img-list li').remove();
        $.each(files, function(i, file) {
            // Отсеиваем не картинки
            if (!file.type.match(imageType)) {
                return true;
            }
            
            num++;
            
            // Создаем элемент li
            // а также создаем ему свойство file, куда помещаем объект File (при загрузке понадобится)
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
    
    // Обработка события выбора файлов через стандартный input
    // (при вызове обработчика в свойстве files элемента input содержится объект FileList,
    //  содержащий выбранные файлы)
    fileInput.bind({
        change: function() {
            displayFiles(this.files);
        }
    });
  
    // Проверка поддержки File API в браузере
    if(window.FileReader == null) {
        alert('Ваш браузер не поддерживает File API!');
    }
});