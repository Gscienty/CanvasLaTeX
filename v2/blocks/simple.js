((root) => {
    'use strict';

    root.blocks.simple = {
        GetInstance : (innerWord, topBuf, bottomBuf) => {
            const smallRatio = 0.75;
            const wordPointSpacing = 0.05;
            var self = {};
            self.innerWord = innerWord;
            self.top = (topBuf === undefined ? root.buf.CreateBuf() : topBuf);
            self.bottom = (bottomBuf === undefined ? root.buf.CreateBuf() : bottomBuf);

            var instance = {
                Name : 'simple',
                GetWidth : (cursor) => {
                    const originWidth = cursor.GetMeasure(self.innerWord).Width;
                    const member = cursor.GetSize();

                    cursor.SetSize(member.mul(smallRatio));
                    var width = originWidth.add(Math.max(self.top.GetWidth(cursor), self.bottom.GetWidth(cursor)));
                    cursor.SetSize(member);

                    return width;
                },
                GetHeight : (cursor) => {
                    const originHeight = cursor.GetMeasure(self.innerWord).Height;
                    const member = cursor.GetSize();

                    cursor.SetSize(member.mul(smallRatio));
                    var height = originHeight.add(Math.max(self.top.GetHeight(cursor), self.bottom.GetHeight(cursor)));
                    cursor.SetSize(member);

                    return height;
                },
                Render : (cursor) => {
                    const member = cursor.GetSize();
                    const position = cursor.GetPosition();
                    const measure = cursor.GetMeasure(self.innerWord);

                    cursor.SetSize(member.mul(smallRatio));
                    const torHeight = Math.max(self.top.GetHeight(cursor), self.bottom.GetHeight(cursor));

                    cursor.SetPosition({ X : position.X.add(measure.Width).add(member.mul(wordPointSpacing)), Y : position.Y.add(measure.Height.mul(0.5)) });
                    self.bottom.Render(cursor);

                    cursor.SetPosition({ X : position.X.add(measure.Width).add(member.mul(wordPointSpacing)), Y : position.Y.add(-measure.Height.mul(0.5)) });
                    self.top.Render(cursor);

                    cursor.SetSize(member);
                    cursor.SetPosition({ X : position.X, Y : position.Y.add(measure.Height.mul(0.5)) });
                    cursor.Write(self.innerWord);

                    cursor.SetPosition({ X : position.X.add(instance.GetWidth(cursor)), Y : 0 });
                }
            };
            return instance;
        },
        Build : (alpha) => {
            if(/^\\./.test(alpha)) { alpha = alpha.substring(1); };

            var word = alpha[0];
            for(var i = 1; i < alpha.length; i++){
                if(/[0-9A-Za-z]|\./.test(alpha[i])) { word = word + alpha[i]; }
                else { break; };
            };

            var topLength = 0;
            var bottomLength = 0;
            var isTop = 0;
            var isBottom = 0;
            var topParameter = '';
            var bottomParameter = '';
            var px = 0;
            for(var i = word.length; i < alpha.length; i++){
                if(alpha[i] === '_' && isBottom === 0) { isBottom = 1; px = px.add(1); }
                else if(alpha[i] === '^' && isTop === 0) { isTop = 1; px = px.add(1); }
                else if(alpha[i] === '{' && isBottom === 1) {
                    bottomLength = root.utils.GetParameterLength(alpha);
                    bottomParameter = alpha.substr(i + 1, bottomLength);
                    isBottom = 2;
                    i = i.add(1).add(bottomLength);
                    px = px.add(2);
                }
                else if(alpha[i] === '{' && isTop === 1) {
                    topLength = root.utils.GetParameterLength(alpha);
                    topParameter = alpha.substr(i + 1, topLength);
                    isTop = 2;
                    i = i.add(1).add(topLength);
                    px = px.add(2);
                }
                else if(isBottom === 1) {
                    bottomLength = 1;
                    bottomParameter = alpha[i];
                    isBottom = 2;
                }
                else if(isTop === 1) {
                    topLength = 1;
                    topParameter = alpha[i];
                    isTop = 2;
                }
                else { break; };
            };
            return {
                Remainder : alpha.substring(word.length.add(bottomLength).add(topLength).add(px)),
                Instance : root.blocks.simple.GetInstance(word, root.buf.CreateBuf().TransferText(topParameter), root.buf.CreateBuf().TransferText(bottomParameter))
            };
        }
    }
})(this.latex);