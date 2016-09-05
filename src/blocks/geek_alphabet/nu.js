(function(root){
    'use strict';

    root.blocks.nu = {};
    root.blocks.nu.build = function(alpha){ return root.blocks.simple('ν' + alpha.substring(3)); };
    root.blocks.nu.test = function(alpha) { return /^\\nu/.test(alpha); };


    root.blocks.Nu = {};
    root.blocks.Nu.build = function(alpha){ return root.blocks.simple('Ν' + alpha.substring(3)); };
    root.blocks.Nu.test = function(alpha) { return /^\\Nu/.test(alpha); };

})(this.latex);