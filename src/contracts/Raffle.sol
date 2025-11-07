// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Raffle {
    address public owner;
    uint256 public maxParticipants;
    address[] public participants;
    bool public isActive;
    bool public isDrawn;
    address public winner;

    event RaffleCreated(address owner, uint256 maxParticipants);
    event ParticipantEntered(address participant);
    event RaffleDrawn(address winner);
    event RaffleCancelled();

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    constructor(uint256 _maxParticipants) {
        owner = msg.sender;
        maxParticipants = _maxParticipants;
        isActive = true;
        emit RaffleCreated(owner, maxParticipants);
    }

    function enter() external payable {
        require(isActive, "The raffle is not active.");
        require(participants.length < maxParticipants, "The raffle is full.");
        participants.push(msg.sender);
        emit ParticipantEntered(msg.sender);
    }

    function drawWinner() external onlyOwner {
        require(isActive, "The raffle is not active.");
        require(!isDrawn, "The winner has already been drawn.");
        require(participants.length > 0, "There are no participants in the raffle.");

        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % participants.length;
        winner = participants[randomIndex];
        isDrawn = true;
        isActive = false;

        emit RaffleDrawn(winner);
    }

    function cancelRaffle() external onlyOwner {
        require(isActive, "The raffle is not active.");
        isActive = false;
        emit RaffleCancelled();
    }

    function getParticipants() external view returns (address[] memory) {
        return participants;
    }
}
