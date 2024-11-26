const contractAddress = "0xYourContractAddressHere"; // Replace with the deployed contract address
const contractABI = [ /* Replace with ABI */ ];

const web3 = new Web3(window.ethereum);

let wltContract;

async function init() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0];

    wltContract = new web3.eth.Contract(contractABI, contractAddress);

    document.getElementById('checkBalance').onclick = async () => {
        const balance = await wltContract.methods.balanceOf(userAccount).call();
        alert(`Your balance is: ${web3.utils.fromWei(balance, 'ether')} WLT`);
    };

    document.getElementById('sendTokens').onclick = async () => {
        const recipient = document.getElementById('recipientAddress').value;
        const amount = web3.utils.toWei(document.getElementById('amount').value, 'ether');

        await wltContract.methods.transfer(recipient, amount).send({ from: userAccount });
        alert('Tokens sent successfully!');
    };
}

window.onload = init;
