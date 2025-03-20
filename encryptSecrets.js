const { SecretsManager } = require("@chainlink/functions-toolkit");
const { providers, Wallet } = require("ethers");

const functionsRouterAddress = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
const donId = "fun-ethereum-sepolia-1";

const RPC_URL = "";
const PRIVATE_KEY = ""
const GPT_API_KEY = ""
const GATEWAY_URLS = [
      "https://01.functions-gateway.testnet.chain.link/",
      "https://02.functions-gateway.testnet.chain.link/",
    ]
const provider = new providers.JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY || "UNSET");
const signer = wallet.connect(provider);

const encryptAndUploadSecrets = async () => {
  const secretsManager = new SecretsManager({
    signer,
    functionsRouterAddress,
    donId,
  });

  await secretsManager.initialize().then((console.log("secretsManager Initialized...!")));

  if (!GPT_API_KEY) {
    throw Error("GPT_API_KEY not found in .env.enc file");
  }

  const secrets = {
    apiKey: GPT_API_KEY,
  };

  const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);
  console.log("encryptedSecretObj initialized...")

  const gatewayUrls = GATEWAY_URLS;
  const slotId = 0;
  const minutesUntilExpiration = 75;


console.log("extracting version, success from secretManager.uploadEncrypterSecretsToDON....")
  const {
    version, // Secrets version number (corresponds to timestamp when encrypted secrets were uploaded to DON)
    success, // Boolean value indicating if encrypted secrets were successfully uploaded to all nodes connected to the gateway
  } = await secretsManager.uploadEncryptedSecretsToDON({
    encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
    gatewayUrls,
    slotId,
    minutesUntilExpiration,
  });
  console.log("success")

  if (success) {
    console.log("\nUploaded secrets to DON...");
    const encryptedSecretsReference =
      secretsManager.buildDONHostedEncryptedSecretsReference({
        slotId,
        version,
      });

    console.log(
      `\nMake a note of the encryptedSecretsReference: ${encryptedSecretsReference} `
    );
  }
};

encryptAndUploadSecrets().catch((err) => {
  console.log("Error encrypting and uploading secrets:  ", err);
});
