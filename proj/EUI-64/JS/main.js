import { IPv6 } from "./ipv6.js";
import { MAC } from "./mac.js";
import { longRoundInput } from "./desgin.js";

const form = document.querySelector("form");
const ipv6Input = document.querySelector("#ipv6Input");
const macInput = document.querySelector("#macAddressInput");
const resultsHeading = document.querySelector('#resultsHeading');
const resultsContainer = document.querySelector('#resultsContainer');
const submitButton = document.querySelector('#submitButton');
const resetButton = document.querySelector('#resetButton');

const createElement = function (elem, textContent="", prefixText='') {
    const element = document.createElement(elem);
    element.innerHTML = prefixText + textContent;
    return element;
}

const errorMessage = (message) => {
    const errorElement = createElement("p", message, "Error: ");
    errorElement.style.fontSize = "bold"; 
    errorElement.style.color = "red";
    resultsContainer.append(errorElement);
    resultsHeading.style.color = "red";
}

const reset = () => {
    const ipv6Input = form.elements.ipv6;
    const macInput = form.elements.macAddress;    
    ipv6Input.value = '';
    macInput.value = ''
    resultsContainer.innerHTML = "";
    resultsHeading.style.color = "#E6E6E6";

    // Back to initial style.    
    ipv6Input.style.width = "50%";        

    // Back to initial style.    
    macInput.style.width = "50%";        
}



submitButton.addEventListener('click', e => {
    // console.log(e)
    // Pre reset. Remove any previous text and styles.
    resultsContainer.innerHTML = "";
    resultsHeading.style.color = "#E6E6E6";

    // Get Inputs values.
    const ipv6InputElemValue = form.elements.ipv6.value;
    const macInputElemValue = form.elements.macAddress.value;

    // Initialized Objects
    const userIpv6Input = new IPv6(ipv6InputElemValue);
    const userMacInput = new MAC(macInputElemValue);
    
    userIpv6Input.checkFormat();
    console.log("checkFormat", userIpv6Input.checkFormat());
    console.log(`Is ${userIpv6Input.checkFormat()} equal to false?`, userIpv6Input.checkFormat() === false);
    // Check inputs
    if (userIpv6Input.checkFormat() === false && userMacInput.checkMac() === false) {
        errorMessage("Enter a valid IPv6 address!");
        errorMessage("Enter a valid Mac address!");
    }    
    else if (userIpv6Input.checkFormat() === false) {        
        errorMessage("Enter a valid IPv6 address!");
    }
    else if (userMacInput.checkMac() === false) {
        errorMessage("Enter a valid Mac address!");
    }
    // If valid then proceed.
    else {
        const preFixValue = userIpv6Input.getPrefixValue();
        const interfaceID = userMacInput.eui_64();
        
        // Create Prefix Value text.
        const ipv6Para = createElement("p", "Prefix value: ");
        const ipv6Span = createElement("span", preFixValue);
        ipv6Span.style.letterSpacing = "2px";
        ipv6Para.append(ipv6Span);                
        resultsContainer.append(ipv6Para);
        // Add break line.
        resultsContainer.append(createElement("br"));
        // Create Interface ID text.
        const macPara = createElement("p", "Interface ID: ");
        const macSpan = createElement("span", interfaceID);
        macSpan.style.letterSpacing = "2px";
        macPara.append(macSpan);                
        resultsContainer.append(macPara);
        // Add break line.
        resultsContainer.append(createElement("br"));
        // Create New IPv6 Address text.
        const newIpv6Para = createElement("p", "New IPv6 Address: ");
        const newIpv6Span = createElement("span", `${preFixValue}:${interfaceID}`);
        newIpv6Span.style.letterSpacing = "2px";
        newIpv6Para.append(newIpv6Span);
        resultsContainer.append(newIpv6Para);
    }


    // console.log("Prefix Length: ", userIpv6Input.prefixLength)
})

resetButton.addEventListener("click", reset);

// If clicked the input elements will get the longRoundInput design.
ipv6Input.addEventListener("click", longRoundInput);
macInput.addEventListener("click", longRoundInput);