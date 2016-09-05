(function(root){
    root.blocks.it = function(line_buf){
        var self = {};
        self.line_buf = line_buf;

        this.get_block_name = function(){ return 'it'; };

        this.get_block_width = function(cursor){
            var member = cursor.get_style();
            cursor.set_style('italic');
            var width = self.line_buf.get_width(cursor);
            cursor.set_style(member);
            return width;
        };

        this.get_block_height = function(cursor){
            var member = cursor.get_style();
            cursor.set_style('italic');
            var height = self.line_buf.get_height(cursor);
            cursor.set_style(member);
            return height;
        };

        this.block_render = function(cursor){
            var member = cursor.get_style();
            cursor.set_style('italic');
            cursor.set_y(cursor.get_y() - this.get_block_height(cursor) / 2);
            self.line_buf.render(cursor);
            cursor.set_style(member);
        };
    };

    root.blocks.it.prototype = root.blocks.abstract_block;
    
    root.blocks.it.test = function(alpha) { return /^{\\it/.test(alpha); };

    root.blocks.it.build = function(alpha) {
        const param_length = root.blocks.get_param_length(alpha);
        return [alpha.substring(param_length + 2), new root.blocks.it((new root.line_buf()).append(alpha.substr(4, param_length - 3)))];
    };
})(this.latex);