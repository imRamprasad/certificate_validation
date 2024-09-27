const Certification = artifacts.require("Certification");

contract("Certification", (accounts) => {
    let cert;

    beforeEach(async () => {
        cert = await Certification.new();
    });

    it("should generate a certificate", async () => {
        await cert.generateCertificate("cert1", "uid1", "Alice", "Blockchain 101", "ABC University", "Qm...");
        const result = await cert.getCertificate("cert1");
        assert.equal(result[1], "Alice", "Candidate name should be Alice");
    });

    it("should verify an existing certificate", async () => {
        await cert.generateCertificate("cert2", "uid2", "Bob", "Smart Contracts", "XYZ Institute", "Qm...");
        const verified = await cert.isVerified("cert2");
        assert.isTrue(verified, "Certificate should be verified");
    });
});
