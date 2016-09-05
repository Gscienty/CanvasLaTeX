(function(root){
    'use strict';

    root.blocks.iota = {};
    root.blocks.iota.build = function(alpha){ return root.blocks.simple('ι' + alpha.substring(5)); };
    root.blocks.iota.test = function(alpha) { return /^\\iota/.test(alpha); };


    root.blocks.Iota = {};
    root.blocks.Iota.build = function(alpha){ return root.blocks.simple('Ι' + alpha.substring(5)); };
    root.blocks.Iota.test = function(alpha) { return /^\\Iota/.test(alpha); };

})(this.latex);