// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';

contract TestToken20 is ERC20, Ownable {
    uint public mintAmount = 5000000 * 1 ether;
    uint public mintStartTime;
    uint public constant MINT_DURATION = 4 hours;

    mapping(address => bool) private hasMinted;
    // \uD83D\uDC36 🐼
    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) Ownable(msg.sender) {
        mintStartTime = block.timestamp;
    }
    function mint() external {
        require(block.timestamp < mintStartTime + MINT_DURATION, "Minting period has ended");
        require(!hasMinted[msg.sender], "Address has already minted");
        require(msg.sender == tx.origin, "Contracts are not allowed to mint");
        hasMinted[msg.sender] = true;
        _mint(msg.sender, mintAmount);
    }
}