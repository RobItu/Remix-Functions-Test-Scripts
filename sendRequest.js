const { Contract, Wallet, providers, ethers  } = require("ethers");
const { Location } = require("@chainlink/functions-toolkit");

//ABI of functionsConsumer contract. 
const abi= ["functionsConsumer contract ABI here..."]

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
