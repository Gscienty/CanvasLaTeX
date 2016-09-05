(function(root){
    root.blocks.center = function(line_buf){
        var self = {};
        self.line_buf = line_buf;

        this.get_block_name = function(){ return 'center'; };

        this.get_block_width = function(cursor){
            return self.line_buf.get_width(cursor);
        };

        this.get_block_height = function(cursor){
            return self.line_buf.get_height(cursor);
        };

        this.block_render = function(cursor){
            cursor.set_y(cursor.get_y() - this.get_block_height(cursor) / 2);
            self.line_buf.render(cursor);
        };
    };

    root.blocks.center.prototype = root.blocks.abstract_block;
    
    root.blocks.center.test = function(alpha) { return /^{\\center/.test(alpha); };

    root.blocks.center.build = function(alpha) {
        const param_length = root.blocks.get_param_length(alpha);
        return [alpha.substring(param_length + 2), new root.blocks.center((new root.line_buf()).append(alpha.substr(8, param_length - 7)))];
    };
})(this.latex);