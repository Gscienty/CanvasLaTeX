(function(root){
    'use strict';
    function cursor(canvas, top, right, bottom, left){
        var ctx = canvas.getContext('2d');
        var font_size = 12;
        var font_family = 'new times roman';
        var font_color = 'black';
        var font_style = 'normal';
        var line_spacing = 5;
        var align = 'left';
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
        this.set_font_size = function(value) { font_size = value; return this; };

        this.get_font_family = function() { return font_family; };
        this.set_font_family = function(value) { font_family = value; return this; };

        this.get_font_color = function() { return font_color; };
        this.set_font_color = function(value) { font_color = value; return this; };

        this.get_font_style = function() { return font_style; };
        this.set_font_style = function(value) { font_style = value; return this; };

        this.get_line_spacing = function() { return line_spacing; };
        this.set_line_spacing = function(value) { line_spacing = value; return this; };

        this.get_align = function() { return align; };
        this.set_align = function(value) { align = value; return this; };

        this.get_padding = function() { return padding; };
        this.set_padding = function(value) { padding = value; return this; };

        this.get_padding_top = function() { return padding.top; };
        this.set_padding_top = function(value) { padding.top = value; return this; };

        this.get_padding_left = function() { return padding.left; };
        this.set_padding_left = function(value) { padding.left = value; return this; };

        this.get_padding_bottom = function() { return padding.bottom; };
        this.set_padding_bottom = function(value) { padding.bottom = value; return this; };

        this.get_padding_right = function() { return padding.right; };
        this.set_padding_right = function(value) { padding.right = value; return this; };

        this.get_cursor_point = function() { return cursor_point; };
        this.set_cursor_point = function(value) { cursor_point = value; return this; };

        this.get_cursor_point_x = function() { return cursor_point.x; };
        this.set_cursor_point_x = function(value) { cursor_point.x = value; return this; };

        this.get_cursor_point_y = function() { return cursor_point.y; };
        this.set_cursor_point_y = function(value) { cursor_point.y = value; return this; };

        function assemble_ctx(){
            ctx.font = font_style + ' ' + font_size + 'px ' + font_family;
            ctx.fillStyle = font_color;
        };

        this.carriage_return = function(){
            cursor_point.x = this.get_padding_left();
            return this;
        };

        this.line_feed = function(){
            cursor_point.y = cursor_point.y + font_size + line_spacing;
            return this;
        };

        this.crlf = function(){
            this.carriage_return();
            this.line_feed();
            return this;
        };

        this.write_segment = function(text){
            assemble_ctx();
            var text_height = ctx.measureText(text).height;
            var alpha_count = text.length;
            if(align === 'left'){
                this.crlf();
                for(var alpha_iter = 0; alpha_iter < alpha_count; alpha_iter++){
                    var alpha = text[alpha_iter];
                    var alpha_width = ctx.measureText(alpha).width;
                    if(cursor_point.x + alpha_width <= padding.right){
                        ctx.fillText(alpha, this.get_cursor_point_x(), this.get_cursor_point_y());
                        this.set_cursor_point_x(this.get_cursor_point_x() + alpha_width);
                    }
                    else{
                        this.crlf();
                        alpha_iter--;
                    };
                };
            }
            else if(align === 'center'){
                var text_window = {
                    start : 0,
                    width : text.length
                };
                while(text_window.start < text.length - 1){
                    var text_render_width = ctx.measureText(text.substring(text_window.start, text_window.start + text_window.width)).width;
                    while(text_render_width > this.get_padding_right() - this.get_padding_left()){
                        text_window.width = text_window.width - 1;
                        text_render_width = ctx.measureText(text.substring(text_window.start, text_window.start + text_window.width)).width;
                    };
                    this.crlf();
                    this.set_cursor_point_x(this.get_padding_left() + (this.get_padding_right() - this.get_padding_left() - text_render_width) / 2);
                    ctx.fillText(text.substring(text_window.start, text_window.start + text_window.width), this.get_cursor_point_x(), this.get_cursor_point_y());

                    text_window.start = text_window.start + text_window.width;
                    text_window.width = text.length - text_window.start;
                };
            };

            return this;
        };
    };

    root.cursor = cursor;
})(this);
