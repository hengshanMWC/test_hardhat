// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Add {
    uint public number = 0;

    function add() public returns (uint) {
        return ++number;
    }
}