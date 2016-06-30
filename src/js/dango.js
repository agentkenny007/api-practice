import $ from 'jquery';

var generateDango = function (query) {
    return $.ajax({
        url: "http://emoji.getdango.com/api/emoji",
        dataType: "json",
        data: {
            q: query
        }
    });
};

export default generateDango;
