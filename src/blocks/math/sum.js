(function(root){
    root.blocks.sum = function(start_line_buf, limit_line_buf){
        var self = {};
        self.line_bufs = [start_line_buf, limit_line_buf];
    };

    root.blocks.sum.prototype = root.blocks.abstract_block;

    root.blocks.sum.test = function(alpha) { return /^\\sum/.test(alpha); };

    root.blocks.sum.build = function(alpha){
        const block_length = 4;
        var start_length = 0;
        var start_param = '';
        var is_start = 0;
        var is_limit = 0;
        var limit_length = 0;
        var limit_param = '';
        var px = 0;
        
        for(var i = block_length; i < alpha.length; i++){
            if(alpha[i] === '_' && is_start === 0) { is_start = 1; px = px + 1; }
            else if(alpha[i] === '^' && is_limit === 0) { is_limit = 1; px = px + 1; }
            else if(alpha[i] === '{' && is_start === 1) {
                start_length = root.blocks.get_param_length(alpha.substring(i));
                start_param = alpha.substr(i + 1, start_length);
                is_start = 2;
                i = i + 1 + start_length;
                px = px + 2;
            }
            else if(alpha[i] === '{' && is_limit === 1) {
                limit_length = root.blocks.get_param_length(alpha.substring(i));
                limit_param = alpha.substr(i + 1, limit_length);
                is_limit = 2;
                i = i + 1 + limit_length;
                px = px + 2;
            }
            else if(is_start === 1){
                start_length = 1;
                start_param = alpha[i];
                is_start = 2;
            }
            else if(is_limit === 1){
                limit_length = 1;
                limit_param = alpha[i];
                is_limit = 2;
            }
            else { break; };
        };
        return [alpha.substring(block_length + start_length + limit_length + px), new root.blocks.sum((new root.line_buf()).append(start_param), (new root.line_buf()).append(limit_param))];
    };

    
})(this.latex);