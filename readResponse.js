const { decodeResult, ReturnType } = require("@chainlink/functions-toolkit");
const { Contract, Wallet, providers  } = require("ethers");

const RPC_URL = "";
const PRIVATE_KEY = ""
const abi= [functionsConsumer ABI here...]
const consumerAddress = "";



//Create Wallet
if (!RPC_URL) {
  throw new Error("Please set the RPC_URL environment variable");
}
const provider = new providers.JsonRpcProvider(RPC_URL);
const wallet = new Wallet( PRIVATE_KEY ||"UNSET");
const signer = wallet.connect(provider);

const readResponse = async () => {
  const functionsConsumer = new Contract(consumerAddress, abi, signer);

  const responseBytes = await functionsConsumer.s_lastResponse();
  console.log("\nResponse Bytes : ", responseBytes);

  const decodedResponse = decodeResult(responseBytes, ReturnType.string);

  console.log("\nDecoded response from OpenAI/ChatGPT:", decodedResponse);

    const errorResponseBytes = await functionsConsumer.s_lastError();
  console.log("\nError Response Bytes : ", errorResponseBytes);

  const decodedErrorResponse = decodeResult(errorResponseBytes, ReturnType.string);

  console.log("\nDecoded Error response from OpenAI/ChatGPT:", decodedErrorResponse);
};

readResponse().catch((err) => {
  console.log("Error reading response: ", err);
});
