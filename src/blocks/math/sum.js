(function(root){
    root.blocks.sum = function(start_line_buf, limit_line_buf){
        var self = {};
        self.line_bufs = [start_line_buf, limit_line_buf];
    };

    root.blocks.sum.prototype = root.blocks.abstract_block;

    root.blocks.sum.build = function(alpha){

    };
})(this.latex);