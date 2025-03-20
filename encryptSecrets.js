//Currently await secretsManager.uploadEncryptedSecretsToDON is not working. 
const { SecretsManager } = require("@chainlink/functions-toolkit");
const { providers, Wallet } = require("ethers");

const functionsRouterAddress = ""; //CHANGE THIS
const donId = "fun-ethereum-sepolia-1"; //CHANGE THIS

const RPC_URL = ""; //CHANGE THIS
const PRIVATE_KEY = "" //CHANGE THIS
const GPT_API_KEY = "" //CHANGE THIS
const GATEWAY_URLS = ["",""] //CHANGE THIS

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
