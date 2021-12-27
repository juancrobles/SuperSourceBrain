
/**
 * Define the UserActor container 
 */
function SuperSourceBrain() {}

/**
 * Define all internal constants
 */
 SuperSourceBrain.prototype.table = [
    ["1234", "234", "34", "4"],
    ["2341", "341", "41", "1"],
    ["3412", "412", "12", "2"],
    ["4123", "123", "23", "3"]
];

/**
 * Define all internal variables to a known value
 */
SuperSourceBrain.prototype.len = 100;
SuperSourceBrain.prototype.ba = "";
SuperSourceBrain.prototype.baString = "";
SuperSourceBrain.prototype.last_in = "";
SuperSourceBrain.prototype.current_coordinate = [0,0];
SuperSourceBrain.prototype.superSourceName = "NOSOURCE";

SuperSourceBrain.prototype.doProcess = false;
SuperSourceBrain.prototype.doReset = false;

/**
 * Define the input BAString
 * @param {*} ba_string 
 */
SuperSourceBrain.prototype.inputBAString = function(ba_string) {
    this.baString = ba_string;
    this.ba = this.baString.match(/[^\r\n]+/g); // this split each line by return
};

/**
 * Define the input Process
 */
SuperSourceBrain.prototype.inputProcess = function() {
/* ORIGINAL CODE
        if (ba.length < 5) {
            if (len < ba.length) {
                //diag left
                current_coordinate[0] -= 1;
                current_coordinate[1] += 1;
            }
            else if (len == ba.length) {
                //down
                current_coordinate[1] += 1;
                
            }
            else {
                //right
                current_coordinate[0] += 1;
            }

            //do cleanup
            if (current_coordinate[0] >= 4) {
                current_coordinate[0] = current_coordinate[0] - 4;
                //not really possible
            }
            if (current_coordinate[1] >= 4) {
                current_coordinate[1] = current_coordinate[1] - 4;
                //print("loop");
                //print("\n");
            }
            len = ba.length; //consider moving into a conditional
        }
        else{
        	current_coordinate[1] += 1;
        	
        	if(ba.length == 5){
        		len = 4;
        		//current_coordinate[1] += 1;
        	}
        }
        
        last_in = arguments[0];
*/

    // setting doProcess
    this.doProcess = true;

    if (this.ba.length < 5) {
        if (this.len < this.ba.length) {
            //diag left
            this.current_coordinate[0] -= 1;
            this.current_coordinate[1] += 1;
        }
        else if (this.len == this.ba.length) {
            //down
            this.current_coordinate[1] += 1;
            
        }
        else {
            //right
            this.current_coordinate[0] += 1;
        }

        //do cleanup
        if (this.current_coordinate[0] >= 4) {
            this.current_coordinate[0] = this.current_coordinate[0] - 4;
            //not really possible
        }
        if (this.current_coordinate[1] >= 4) {
            this.current_coordinate[1] = this.current_coordinate[1] - 4;
            //print("loop");
            //print("\n");
        }
        this.len = this.ba.length; //consider moving into a conditional
    }
    else{
        this.current_coordinate[1] += 1;
        
        if(this.ba.length == 5){
            this.len = 4;
            //current_coordinate[1] += 1;
        }
    }

    this.last_in = this.baString;
}

/**
 * Define the input Reset
 */
SuperSourceBrain.prototype.inputReset = function() {
/* ORIGINAL CODE
    	if (ba.length < 5) {
    		current_coordinate = [Math.abs(ba.length-4), 0];
       		len = 100;
    	}
    	else{
    		current_coordinate = [0, 0];
    		len = 100;
    	}
    	
    	last_in = arguments[0];
*/
    // setting doReset
    this.doReset = true;

    if (this.ba.length < 5) {
        this.current_coordinate = [Math.abs(this.ba.length-4), 0];
        this.len = 100;
    }
    else{
        this.current_coordinate = [0, 0];
        this.len = 100;
    }
    
    this.last_in = this.baString;
}

/**
 * Define the output SuperSourceName
 * @returns the active super source name
 */
SuperSourceBrain.prototype.outputSuperSourceName = function() {
/* ORIGINAL CODE
    // added by JCR 24-12-2021
	// this check with the last input
    // test if we are not doing process
    // if is first call to the actor afther a reset
    // if last input is different from the new
	if(doProcess!= 1 && last_in != "" && last_in !== arguments[0]) {
		if(last_in.length > arguments[0].length) {
			// new input is shorter than last_in
			// probably here is where need to adjust the coordinate or trigger the reset
			// test with reset
			doReset = 1;
		}
		else {
			// new input is larger than last_in
		}
	} else {
		// new input is equal to last_in
	}
*/
    // added by JCR 24-12-2021
	// this check with the last input
    // test if we are not doing process
    // if is first call to the actor afther a reset
    // if last input is different from the new
	if(this.doProcess!= 1 && this.last_in != "" && this.last_in !== arguments[0]) {
		if(this.last_in.length > this.baString.length) {
			// new input is shorter than last_in
			// probably here is where need to adjust the coordinate or trigger the reset
			// test with reset
			//this.doReset = true;
            this.inputReset();
		}
		else {
			// new input is larger than last_in
		}
	} else {
		// new input is equal to last_in
	}


/* ORIGINAL CODE
    len = ba.length; //consider moving into a conditional
    if(len==5){
    	len=4;
    }
    //var result = table[current_coordinate[0]][current_coordinate[1]];
    var x = current_coordinate[0];
    var y = current_coordinate[1];
    var result = table[y][x];
*/

    this.len = this.ba.length; //consider moving into a conditional
    if(this.len==5){
        this.len=4;
    }
    //var result = table[current_coordinate[0]][current_coordinate[1]];
    var x = this.current_coordinate[0];
    var y = this.current_coordinate[1];
    this.superSourceName = this.table[y][x];

    // reset doProcess & reset Called
    this.doProcess = false;
    this.doReset = false;

    return this.superSourceName;
}


// this line is necesary for running the tests and 
// should not be copied to the isadora javascript actor
module.exports = SuperSourceBrain;