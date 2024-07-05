// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WillYouRather {
    struct Question {
        uint256 optionAVotes;
        uint256 optionBVotes;
    }

    mapping(uint8 => Question) public questions;
    mapping(address => mapping(uint8 => bool)) public hasVoted;

    function vote(uint8 questionId, uint8 option) public {
        require(!hasVoted[msg.sender][questionId], "You have already voted on this question.");
        require(option < 2, "Invalid option.");

        if (option == 0) {
            questions[questionId].optionAVotes++;
        } else {
            questions[questionId].optionBVotes++;
        }

        hasVoted[msg.sender][questionId] = true;
    }

    function getVotes(uint8 questionId, uint8 option) public view returns (uint256) {
        require(option < 2, "Invalid option.");

        if (option == 0) {
            return questions[questionId].optionAVotes;
        } else {
            return questions[questionId].optionBVotes;
        }
    }
}
