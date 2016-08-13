(function(root){
    'use strict';
    function cursor(canvas, top, right, bottom, left){
        var ctx = canvas.getContext('2d');
        var font_size = 12;
        var font_family = 'New Times';
        var font_color = 'black';
        var line_spacing = 5;
        var padding = {
            top : top,
            left : left,
            right : right,
            bottom : bottom
        };
        var cursor_point = {
            x : left,
            y : top
        };

        this.get_font_size = function() { return font_size; };
        this.set_font_size = function(value) { font_size = value; };

        this.get_font_family = function() { return font_family; };
        this.set_font_family = function(value) { font_family = value; };

        this.get_font_color = function() { return font_color; };
        this.set_font_color = function(value) { font_color = value; };

        this.get_line_spacing = function() { return line_spacing; };
        this.set_line_spacing = function(value) { line_spacing = value; };

        this.get_padding = function() { return padding; };
        this.set_padding = function(value) { padding = value; };

        this.get_padding_top = function() { return padding.top; };
        this.set_padding_top = function(value) { padding.top = value; };

        this.get_padding_left = function() { return padding.left; };
        this.set_padding_left = function(value) { padding.left = value; };

        this.get_padding_bottom = function() { return padding.bottom; };
        this.set_padding_bottom = function(value) { padding.bottom = value; };

        this.get_padding_top = function() { return padding.top; };
        this.set_padding_top = function(value) { padding.top = value; };

        this.get_cursor_point = function() { return cursor_point; };
        this.set_cursor_point = function(value) { cursor_point = value; };

        this.get_cursor_point_x = function() { return cursor_point.x; };
        this.set_cursor_point_x = function(value) { cursor_point.x = value; };

        this.get_cursor_point_y = function() { return cursor_point.y; };
        this.set_cursor_point_y = function(value) { cursor_point.y = value; };

        function assemble_ctx(){
            ctx.font = font_size + 'px ' + font_family;
            ctx.fillStyle = font_color;
        };

        this.carriage_return = function(){
            cursor_point.x = left;
        };

        this.line_feed = function(){
            cursor_point.y = cursor_point.y + font_size + line_spacing;
        };

        this.crlf = function(){
            this.carriage_return();
            this.line_feed();
        };

        this.writeText = function(text){
            assemble_ctx();
            var text_height = ctx.measureText(text).height;
            var alpha_count = text.length;
            for(var alpha_iter = 0; alpha_iter < alpha_count; alpha_iter++){
                var alpha = text[alpha_iter];
                var alpha_width = ctx.measureText(alpha).width;
                if(cursor_point.x + alpha_width <= padding.right){
                    ctx.fillText(alpha, cursor_point.x, cursor_point.y);
                    cursor_point.x = cursor_point.x + alpha_width;
                }
                else{
                    this.carriage_return();
                    this.line_feed();
                    alpha_iter--;
                };
            };
        };
    };

    root.cursor = cursor;
})(this);
