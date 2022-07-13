# EUI-64-in-JavaScript
EUI-64 (Extended Unique Identifier) is a method we can use to automatically configure IPv6 host addresses(Interface ID in IPv6). 
An IPv6 device will use the MAC address of its interface to generate a unique 64-bit interface ID.
Reference: https://networklessons.com 

## How to use this project.
### Running on localhost.
1. Download the project files.
2. Download VScode.
3. Download liveserver extension.
4. Then launch the index.html with liveserver. This is because I used modules to seperate classes and imported them to the main.js file.
   It will not work by just clicking the index.html file.

## How this program works.
1. Starts by prompting a user for IPv6 address. It can be abbreviated or a full IPv6 address w/o the prefix length.
2. Next prompts for Mac address of the Network Interface Card of a device.
3. Click submit.
4. Then the ouput gives you: 
   * Prefix Value.
   * Interface ID.
   * New Ipv6 Address

## License
The license rigth now for this project is the default license.
   



