var Election = artifacts.require("../contracts/Election.sol");

contract("Election", function (accounts) {
  it("check candidate count is 2", function () {
    return Election.deployed()
      .then(function (instance) {
        return instance.candidateCount();
      })
      .then(function (count) {
        assert.equal(count, 2, "contract init with 2 candidates");
      });
  });

  it("check init vote count for each candidate", function () {
    return Election.deployed()
      .then(function (instance) {
        electionInstance = instance;
        return electionInstance.candidates(1);
      })
      .then(function (candidate) {
        // console.log("candidate", candidate);
        assert.equal(candidate[0], 1, "check id");
        assert.equal(candidate[1], "Gotabaya", "check name");
        assert.equal(candidate[2], 0, "check vote count");
        return electionInstance.candidates(2);
      })
      .then(function (candidate) {
        // console.log("candidate", candidate);
        assert.equal(candidate[0], 2, "check id");
        assert.equal(candidate[1], "Sajith", "check name");
        assert.equal(candidate[2], 0, "check vote count");
      });
  });

  it("candidate ID should be smaller or equal to the candidate count ", function () {
    const votingAddress = "0x3d6F0464CD9d0e9bbce97015AFda30c537055E8a";
    return Election.deployed()
      .then(function (instance) {
        return instance.vote(3, {from : votingAddress});
      })
      .then(assert.fail)
      .catch(function (error) {
        // console.log(error);
        assert(
          error.message.indexOf("revert") >= 0,
          "error should contain revert"
        );
      });
  });
});
