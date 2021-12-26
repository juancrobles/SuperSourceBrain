require('./../js/SuperSourceBrain');

describe("SuperSourceBrain", function(){
    var SuperSourceBrain = require('./../js/SuperSourceBrain');
    var superSourceBrain;

    beforeEach(function() {
        superSourceBrain = new SuperSourceBrain();
      });

    describe("has defined the folowing inputs", function() {
        it("should have inputBAString method", function() {
            expect(typeof (superSourceBrain.inputBAString)).toBe("function")
        });
    });

    describe("has defined the folowing outputs", function() {
        it("should have outputSuperSourceName method", function() {
            expect(typeof (superSourceBrain.outputSuperSourceName)).toBe("function")
        });
    });

    describe("with no panelists id on the inputBAString", function () {
        it("should return 'NOSOURCE' on the outputSuperSourceName", function() {
            superSourceBrain.inputBAString("");
            expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
        });
    });
});