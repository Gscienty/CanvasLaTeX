(function(root){
    'use strict';

    root.blocks.pi = {};
    root.blocks.pi.build = function(alpha){ return root.blocks.simple('π' + alpha.substring(3)); };
    root.blocks.pi.test = function(alpha) { return /^\\pi/.test(alpha); };


    root.blocks.Pi = {};
    root.blocks.Pi.build = function(alpha){ return root.blocks.simple('∏' + alpha.substring(3)); };
    root.blocks.Pi.test = function(alpha) { return /^\\Pi/.test(alpha); };

})(this.latex);