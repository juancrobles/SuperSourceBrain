require('./../js/SuperSourceBrain');

describe("SuperSourceBrain", function(){
    var SuperSourceBrain = require('./../js/SuperSourceBrain');
    var superSourceBrain;

    beforeEach(function() {
        superSourceBrain = new SuperSourceBrain();
      });

    describe("should have the input", function() {
        it("inputBAString", function() {
            expect(typeof (superSourceBrain.inputBAString)).toBe("function")
        });
    });

    describe("should have the output", function() {
        it("outputSuperSourceName", function() {
            expect(typeof (superSourceBrain.outputSuperSourceName)).toBe("function")
        });
    });

    describe("with no panelists id on inputBAString", function () {
        it("should return 'NOSOURCE' on the outputSuperSourceName", function() {
            superSourceBrain.inputBAString("");
            expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
        });
    });
});