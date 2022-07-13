export class IPv6 {
    constructor(ipv6Input){
        this.ipv6Input = ipv6Input; // User ipv6 input.
        this.prefixLength = ""
        this.ipv6InputNoPL = "" // Will be use by abbreviated method.
    }

    checkFormat () {
        /*
        Return value: Boolean.

        This method will check user ipv6 input. The checking is broken into parts.
        Each checking must be met in order to proceed otherwise will return false.
        Returns True if user input passes all checkings.
        A quartet means a group of four hex digits.
        */

        const ipv6Char = [':', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']; //Characters used in ipv6.        
        let colonCount = 0; // To be use in part three, four and six checking.
        let doubleColonCount = 0; // To be use in part four checking.
        let nonZerosQuartetCount = 0; // To be use in part six checking.   
        let ipv6InputNoPL = this.ipv6Input; // In here it is expected that the prefix length is not included. Used in all parts of checking. PL means Prefix Length. 

        // Pre check. Cause I added this last lol.        
        // If the prefix length is included it will be taken out and set the remaining string to ipv6InputNoPL to be tested.
        // Then set this.prefixLength.
        // Then proceed to the next checking.
        if (this.ipv6Input.includes("/")) {
            const prefixLengthIndex = this.ipv6Input.indexOf("/");
            this.prefixLength = this.ipv6Input.slice(prefixLengthIndex); // Define this.prefixLength.
            this.ipv6InputNoPL = this.ipv6Input.slice(0, prefixLengthIndex); // Re-initialized 
            ipv6InputNoPL = this.ipv6Input.slice(0, prefixLengthIndex); // PL means Prefix Length.
            let prefixNumber = 0;
                    
            // Get the number part of the prefix length and test it.
            // Make sure that there's only numbers after the / in the user input.
            // parseInt will return Nan if it's try to parse non number.
            // !isNan means if it's not Nan or it is a number.
            if (!isNaN(parseInt(this.prefixLength.slice(1))) === true) {
                prefixNumber = parseInt(this.prefixLength.slice(1));    
            } else {
                // otherwise it's invalid.
                return false;
            }
            // Check if the prefix length number is in the range 1-128.
            if (prefixNumber < 1 || prefixNumber > 128) { 
                return false;                              
            }            
        }
        else {
            this.ipv6InputNoPL = this.ipv6Input // re-initialized
        }

        // Part zero.
        // User input cannnot be empty(undefined).
        if (ipv6InputNoPL.length === 0) {
            console.log("Part zero: User input cannot be empty");
            return false;
        }

        // Part one.
        // Check if each user input character is valid.
        for (let char of ipv6InputNoPL) {
            if (ipv6Char.includes(char) === false) {
                console.log("Part one: Inputted invalid charater!")
                return false;
            }            
        }

        // Part two. 
        // A single colon cannot be at the beginning nor at the end of an ipv6 address.
        if (ipv6InputNoPL[0] === ":" || (ipv6InputNoPL[ipv6InputNoPL.length - 1] === ":" && ipv6InputNoPL.slice(-2) !== "::")) { 
            console.log("Part two: A single colon cannot be at the beginning nor at the end.");
            return false;
        }

        // Part three.
        // There should only be two colons(::) that are consecutive exist in an ipv6 address.
        // You can't have like this ::: or more in an ipv6 address.
        for (let char of ipv6InputNoPL) {
            if (char === ":") {
                colonCount++;
                if (colonCount > 2) {
                    console.log("Part three: There should only be two consecutive colons.");
                    return false;
                }            
            } else {
                colonCount = 0;
            }
        }

        // Part four.
        // There should only be one double colon.
        for (let char of ipv6InputNoPL) {
            if (char === ":") {
                colonCount++;
                if (colonCount === 2) {
                    doubleColonCount++;
                    if (doubleColonCount >= 2) {
                        console.log("Part four: There should only be one double colon.");
                        return false;
                    }
                }
            } else {
                colonCount = 0;
            }
        }

        // Part five.
        // A valid ipv6 address should only have a max of four hex digits in each group.
        for (let quartet of ipv6InputNoPL.split(":")) {
            if (quartet.length > 4) {
                console.log("Part five: Each quartet should only have a max of four hex digits");
                return false;
            }
        }

        // Part six.
        // If double colon doesn't exist then a valid ipv6 address has an eight groups of quartet and should only have a max of 7 colons.
        if (!ipv6InputNoPL.includes("::")) {            
            for (let char of ipv6InputNoPL) {
                if (char === ":") {
                    colonCount++;
                }
            }
            if (colonCount !== 7) {
                console.log("Part six: Invalid Format!");
                return false;
            }
        }
        /*
        Double colon can only be used if there's two or more consecutive of quartets of all zeros.            
        i.e. xxxx:xxxx::xxxx:xxxx:xxxx:xxxx:xxxx. Group of x can't be more than six because :: means 
        two or more consecutive of quartets of all zeros. i.e. 0000:0000.
        */
        else if (ipv6InputNoPL.includes("::")) {
            for (let quartet of ipv6InputNoPL.split(":")) {
                if (quartet.length !== 0) {
                    nonZerosQuartetCount++;
                }
            }
            if (nonZerosQuartetCount > 6) {
                console.log("Part six: :: can only be used if there's two or more consecutive of quartets of all zeros");
                return false;
            }
        }
        // Finally return true if it passed all checkings.
        return true;        
    }


    abbreviated (isAbbreviated=true) {
        // This function returns the abbreviated(default) version of ipv6
        // if isAbbreviated is false then it will return the Unabbreviated version.
        // This function will also complete the abbreviated input of the user.
        // A quartet means a group of four hex digits.
        
        const ipv6Unbrv = [] // Unabbreviated ipv6 in an array.
        let ipv6Abrv = []  // Abbreviated ipv6 in an array.
        let zerosToAdd = 0; // To be use in part two checking.
        let isAdding = true; // To be use in part two checking.
        let quartetToAdd = 0; // To be use in part two checking.

        // Part one.
        // Check first if ipv6 is a valid format.
        if (this.checkFormat() === false) {
            return; // Exit immediately and will not proceed further.
        }
        
        // Part two.
        // This if/elseif/else part is to complete user input if it's abbreviated.
        // first thing if double colon exists(abbreviated) at the end.
        if (this.ipv6InputNoPL.slice(-2) === "::") {
            for (let quartet of this.ipv6InputNoPL.split(":")) {
                // Split with two consecutive colons would result to empty string.
                // So we skip it.
                if (quartet.length === 0) {
                    break;
                }
                // Complete each quartet by preceeding 0.
                else if (quartet.length !== 4) {
                    zerosToAdd = 4 - quartet.length;
                    ipv6Unbrv.push("0".repeat(zerosToAdd) + quartet);
                    ipv6Abrv.push(quartet) // Add the quartet(abbreviated) for abbreviated version.
                    continue;
                }

                ipv6Unbrv.push(quartet); // Just add the quartet.
                ipv6Abrv.push(quartet); // Just add the quartet because the user input might have a mix abbrv and unbrrv.
            }

            // Then add zeros of four until there are eight sets of quartets to complete the address.
            // Will complete both abbreviate and Unabbreviated.
            while (isAdding) {                
                if (ipv6Unbrv.length !== 8) { // We could use the ipv6Abrrv.
                    ipv6Unbrv.push("0000");
                    ipv6Abrv.push("0"); 
                } 
                // Exit out of while loop if there's an 8 sets already.
                else {
                    break;
                }
            }
        }
        // if double colon exists somewhere not at the end. 
        else if (this.ipv6InputNoPL.includes("::") ) {
            for (let quartet of this.ipv6InputNoPL.split(":")) {
                // Find the index of the empty string where we'll insert quartet of zeros.
                if (quartet.length === 0) {
                    quartetToAdd = 9 - this.ipv6InputNoPL.split(":").length; // Subtracted from 9 not 8 because empty string is included.
                    // insert "0000" until we get an 8 segments.
                    while (quartetToAdd !== 0) {
                        ipv6Unbrv.push("0000");
                        quartetToAdd--; // decrement by one as we add quartet of zeros.
                        ipv6Abrv.push("0"); // Add 0 for the unabrreviated array.
                    }
                    continue;                   
                }
                // Complete each quartet by preceeding 0.
                else if (quartet.length !== 4) {
                    zerosToAdd = 4 - quartet.length;
                    ipv6Unbrv.push("0".repeat(zerosToAdd) + quartet);
                    ipv6Abrv.push(quartet) // Add the quartet(abbreviated) for abbreviated version.
                    continue;
                }

                ipv6Unbrv.push(quartet); // Just add the quartet.
                ipv6Abrv.push(quartet); // Just add the quartet for abbreviated because the user input might have a mix abbrv and unbrrv.
                
            }
        } 
        // if the user input is a compelete address just return it. i.e xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx
        else {
            return this.ipv6InputNoPL.split(":") // will return an array.
        }

        // console.log("Before finishing touches", ipv6Abrv) // Ignore this.

        // Part three.
        // This part is to abbreviate the ipv6 address because the user might have inputted something like: 100:03::.
        // The 03 part in the input address will bypass the if/else block. 
        ipv6Abrv = ipv6Abrv.map(elem => {   // map method will return new array to be stored to ipv6Abrv array.
            let newQuartet = "";    // New quartet to add to the ipv6Abrv array.
            for (let char of elem) {
                // Omit leading 0s if the quartet is not a single 0. i.e. 0:0:0:0:0:0:0:0.
                if (char === "0" && elem.length !== 1) { 
                    continue;   // Will not add to the newQuartet.
                }
                // This part will not omit trailing zeros.
                else if (char !== "0") {
                    const indexOfNonZeroChar = elem.indexOf(char);
                    newQuartet = elem.slice(indexOfNonZeroChar); // will slice from non-zero char up to last elem.
                    break;  // Break the loop;
                }
                newQuartet += char; // Will add if the quartet is a single 0.
            }
            return newQuartet; // Return by the callback arrow function.
        })

        // console.log("After finishing touches.", ipv6Abrv); // Ignore this.

        // Part four.
        // Check if to return Unabbreviated version.
        // If isAbbreviated is false return Unabbreviated array. 
        if (!isAbbreviated) {
            return ipv6Unbrv;
        }

        // Finally return the Abbreviated version.
        return ipv6Abrv; // Default
    }


    getPrefixValue (isAbbreviated=true) {
        // This function will return the the abbreviated prefix value by default.
        // If the argument is false then it will return the unabbreviated version.
        // This function relies on the output of the abbreviated function.


        let prefixValueArray = [];
        let prefixValueString = "";
        let columnToAdd = 3; // Use in part two.
        

        // Part one.
        // Check if the ipv6 is valid.
        if (this.checkFormat() !== true) {
            return  // Exit immediately.
        }

        // Part two
        // Construct the prefix value in colon notation.
        // In eui-64 the prefix value is always the first half of an ipv6.
        prefixValueArray = this.abbreviated(isAbbreviated).slice(0, 4) // abbreviated functions returns an array.
        for (let segment of prefixValueArray) { // Segment means a group of four hex digits.
            prefixValueString += segment;
            if (columnToAdd !== 0) {
                prefixValueString += ":";   // Seperate each segment with a colon.
                columnToAdd--;
            }
            
        }  
                              
        // Finally return the prefix value string version.
        return prefixValueString.toUpperCase();

    }
}
