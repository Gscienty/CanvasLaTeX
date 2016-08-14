(function(root){
    'use strict';

    function latex_document(name){
        var document_name = name;
        var pages = [];

        this.append_new_page = function(area_dom, width, height){
            var canvas_element = document.createElement('canvas');
            area_dom.appendChild(canvas_element);
            var new_page = new root.page(canvas_element, width, height);
            pages.push(new_page);
            return new_page;
        };

        this.get_page_by_number = function(i){
            return pages[i];
        };
    };

    root.document = latex_document;
})(this.latex);
