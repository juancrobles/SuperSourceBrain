require('./../js/SuperSourceBrain');

describe("SuperSourceBrain", function(){
    var SuperSourceBrain = require('./../js/SuperSourceBrain');
    var superSourceBrain;

    beforeEach(function() {
        superSourceBrain = new SuperSourceBrain();
      });

    describe("should have the input", function() {
        it("inputHandsAPI", function() {
            expect(typeof (superSourceBrain.inputHandsAPI)).toBe("function")
        });

        it("inputSuccessAPI", function() {
            expect(typeof (superSourceBrain.inputSuccessAPI)).toBe("function")
        });

        it("inputMaxBoxes", function() {
            expect(typeof (superSourceBrain.inputMaxBoxes)).toBe("function")
        });
    });

    describe("should have the output", function() {
        it("outputSuperSourceName", function() {
            expect(typeof (superSourceBrain.outputSuperSourceName)).toBe("function")
        });

        it("outputSuperSourceUpdated", function() {
            expect(typeof (superSourceBrain.outputSuperSourceUpdated)).toBe("function")
        });

        it("outputSearchPins", function() {
            expect(typeof (superSourceBrain.outputSearchPins)).toBe("function")
        });
    });

    describe("with invalid data", function () {
        describe("and success on the API request", function() {
            it("should return 'NOSOURCE' on the outputSuperSourceName", function() {
                superSourceBrain.inputHandsAPI("undefined\nundefined\nundefined");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
            });
        });

        describe("and failure on the API request", function() {
            it("should return 'NOSOURCE' on the outputSuperSourceName", function() {
                superSourceBrain.inputHandsAPI("undefined\nundefined\nundefined");
                superSourceBrain.inputSuccessAPI(0);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
            });
        });
    });

    describe("with no panelists on the question", function () {
        describe("and success on the API request", function() {
            it("should return 'NOSOURCE' on the outputSuperSourceName", function() {
                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
            });
        });

        describe("and failure on the API request", function() {
            it("should return 'NOSOURCE' on the outputSuperSourceName", function() {
                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(0);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
            });
        });
    });

    describe('with one panelist as upcoming answerer', () => {
        describe("and success on the API request", function() {
            it("should return '1' on the outputSuperSourceName", function() {
                superSourceBrain.inputHandsAPI("1254\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual('1');
            });
        });

        describe("and failure on the API request", function() {
            it("should return 'NOSOURCE' on the outputSuperSourceName", function() {
                superSourceBrain.inputHandsAPI("1254\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(0);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
            });
        });

    });

    describe('with one panelist as current answerer', () => {
        describe("and success on the API request", function() {
            it("should return '1' on the outputSuperSourceName", function() {
                superSourceBrain.inputHandsAPI("NONE\n1254\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual('1');
            });

            it('should have "0" as index on current panelist index', () => {
                superSourceBrain.inputHandsAPI("NONE\n1254\nNONE");
                superSourceBrain.inputSuccessAPI(1);

                expect(superSourceBrain.currentPanelist).toEqual(0);
            });
        });

        describe("and failure on the API request", function() {
            it("should return 'NOSOURCE' on the outputSuperSourceName", function() {
                superSourceBrain.inputHandsAPI("NONE\n1254\nNONE");
                superSourceBrain.inputSuccessAPI(0);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
            });
        });

    });

    describe('with one panelist as previous answerer', () => {
        describe("and success on the API request", function() {
            it("should return 'NOSOURCE' on the outputSuperSourceName", function() {
                superSourceBrain.inputHandsAPI("NONE\nNONE\n1254");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual('NOSOURCE');
            });
            it('should have "-1" as index on current panelist index', () => {
                superSourceBrain.inputHandsAPI("NONE\nNONE\n1254");
                superSourceBrain.inputSuccessAPI(1);

                expect(superSourceBrain.currentPanelist).toEqual(-1);
            });
        });

        describe("and failure on the API request", function() {
            it("should return 'NOSOURCE' on the outputSuperSourceName", function() {
                superSourceBrain.inputHandsAPI("NONE\nNONE\n1254");
                superSourceBrain.inputSuccessAPI(0);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
            });
        });

    });

    describe('with one panelist cycle through the question', function() {
        describe('added as upcoming asnwerer', function() {
            it('should return "1" on the ourputSourceName', () => {
                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");

                superSourceBrain.inputHandsAPI("1254\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("1");
            });
            it('should have "-1" as index on current panelist index', () => {
                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");

                superSourceBrain.inputHandsAPI("1254\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);

                expect(superSourceBrain.outputSuperSourceName()).toEqual("1");
                expect(superSourceBrain.currentPanelist).toEqual(-1);
            });
        });
        describe('changed to current asnwerer', function() {
            it('should return "1" on the ourputSourceName', () => {
                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");

                superSourceBrain.inputHandsAPI("1254\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);

                expect(superSourceBrain.outputSuperSourceName()).toEqual("1");

                superSourceBrain.inputHandsAPI("NONE\n1254\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("1");
            });
        });
        describe('changed to previous asnwerer', function() {
            it('should return "1" on the ourputSourceName', () => {
                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");

                superSourceBrain.inputHandsAPI("1254\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);

                expect(superSourceBrain.outputSuperSourceName()).toEqual("1");

                superSourceBrain.inputHandsAPI("NONE\n1254\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("1");

                superSourceBrain.inputHandsAPI("NONE\nNONE\n1254");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
            });
        });
        describe('flushed out as asnwerer', function() {
            it('should return "NOSOURCE" on the ourputSourceName', () => {
                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");

                superSourceBrain.inputHandsAPI("1254\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);

                expect(superSourceBrain.outputSuperSourceName()).toEqual("1");

                superSourceBrain.inputHandsAPI("NONE\n1254\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("1");

                superSourceBrain.inputHandsAPI("NONE\nNONE\n1254");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");

                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
            });
        });
    });

    describe('with two panelist cycle through the question', function() {
        describe('added panelists as upcoming asnwerers', function() {
            it('should return "12" on the ourputSourceName', () => {
                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");

                superSourceBrain.inputHandsAPI("1254,1125\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("12");
            });
        });
        describe('changed first panelist to current asnwerer', function() {
            it('should return "12" on the ourputSourceName', () => {
                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");

                superSourceBrain.inputHandsAPI("1254,1125\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);

                expect(superSourceBrain.outputSuperSourceName()).toEqual("12");

                superSourceBrain.inputHandsAPI("1125\n1254\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("12");
            });
        });
        describe('changed second panelist to current asnwerer', function() {
            it('should return "2" on the ourputSourceName', () => {
                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");

                superSourceBrain.inputHandsAPI("1254,1125\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);

                expect(superSourceBrain.outputSuperSourceName()).toEqual("12");

                superSourceBrain.inputHandsAPI("1125\n1254\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("12");

                superSourceBrain.inputHandsAPI("NONE\n1125\n1254");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("2");
            });
        });
        describe('changed second panelist to previous asnwerer', function() {
            it('should return "NOSOURCE" on the ourputSourceName', () => {
                superSourceBrain.inputHandsAPI("NONE\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");

                superSourceBrain.inputHandsAPI("1254,1125\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);

                expect(superSourceBrain.outputSuperSourceName()).toEqual("12");

                superSourceBrain.inputHandsAPI("1125\n1254\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("12");

                superSourceBrain.inputHandsAPI("NONE\n1125\n1254");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("2");

                superSourceBrain.inputHandsAPI("NONE\nNONE\n1254,1125");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
            });
        });

        describe('generate the pins for all panelists', function() {
            it('should return a list of all pins of the panelists on the ourputSearchPins', () => {
                superSourceBrain.inputHandsAPI("1254,1125\nNONE\nNONE");
                superSourceBrain.inputSuccessAPI(1);

                expect(superSourceBrain.outputSuperSourceName()).toEqual("12");
                expect(superSourceBrain.outputSearchPins()).toEqual("1254\n1125");

                superSourceBrain.inputHandsAPI("1254\n1125\nNONE");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("12");
                expect(superSourceBrain.outputSearchPins()).toEqual("1254\n1125");

                superSourceBrain.inputHandsAPI("NONE\n1254\n1125");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("2");
                expect(superSourceBrain.outputSearchPins()).toEqual("1254\n1125");

                superSourceBrain.inputHandsAPI("NONE\nNONE\n1254,1125");
                superSourceBrain.inputSuccessAPI(1);
    
                expect(superSourceBrain.outputSuperSourceName()).toEqual("NOSOURCE");
                expect(superSourceBrain.outputSearchPins()).toEqual("1254\n1125");
            });
        });
    })
});