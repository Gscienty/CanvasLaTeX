(() => {
    'use strict';

    this.latex.blocks.simple = function simple(word, topBuf, bottomBuf){
        var self = {};
        self.word = word;
        if(topBuf === undefined) { topBuf = new this.latex.buf(); };
        if(bottomBuf === undefined) { bottomBuf = new this.latex.buf(); };
        self.topBuf = topBuf;
        self.bottomBuf = bottomBuf;
        self.smallratio = 0.6;
        self.rightspacing = 0.1;

        this.name = 'simple';

        this.width = (cursor) => {
            var originwidth = cursor.getmeasure(self.word).width;
            var member = cursor.getsize();
            cursor.setsize(member * self.smallratio);
            var width = originwidth + Math.max(self.topBuf.width(cursor), self.bottomBuf.width(cursor));
            cursor.setsize(member);
            return width;
        };

        this.height = (cursor) => {
            var originheight = cursor.getmeasure(self.word).height;
            var member = cursor.getsize();
            cursor.setsize(member * self.smallratio);
            var height = originheight + Math.max(self.bottomBuf.height(cursor), self.topBuf.height(cursor));
            cursor.setsize(member);
            return width;
        };

        this.render = (cursor) => {
            var member = cursor.getsize();
            var x = cursor.getx();
            var y = cursor.gety();
            var measure = cursor.getmeasure(self.word);

            cursor.setsize(member * self.smallratio);
            var torheight = Math.max(self.topBuf.height(cursor), self.bottomBuf.height(cursor));

            cursor.sety(y - torheight * 0.5);
            cursor.setx(x + measure.width + member * self.rightspacing);
            self.bottomBuf.render(cursor);

            cursor.sety(y - torheight * 0.25 - measure.height);
            cursor.setx(x + measure.width + member * self.rightspacing);
            self.topBuf.render(cursor);
            
            cursor.setsize(member);
            cursor.setx(x);
            cursor.sety(y);
            cursor.write(self.word);

            cursor.setx(x + this.width(cursor));
        };
    };

    this.latex.blocks.simple.prototype = root.blocks.interface;

    this.latex.blocks.simple.build = (alpha) => {
        if(/^\\./.test(alpha)) alpha = alpha.substring(1);
        
        var word = alpha[0];
        for(var i = 1; i < alpha.length; i++){
            if(/[0-9A-Za-z]/.test(alpha[i])) { word = word + alpha[i]; }
            else { break; };
        }
        var top_length = 0;
        var bottom_length = 0;
        var is_top = 0;
        var is_bottom = 0;
        var top_param = '';
        var bottom_param = '';
        var px = 0;
        for(var i = word.length; i < alpha.length; i++){
            if (alpha[i] === '_' && is_bottom === 0) { is_bottom = 1; px = px + 1; }
            else if (alpha[i] === '^' && is_top === 0) { is_top = 1; px = px + 1;}
            else if (alpha[i] === '{' && is_bottom === 1) {
                bottom_length = root.blocks.get_param_length(alpha.substring(i));
                bottom_param = alpha.substr(i + 1, bottom_length);
                is_bottom = 2;
                i = i + 1 + bottom_length;
                px = px + 2;
            }
            else if(alpha[i] === '{' && is_top === 1) {
                top_length = root.blocks.get_param_length(alpha.substring(i));
                top_param = alpha.substr(i + 1, top_length);
                is_top = 2;
                i = i + 1 + top_length;
                px = px + 2;
            }
            else if (is_bottom === 1) {
                bottom_length = 1;
                bottom_param = alpha[i];
                is_bottom = 2;
            }
            else if (is_top === 1) {
                top_length = 1;
                top_param = alpha[i];
                is_top = 2;
            }
            else { break; };
        };

        return {
            remainder : alpha.substring(word.length + bottom_length + top_length + px),
            block : new this.latex.blocks.simple(word, (new this.latex.buf()).append(top_param), (new this.latex.buf()).append(bottom_param)) 
        };
    };
}).call(this);