const { Contract, Wallet, providers, ethers  } = require("ethers");
const { Location } = require("@chainlink/functions-toolkit");

//ABI of functionsConsumer contract. 
const abi= [		{
			"inputs": [
				{
					"internalType": "address",
					"name": "router",
					"type": "address"
				},
				{
					"internalType": "bytes32",
					"name": "_donId",
					"type": "bytes32"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [],
			"name": "EmptyArgs",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "EmptySource",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "NoInlineSecrets",
			"type": "error"
		},
		{
			"inputs": [],
			"name": "OnlyRouterCanFulfill",
			"type": "error"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				}
			],
			"name": "OwnershipTransferRequested",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "id",
					"type": "bytes32"
				}
			],
			"name": "RequestFulfilled",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "id",
					"type": "bytes32"
				}
			],
			"name": "RequestSent",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "acceptOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "donId",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "requestId",
					"type": "bytes32"
				},
				{
					"internalType": "bytes",
					"name": "response",
					"type": "bytes"
				},
				{
					"internalType": "bytes",
					"name": "err",
					"type": "bytes"
				}
			],
			"name": "handleOracleFulfillment",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "s_lastError",
			"outputs": [
				{
					"internalType": "bytes",
					"name": "",
					"type": "bytes"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "s_lastRequestId",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "s_lastResponse",
			"outputs": [
				{
					"internalType": "bytes",
					"name": "",
					"type": "bytes"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "source",
					"type": "string"
				},
				{
					"internalType": "enum FunctionsRequest.Location",
					"name": "secretsLocation",
					"type": "uint8"
				},
				{
					"internalType": "bytes",
					"name": "encryptedSecretsReference",
					"type": "bytes"
				},
				{
					"internalType": "string[]",
					"name": "args",
					"type": "string[]"
				},
				{
					"internalType": "bytes[]",
					"name": "bytesArgs",
					"type": "bytes[]"
				},
				{
					"internalType": "uint64",
					"name": "subscriptionId",
					"type": "uint64"
				},
				{
					"internalType": "uint32",
					"name": "callbackGasLimit",
					"type": "uint32"
				}
			],
			"name": "sendRequest",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "newDonId",
					"type": "bytes32"
				}
			],
			"name": "setDonId",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]

const RPC_URL = "";
const PRIVATE_KEY = ""

//SubscriptionId obtained from subscriptionManager.js
//encryptedSecretsRef obtained from encryptSecrets.js
const consumerAddress = "";
const subscriptionId = "";
const encryptedSecretsRef = "";

//Create Wallet
const provider = new providers.JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY || "UNSET");
const signer = wallet.connect(provider);

//Customize gas options (optional)
const gasOptions = {
  gasLimit: ethers.utils.hexlify(300000), // Reduce gas limit
};


//Send functions request to DON
const sendRequest = async () => {
  if (!consumerAddress || !encryptedSecretsRef || !subscriptionId) {
    throw Error("Missing required environment variables.");
  }
  const functionsConsumer = new Contract(consumerAddress, abi, signer);

//Custom JS code
  const source = `
const gptPrompt = args[0];

const postData = {
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: gptPrompt }],
  temperature: 0,
};

const openAIResponse = await Functions.makeHttpRequest({
  url: "https://api.openai.com/v1/chat/completions",
  method: "POST",
  headers: {
    Authorization: \`Bearer \${secrets.apiKey}\`,
    "Content-Type": "application/json",
  },
  data: postData,
});

if (openAIResponse.error) {
  throw new Error(JSON.stringify(openAIResponse));
}

const result = openAIResponse.data.choices[0].message.content;

console.log(result);
return Functions.encodeString(result);
`;


  const prompt = "Describe what a blockchain is in 15 words or less";
  const args = [prompt];
  const callbackGasLimit = 300_000;

  const requestTx = await functionsConsumer.sendRequest(
    source,
    Location.DONHosted,
    encryptedSecretsRef,
    args,
    [], // bytesArgs can be empty
    subscriptionId,
    callbackGasLimit,
    gasOptions
  );

  const txReceipt = await requestTx.wait(1);
  const requestId = txReceipt.events[2].args.id;
  console.log(
    `\nRequest made.  Request Id is ${requestId}. TxHash is ${requestTx.hash}`
  );
};

sendRequest().catch((err) => {
  console.log("\nError making the Functions Request : ", err);
});
