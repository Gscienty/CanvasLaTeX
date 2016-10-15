((root) => {
    'use strict';

    var localSectionConfig = () => {
        var self = {};
        self.section = 0;
        self.subSection = 0;
        self.subSubSection = 0;

        this.GetNewSectionId = () => {
            self.section = self.section.add(1);
            self.subSection = 0;
            self.subSubSection = 0;
            return '' + self.section;
        };

        this.GetNewSubSectionId = () => {
            self.subSection = self.subSection.add(1);
            self.subSubSection = 0;
            return self.section + '.' + self.subSection;
        };

        this.GetNewSubSubSectionId = () => {
            self.subSubSection = self.subSubSection.add(1);
            return self.section + '.' + self.subSection + '.' + self.subSubSection;
        };
    };

    root.blocks.originSection = {
        GetInstance : () => {

        }
    };
})(this.latex);