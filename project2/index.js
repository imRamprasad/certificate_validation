const contractAddress = "0x52C84043CD9c865236f11d9Fc9F56aa003c1f922"; // Replace with your contract address
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "certificate_id",
				"type": "string"
			}
		],
		"name": "certificateGenerated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_certificate_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_uid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_candidate_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_course_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_org_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfs_hash",
				"type": "string"
			}
		],
		"name": "generateCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "certificates",
		"outputs": [
			{
				"internalType": "string",
				"name": "uid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "candidate_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "course_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "org_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfs_hash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_certificate_id",
				"type": "string"
			}
		],
		"name": "getCertificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "_uid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_candidate_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_course_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_org_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfs_hash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_certificate_id",
				"type": "string"
			}
		],
		"name": "isVerified",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

window.onload = async () => {
    if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const certContract = new web3.eth.Contract(abi, contractAddress);

        document.getElementById('certificateForm').onsubmit = async (e) => {
            e.preventDefault();
            const accounts = await web3.eth.getAccounts();
            const certificateId = document.getElementById('certificateId').value;
            const uid = document.getElementById('uid').value;
            const candidateName = document.getElementById('candidateName').value;
            const courseName = document.getElementById('courseName').value;
            const orgName = document.getElementById('orgName').value;
            const ipfsHash = document.getElementById('ipfsHash').value;

            try {
                await certContract.methods.generateCertificate(certificateId, uid, candidateName, courseName, orgName, ipfsHash).send({ from: accounts[0] });
                document.getElementById('result').innerText = "Certificate generated successfully!";
            } catch (error) {
                document.getElementById('result').innerText = "Error generating certificate: " + error.message;
            }
        };
    } else {
        alert('Please install MetaMask!');
    }
};
