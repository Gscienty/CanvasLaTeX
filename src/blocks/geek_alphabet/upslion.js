(function(root){
    'use strict';

    root.blocks.upsilon = {};
    root.blocks.upsilon.build = function(alpha){ return root.blocks.simple.build('υ' + alpha.substring(8)); };
    root.blocks.upsilon.test = function(alpha) { return /^\\upsilon/.test(alpha); };

    root.blocks.Upsilon = {};
    root.blocks.Upsilon.build = function(alpha){ return root.block_length.simple.build('Υ' + alpha.substring(8)); };
    root.blocks.Upsilon.test = function(alpha) { return /^\\Upsilon/.test(alpha); };
})(this.latex);