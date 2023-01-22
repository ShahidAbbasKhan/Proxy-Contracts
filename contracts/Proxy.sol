// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract Proxy {
    uint x= 0;
    address implementation;
    function changeImplemention(address _implementation) external {
        implementation= _implementation;
    }
    function changeValue(uint _x) external {
        Logic1(implementation).changeValue(_x);
    }
    fallback() external {
        (bool success,) = implementation.call(msg.data);
        require(success);
    }
    
}
contract Logic1 {
    uint public x = 0;
    function changeValue(uint _x) external {
      x= _x;
    }
    
}

contract Logic2 {
    uint public x = 0;
    function changeValue(uint _x) external {
      x= _x ;
    }
    function  trippleX() external {
       x *= 3;
    }
    
}

