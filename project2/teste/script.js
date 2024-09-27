document.getElementById('checkForm').onsubmit = async (e) => {
    e.preventDefault();
    const checkId = document.getElementById('checkCertificateId').value;

    try {
        const isVerified = await certContract.methods.isVerified(checkId).call();
        document.getElementById('checkResult').innerText = isVerified ? "Certificate is verified!" : "Certificate not found.";
    } catch (error) {
        document.getElementById('checkResult').innerText = "Error checking verification: " + error.message;
    }
};
