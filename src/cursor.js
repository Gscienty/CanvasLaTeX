(function(root){
    'use strict';

    function latex_cursor(canvas, top, right, bottom, left){
        var ctx = canvas.getContext('2d');
        var font_size = 14;
        var font_family = 'new times roman';
        var font_color = 'black';
        var font_style = 'normal';
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
        this.set_font_size = function(value) { font_size = value; return this; };

        this.get_font_family = function() { return font_family; };
        this.set_font_family = function(value) { font_family = value; return this; };

        this.get_font_color = function() { return font_color; };
        this.set_font_color = function(value) { font_color = value; return this; };

        this.get_font_style = function() { return font_style; };
        this.set_font_style = function(value) { font_style = value; return this; };

        this.get_line_spacing = function() { return line_spacing; };
        this.set_line_spacing = function(value) { line_spacing = value; return this; };

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
            this.set_cursor_point_y(this.get_cursor_point_y() + this.get_font_size() + this.get_line_spacing());
            return this.get_cursor_point_y() < this.get_padding_bottom();
        };

        this.get_measure = function(text){
            return {
                width : ctx.measureText(text).width,
                height : this.get_font_size() + this.get_line_spacing()
            };
        };

        this.write_word = function(word){
            assemble_ctx();
            if(ctx.measureText(word).width + this.get_cursor_point_x() < this.get_padding_right()){
                ctx.fillText(word, this.get_cursor_point_x(), this.get_cursor_point_y());
                this.set_cursor_point_x(this.get_cursor_point_x() + this.get_measure(word).width);
                return true;
            };
            return false;
        };

        this.jump_space = function(width){
            if(width + this.get_cursor_point_x() < this.get_padding_right()){
                this.set_cursor_point_x(this.get_cursor_point_x() + width);
                return true;
            };
            return false;
        };

        this.use_cfg = function(cfg){
            this.set_font_size(cfg.font_size);
            this.set_font_family(cfg.font_family);
            this.set_font_color(cfg.font_color);
            this.set_font_style(cfg.font_style);
            this.set_line_spacing(cfg.line_spacing);
        };
    };

    root.cursor = latex_cursor;

    root.cursor_default_cfg = {
        paragraph_body : {
            font_size : 14,
            font_family : 'new times roman',
            font_color : 'black',
            font_style : 'normal',
            line_spacing : 10
        },
        paragraph_title : {
            font_size : 14,
            font_family : 'new times roman',
            font_color : 'black',
            font_style : 'bold',
            line_spacing : 10
        }
    };
})(this.latex);
