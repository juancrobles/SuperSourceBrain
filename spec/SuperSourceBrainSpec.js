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

        it("inputProcess", function() {
            expect(typeof (superSourceBrain.inputProcess)).toBe("function")
        });

        it("inputReset", function() {
            expect(typeof (superSourceBrain.inputReset)).toBe("function")
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

    describe('with one panelist id on inputBAString', () => {
        it('should return "NOSOURCE" on the outputSuperSourceName', () => {
            superSourceBrain.inputBAString("1234");

            expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
        });

        it('and triggering the input Process should return "1" on the outputSuperSourceName', () => {
            superSourceBrain.inputBAString("1234");
            superSourceBrain.inputProcess();

            expect(superSourceBrain.outputSuperSourceName()).toEqual("1");
        });
    });
});