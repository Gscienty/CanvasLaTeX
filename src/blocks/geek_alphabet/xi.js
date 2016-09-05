(function(root){
    'use strict';

    root.blocks.xi = {};
    root.blocks.xi.build = function(alpha){ return root.blocks.simple('ξ' + alpha.substring(3)); };
    root.blocks.xi.test = function(alpha) { return /^\\xi/.test(alpha); };


    root.blocks.Xi = {};
    root.blocks.Xi.build = function(alpha){ return root.blocks.simple('Ξ' + alpha.substring(3)); };
    root.blocks.Xi.test = function(alpha) { return /^\\Xi/.test(alpha); };

})(this.latex);