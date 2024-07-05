// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WillYouRather {
    mapping(address => bool) public hasVoted;
    uint256[2] public votes;

    function vote(uint8 option) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(option < 2, "Invalid option.");

        hasVoted[msg.sender] = true;
        votes[option]++;
    }

    function getVotes(uint8 option) public view returns (uint256) {
        require(option < 2, "Invalid option.");
        return votes[option];
    }
}
