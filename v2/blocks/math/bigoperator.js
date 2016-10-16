((root) => {
    'use strict';

    var originBigOperator = (name, flag, bottomBuf, topBuf) => {
        var self = {};
        self.topBuf = topBuf;
        self.bottomBuf = bottomBuf;
        self.operation = flag;
        self.smallRatio = 0.75;
        self.bigRatio = 1.75;
        self.verticalSpacing = 0.1;
        self.leftSpacing = 0.5;
        self.name = name;

        self.GetBottomMeasure = (cursor) => {
            var member = cursor.GetSize();
            cursor.SetSize(member.mul(self.smallRatio));
            var result = { Height : self.bottomBuf.GetHeight(cursor), Width : self.bottomBuf.GetWidth(cursor) };
            cursor.SetSize(member);
            return result;
        };

        self.GetTopMeasure = (cursor) => {
            var member = cursor.GetSize();
            cursor.SetSize(member.mul(self.smallRatio));
            var result = { Height : self.topBuf.GetHeight(cursor), Width : self.topBuf.GetWidth(cursor) };
            cursor.SetSize(member);
            return result;
        };

        self.GetOperationMeasure = (cursor) => {
            var member = cursor.GetSize();
            cursor.SetSize(member.mul(self.bigRatio));
            var result = cursor.GetMeasure(self.operation);
            cursor.SetSize(member);
            return result;
        };

        var instance = {
            Name : self.name,
            GetWidth : (cursor) => { return Math.max(self.GetBottomMeasure(cursor).Width, self.GetTopMeasure(cursor).Width, self.GetOperationMeasure(cursor).Width).add(cursor.GetSize().mul(self.leftSpacing)); },
            GetHeight : (cursor) => { return Math.max(self.GetTopMeasure(cursor).Height, self.GetBottomMeasure(cursor).Height).mul(2).add(self.GetOperationMeasure(cursor).Height.mul(self.verticalSpacing.add(1))); },
            Render : (cursor) => {
                const member = cursor.GetSize();
                const position = cursor.GetPosition();
                const measure = { Width : instance.GetWidth(cursor), Height : instance.GetHeight(cursor) };
                const topMeasure = self.GetTopMeasure(cursor);
                const bottomMeasure = self.GetBottomMeasure(cursor);
                const operationMeasure = self.GetOperationMeasure(cursor);
                const smallToy = Math.max(topMeasure.Height, bottomMeasure.Height);

                cursor.SetPosition({ X : position.X.add(measure.Width.add(-operationMeasure.Width).mul(0.5)), Y : position.Y.add(operationMeasure.Height.mul(0.5)) });
                cursor.SetSize(member.mul(self.bigRatio));
                cursor.Write(self.operation);

                cursor.SetSize(member.mul(self.smallRatio));

                cursor.SetPosition({ X : position.X.add(measure.Width.add(-bottomMeasure.Width).mul(0.5)), Y : position.Y.add(operationMeasure.Height.mul(0.5)).add(bottomMeasure.Height.mul(0.5)).add(measure.Height.mul(self.verticalSpacing)) });
                self.bottomBuf.Render(cursor);

                cursor.SetPosition({ X : position.X.add(measure.Width.add(-topMeasure.Width).mul(0.5)), Y : position.Y.add(-operationMeasure.Height.mul(0.5)).add(-topMeasure.Height.mul(0.5)) });
                self.topBuf.Render(cursor);

                cursor.SetSize(member);
                cursor.SetPosition({ X : position.X.add(measure.Width).add(cursor.GetSize().mul(self.leftSpacing)), Y : 0 });
            }
        };

        return instance;
    };

    var originBuild = (name, flag, length, alpha) => {
        const blockLength = length;
        var startLength = 0;
        var startParameter = '';
        var isStart = 0;
        var isLimit = 0;
        var limitLength = 0;
        var limitParameter = '';
        var px = 0;
        
        for(var i = blockLength; i < alpha.length; i++){
            if(alpha[i] === '_' && isStart === 0) { isStart = 1; px = px + 1; }
            else if(alpha[i] === '^' && isLimit === 0) { isLimit = 1; px = px + 1; }
            else if(alpha[i] === '{' && isStart === 1) {
                startLength = root.utils.GetParameterLength(alpha.substring(i));
                startParameter = alpha.substr(i + 1, startLength);
                isStart = 2;
                i = i + 1 + startLength;
                px = px + 2;
            }
            else if(alpha[i] === '{' && isLimit === 1) {
                limitLength = root.utils.GetParameterLength(alpha.substring(i));
                limitParameter = alpha.substr(i + 1, limitLength);
                isLimit = 2;
                i = i + 1 + limitLength;
                px = px + 2;
            }
            else if(isStart === 1){
                startLength = 1;
                startParameter = alpha[i];
                isStart = 2;
            }
            else if(isLimit === 1){
                limitLength = 1;
                limitParameter = alpha[i];
                isLimit = 2;
            }
            else { break; };
        };

        return {
            Remainder : alpha.substring(blockLength.add(startLength).add(limitLength).add(px)),
            Instance : originBigOperator(name, flag, root.buf.CreateBuf().TransferText(startParameter), root.buf.CreateBuf().TransferText(limitParameter))
        };
    };

    root.blocks.sum = {
        Build : (alpha) => { return originBuild('sum', 'Σ', 4, alpha); },
        Test : (alpha) => { return /^\\sum/.test(alpha); }
    };
    root.blocks.max = {
        Build : (alpha) => { return originBuild('max', 'max', 4, alpha); },
        Test : (alpha) => { return /^\\max/.test(alpha); }
    };
    root.blocks.min = {
        Build : (alpha) => { return originBuild('min', 'min', 4, alpha); },
        Test : (alpha) => { return /^\\min/.test(alpha); }
    };
    root.blocks.prod = {
        Build : (alpha) => { return originBuild('prod', 'Π', 5, alpha); },
        Test : (alpha) => { return /^\\prod/.test(alpha); }
    };
    root.blocks.bigcup = {
        Build : (alpha) => { return originBuild('bigcup', '∪', 7, alpha); },
        Test : (alpha) => { return /^\\bigcup/.test(alpha); }
    };
    root.blocks.bigcap = {
        Build : (alpha) => { return originBuild('bigcap', '∩', 7, alpha); },
        Test : (alpha) => { return /^\\bigcap/.test(alpha); }
    };
    root.blocks.bigvee = {
        Build : (alpha) => { return originBuild('bigvee', '∨', 7, alpha); },
        Test : (alpha) => { return /^\\bigvee/.test(alpha); }
    };
    root.blocks.bigwedge = {
        Build : (alpha) => { return originBuild('bigwedge', '∧', 9, alpha); },
        Test : (alpha) => { return /^\\bigwedge/.test(alpha); }
    };
    root.blocks.bigoplus = {
        Build : (alpha) => { return originBuild('bigoplus', '⊕', 9, alpha); },
        Test : (alpha) => { return /^\\bigoplus/.test(alpha); }
    };
    root.blocks.bigotimes = {
        Build : (alpha) => { return originBuild('bigotimes', '⊙', 10, alpha); },
        Test : (alpha) => { return /^\\bigotimes/.test(alpha); }
    };
    //yes yes i'm lazybones
    root.blocks.lim = {
        Build : (alpha) => { return originBuild('lim', 'lim', 4, alpha); },
        Test : (alpha) => { return /^\\lim/.test(alpha); }

    }
})(this.latex);