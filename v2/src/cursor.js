(() => {
    this.latex.cursor = function(svg) {
        var self = {};
        self.style = {
            'font-size' : '16px'
        };
        self.size = 18;
        self.cursor = {x : 0, y : 0};

        var textarea = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        svg.appendChild(textarea);

        var testelement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        testelement.setAttribute('x', '0');
        testelement.setAttribute('y', '0'); 
        textarea.appendChild(testelement);

        var getStyleString = () => {
            var result = '';
            for(var name in self.style){
                result = result + name + ':' + self.style[name] + ';';
            };
            return result;
        };

        this.getsize = () => { return self.size; }
        this.setsize = (value) => { 
            self.style['font-size'] = value + 'px';
            self.size = value;
        };

        this.getstyle = () => { return self.style; };
        this.setstyle = (value) => { self.style = value; };

        this.getx = () => { return self.cursor.x; };
        this.setx = (value) => { self.cursor.x = value; };

        this.gety = () => { return self.cursor.y; };
        this.sety = (value) => { self.cursor.y = value; };

        this.getmeasure = (text) => {
            testelement.setAttributeNS('http://www.w3.org/2000/svg', 'style', getStyleString());
            testelement.innerHTML = text;
            return{
                width : testelement.scrollWidth,
                height : testelement.scrollHeight
            };
        };

        this.write = (text) => {
            var word = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            word.setAttributeNS('http://www.w3.org/2000/svg', 'style', getStyleString());
            word.style = self.style;
            word.setAttribute('x', self.cursor.x);
            word.setAttribute('y', self.cursor.y);
            word.innerHTML = text; 
            textarea.appendChild(word);

            this.setx(this.getx() + this.getmeasure(text).width);
        };
    };
}).call(this);