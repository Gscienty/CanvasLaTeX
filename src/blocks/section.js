(function(root){
    function local_section_cfg(){
        var self = {};
        self.section = 0;
        self.sub_section = 0;
        self.sub_sub_section = 0;

        this.get_new_section_id = function(){
            self.section = self.section + 1;
            self.sub_section = 0;
            self.sub_sub_section = 0;

            return '' + self.section;
        };

        this.get_new_sub_section_id = function(){
            self.sub_section = self.sub_section + 1;
            self.sub_sub_section = 0;

            return self.section + '.' + self.sub_section;
        };

        this.get_new_sub_sub_section_id = function(){
            self.sub_sub_section = self.sub_sub_section + 1;

            return self.section + '.' + self.sub_section + '.' + self.sub_sub_section;
        };
    };

    root.blocks.section_cfg = new local_section_cfg();
})(this.latex);

(function(root, cfg){
    'use strict';

    root.blocks.origin_section = function(line_buf, cfg_h, num){
        var self = {};
        self.line_buf = line_buf;
        self.cfg = cfg_h;

        self.line_buf.insert('\\jump{0.2} ', 0);
        self.line_buf.insert(num, 0);

        this.get_block_width = function(cursor){
            var remember_origin_cfg = cursor.get_cfg();
            cursor.set_cfg(self.cfg);
            var result = self.line_buf().get_width(cursor);
            cursor.set_cfg(remember_origin_cfg);
            return result;
        };

        this.get_block_height = function(cursor){
            var remember_origin_cfg = cursor.get_cfg();
            cursor.set_cfg(self.cfg);
            var result = self.line_buf.get_height(cursor);
            cursor.set_cfg(remember_origin_cfg);
            return result;
        };

        this.block_render = function(cursor){
            var remember_origin_cfg = cursor.get_cfg();
            cursor.set_cfg(self.cfg);
            self.line_buf.render(cursor);
            cursor.set_cfg(remember_origin_cfg);
        };
    };

    root.blocks.origin_section.prototype = root.blocks.abstract_block;

    root.blocks.section = function(line_buf){
        return new root.blocks.origin_section(line_buf, cfg.h1, root.blocks.section_cfg.get_new_section_id());
    };

    root.blocks.section.build = function(alpha){
        const block_length = 8;
        const param_length = root.blocks.get_param_length(alpha.substring(block_length));
        return [alpha.substring(block_length + param_length + 2), new root.blocks.section((new root.line_buf()).append(alpha.substr(block_length + 1, param_length)))];
    };

    root.blocks.section.test = function(alpha) { return /^\\section/.test(alpha); };

    root.blocks.subsection = function(line_buf){
        return new root.blocks.origin_section(line_buf, cfg.h2, root.blocks.section_cfg.get_new_sub_section_id());
    };

    root.blocks.subsection.build = function(alpha){
        const block_length = 11;
        const param_length = root.blocks.get_param_length(alpha.substring(block_length));
        return [alpha.substring(block_length + param_length + 2), new root.blocks.subsection((new root.line_buf()).append(alpha.substr(block_length + 1, param_length)))];
    };

    root.blocks.subsubsection = function(line_buf){
        return new root.blocks.origin_section(line_buf, cfg.h3, root.blocks.section_cfg.get_new_sub_sub_section_id());
    };

    root.blocks.subsubsection.build = function(alpha){
        const block_length = 14;
        const param_length = root.blocks.get_param_length(alpha.substring(block_length));
        return [alpha.substring(block_length + param_length + 2), new root.blocks.subsubsection((new root.line_buf()).append(alpha.substr(block_length + 1, param_length)))];
    };
})(this.latex, this.latex.cursor_default_cfg);
