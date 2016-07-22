$(document).ready(function() {


    // Консоль
    var console = $("#console");

    // Инфа о выбранных файлах
    var countInfo = $("#info-count");
    var sizeInfo = $("#info-size");

    // Стандарный input для файлов
    var fileInput = $('#file-field');
    
    // ul-список, содержащий миниатюрки выбранных файлов
    var imgList = $('ul#img-list');
    
    // Контейнер, куда можно помещать файлы методом drag and drop
    var dropBox = $('#img-container');

    // Счетчик всех выбранных файлов и их размера
    var imgCount = 0;
    var imgSize = 0;

    // Отображение выбраных файлов и создание миниатюр
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
            
            // Создаем элемент li и помещаем в него название, миниатюру и progress bar,
            // а также создаем ему свойство file, куда помещаем объект File (при загрузке понадобится)
            var li = $('<li/>').appendTo(imgList);
            var img = $('<img/>').appendTo(li);
            li.get(0).file = file;
            // Создаем объект FileReader и по завершении чтения файла, отображаем миниатюру и обновляем
            // инфу обо всех файлах
            var reader = new FileReader();
            reader.onload = (function(aImg) {
                return function(e) {
                    aImg.attr('src', e.target.result);
                    imgCount++;
                    imgSize += file.size;
                };
            })(img);
            reader.readAsDataURL(file);
            $('.draggable').draggabilly({
              containment: '#img-container'
            })
        });
    }
    
    
    ////////////////////////////////////////////////////////////////////////////


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