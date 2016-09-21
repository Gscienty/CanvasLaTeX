(function(root){
    root.cursor_default_cfg = {
        paragraph_body : {
            size : 14,
            family : 'new times roman',
            color : 'black',
            style : 'normal'
        },
        paragraph_title : {
            size : 14,
            family : 'new times roman',
            color : 'black',
            style : 'bold'
        },
        h1 : {
            size : 24,
            family : 'new times roman',
            color : 'black',
            style : 'bold'
        },
        h2 : {
            size : 18,
            family : 'new times roman',
            color : 'black',
            style : 'bold'
        },
        h3 : {
            size : 16,
            family : 'new times roman',
            color : 'black',
            style : 'bold'
        }
    };
})(this.latex);

(function(root){
    'use strict';

    function latex_cursor(canvas, top, right, bottom, left){
        var self = {};

        self.ctx = canvas.getContext('2d');
        self.size = 14;
        self.family = 'new times roman';
        self.color = 'black';
        self.style = 'normal';
        self.cursor = {
            x : left,
            y : top
        };

        this.get_size = function() { return self.size; };
        this.set_size = function(value) { self.size = value; return this; };

        this.get_family = function() { return self.family; };
        this.set_family = function(value) { self.family = value; return this; };

        this.get_color = function() { return self.color; };
        this.set_color = function(value) { self.color = value; return this; };

        this.get_style = function() { return self.style; };
        this.set_style = function(value) { self.style = value; return this; };

        this.get_cursor = function() { return self.cursor; };
        this.set_cursor = function(value) { self.cursor = value; return this; };

        this.get_x = function() { return self.cursor.x; };
        this.set_x = function(value) { self.cursor.x = value; return this; };

        this.get_y = function() { return self.cursor.y; };
        this.set_y = function(value) { self.cursor.y = value; return this; };

        function assemble_ctx(){
            self.ctx.font = self.style + ' ' + self.size + 'px ' + self.family;
            self.ctx.fillStyle = self.color;
        };

        this.get_measure = function(text){
            assemble_ctx();
            return {
                width : self.ctx.measureText(text).width,
                height : this.get_size() * 0.5
            };
        };

        this.write_word = function(word){
            assemble_ctx();
            self.ctx.fillText(word, this.get_x(), this.get_y());
            this.set_x(this.get_x() + this.get_measure(word).width);
        };

        this.jump_space = function(spacing){
            this.set_x(this.get_x() + spacing * this.get_size());
        };

        this.draw_line = function(x1, y1, x2, y2){
            self.ctx.moveTo(x1, y1);
            self.ctx.lineTo(x2, y2);
            self.ctx.stroke();
        };

        this.set_cfg = function(cfg){
            this.set_size(cfg.size);
            this.set_family(cfg.family);
            this.set_color(cfg.color);
            this.set_style(cfg.style)
        };

        this.get_cfg = function(){
            return {
                size : this.get_size(),
                family : this.get_family(),
                color : this.get_color(),
                style : this.get_style()
            };
        };

        this.get_rendered = function(startx, starty, endx, endy){
            return self.ctx.getImageData(startx, starty, endx, endy);
        };

        this.put_image = function(startx, starty, img){
            self.ctx.putImageData(img, startx, starty);
        };
    };

    root.cursor = latex_cursor;
})(this.latex);
