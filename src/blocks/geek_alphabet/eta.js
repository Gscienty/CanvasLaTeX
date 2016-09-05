(function(root){
    'use strict';

    root.blocks.eta = {};
    root.blocks.eta.build = function(alpha){ return root.blocks.simple.build('η' + alpha.substring(4)); };
    root.blocks.eta.test = function(alpha) { return /^\\eta/.test(alpha); };


    root.blocks.Eta = {};
    root.blocks.Eta.build = function(alpha){ return root.blocks.simple.build('E' + alpha.substring(4)); };
    root.blocks.Eta.test = function(alpha) { return /^\\Eta/.test(alpha); };

})(this.latex);