(function(root){
    'use strict';

    root.blocks.chi = {};
    root.blocks.chi.build = function(alpha){ return root.blocks.simple('χ' + alpha.substring(4)); };
    root.blocks.chi.test = function(alpha) { return /^\\chi/.test(alpha); };


    root.blocks.Chi = {};
    root.blocks.Chi.build = function(alpha){ return root.blocks.simple('Χ' + alpha.substring(4)); };
    root.blocks.Chi.test = function(alpha) { return /^\\Chi/.test(alpha); };

})(this.latex);