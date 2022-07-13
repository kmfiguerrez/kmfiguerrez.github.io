export class MAC {
    constructor (macInput) {
        this.macInput = macInput;
    }


    checkMac () {
        // This function will return the mac address in an array format if the user input is valid.
        // Otherwise will return false.
        // This function use Regular Expression to check user input.        
        // Mac address is a 12 hex digits.
        // \d means digit 0 to 9.
        // A-F means A to F.
        // {2} will match two character from the class [\dA-F].        
        // ^ at the beginning and $ at the end in the pattern means that the regex pattern must matched exactly.
        // ? matches the previous token between zero and one times.

        // Part one.
        // In this part will set acceptable mac address format.
        // Four types of mac address format.
        // Hyphen notation: B4-2E-99-F1-48-5A
        // longer pattern: /^[\dA-F]{2}-[\dA-F]{2}-[\dA-F]{2}-[\dA-F]{2}-[\dA-F]{2}-[\dA-F]{2}$/i
        const format1 = /^([\da-f]{2}-?){6}$/i; // i is a modifier means case-insensitive.
        // Colon notation: B4:2E:99:F1:48:5A
        // longer pattern: /^[\dA-F]{2}:[\dA-F]{2}:[\dA-F]{2}:[\dA-F]{2}:[\dA-F]{2}:[\dA-F]{2}$/i
        const format2 = /^([\da-f]{2}:?){6}$/i; // i is a modifier means case-insensitive.
        // Colon notation that usually use on networking devices like switches and router: B42E:99F1:485A
        // longer pattern: /^[\dA-F]{4}:[\dA-F]{4}:[\dA-F]{4}$/i
        const format3 = /^([\da-f]{4}:?){3}$/i; // i is a modifier means case-insensitive.
        // Just hex digits notation: B42E99F1485A
        const format4 = /^[\da-f]{12}$/i; // i is a modifier means case-insensitive.

        // const this.macInput = this.this.macInput; // To avoid using "this".
        const formats = [format1, format2, format3, format4]; // Will check user input against these formats.
        // const at_index = -1; 
        let selectedFormatIndex = -1; // Will be use to select matched format.
        let error = 0;    
        let macAddress = ""; // Will be use to store the mac address that the function will return.

        // Part two.
        // Will check the the user input if it meets any of the format.
        for (let format of formats) {
            selectedFormatIndex++;
            if (format.test(this.macInput) === false) {
                error++;
            } else {
                // If found break the loop immediately.
                break;
            }
        }
        // If error equals 4 then it means that the input mac address did not meet any of the format.
        if (error === 4) {
            console.log("Invalid Format!")
            return false;
        }        

        // Part three.
        // If matches.
        // If the selected format is any of the format1, format2, and format3, it will be parsed into format4 format which is a single string.    
        switch (selectedFormatIndex) {
            case 0:
                // Turned into a list of groups of two hex digit. Then join each group into a single string.
                macAddress = this.macInput.split('-').join("");
                break;
            case 1:
                // Turned into a list of groups of two hex digit. Then join each group into a single string.
                macAddress = this.macInput.split(':').join("");
                break;
            case 2:
                // Turned into a list of groups of two hex digit. Then join each group into a single string.
                macAddress = this.macInput.split(':').join("");
                break;                            
            default:
                // If format4 is used the just store it into mac variable.
                macAddress = this.macInput;
                break;
        }

        // Finally, return the mac address in an array of hex digits.
        // If the separator is "", the returned array will be an array of single characters
        return macAddress.split("");
        
    }


    eui_64 () {
        // This function will generate the interface ID(Host part) using the eui-64 method.
        // This function relies on the output of checkMac function.

        const sevenBitConversion = {'0':'2', '1':'3', '2':'0', '3':'1', '4':'6', '5':'7','6':'4', // This let us avoid working with binaries.
        '7':'5', '8':'A', '9':'B', 'A':'8', 'B':'9', 'C':'E', 'D':'F', 'E':'C', 'F':'D'} 
        let macAddress; // an array of hex digits.
        let interfaceID = ""; // Will be return by the function.
        let middleIndex; // Use in part two.
        let columnToAdd = 3; // Use in part four.
        let hexCount = 0; // Use in part four.     

        // Part one.
        // Check if user mac address input is valid.
        if (this.checkMac() === false) {            
            return false; // will not proceed;
        }
        // If valid then set it the output to macAddress.
        macAddress = this.checkMac(); // checkMac() returns an array of hex digits.

        // Part two.
        // Insert FFEE in the middle of the mac address.
        middleIndex = parseInt(macAddress.length / 2);
        macAddress.splice(middleIndex, 0, "F", "F", "E", "E"); // 0 means nothing will be deleted.

        // Part three.
        // To convert(flip) 7 bit in the first group of the interface ID. 
        for (let key in sevenBitConversion) {  // Iterate over the keys of the dict seven_bit_conversion.
            if (macAddress[1] === key) {       // The seven bit is located in the second hex digit: macAddress[1].
                macAddress[1] = sevenBitConversion[key];  // Change the second hex digit.
                break;
            }
        }

        // Part four.
        // Construct the interface ID. Add : every four hex digits.
        for (let char of macAddress) {
            if (hexCount === 4 && columnToAdd !== 0) {
                interfaceID += ":"
                columnToAdd--;
                hexCount = 0; // Reset every four count.
            }
            interfaceID += char;
            hexCount++;
        }

        // Finally return the interface ID.
        return interfaceID.toUpperCase();
    }
}
