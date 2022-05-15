pragma solidity >=0.4.22 <0.8.0;

contract Election {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount;

    mapping(address => bool) public votes;

    event voted(uint256 indexed candidateId);

    constructor() public {
        addCandidate("Gotabaya");
        addCandidate("Sajith");
    }

    function addCandidate(string memory name) private {
        candidateCount += 1;
        candidates[candidateCount] = Candidate(candidateCount, name, 0);
    }

    function vote(uint256 candidateId) public {
        require(candidateId <= candidateCount, "Candidate ID should be valid");
        require(
            votes[msg.sender] == false,
            "Votes shouldn't have voted already"
        );
        votes[msg.sender] = true;
        candidates[candidateId].voteCount += 1;
        emit voted(candidateId);
    }
}
