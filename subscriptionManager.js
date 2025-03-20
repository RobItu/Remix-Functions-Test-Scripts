//This script creates, funds and adds a consumer to Chainlink Function Subscription

const { SubscriptionManager } = require("@chainlink/functions-toolkit");
const { providers, Wallet, utils } = require("ethers");

const RPC_URL = "";
const PRIVATE_KEY = "";

//linkTokenAddress can be obtained at https://docs.chain.link/resources/link-token-contracts and functionsRouterAddress at https://docs.chain.link/chainlink-functions/supported-networks
//You must have a functionsConsumer contract deployed and its address known. 
const functionsRouterAddress = "";
const linkTokenAddress = "";
const consumerAddress = "";
const LINK_AMOUNT = "3.3";

//Creating Wallet
if (!RPC_URL) {
  throw new Error("Please set the RPC_URL environment variable");
}
const provider = new providers.JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY || "UNSET");
const signer = wallet.connect(provider);

//Function to create,fund and add a consumer to a subscription

const createAndFundSub = async () => {
  const subscriptionManager = new SubscriptionManager({
    signer,
    linkTokenAddress,
    functionsRouterAddress,
  });

  await subscriptionManager.initialize();

  // Create Subscription
  const subscriptionId = await subscriptionManager.createSubscription();
  console.log(`\n Subscription ${subscriptionId} created.`);

  // add consumer to subscription
  const receipt = await subscriptionManager.addConsumer({
    subscriptionId,
    consumerAddress,
  });

  console.log(
    `\n Subscription ${subscriptionId} now has ${consumerAddress} as a consumer.)`
  );

  // Fund Subscription
  const juelsAmount = utils.parseUnits(LINK_AMOUNT, 18).toString();
  subscriptionManager.fundSubscription({
    subscriptionId,
    juelsAmount,
  });

  console.log(
    `\n Subscription ${subscriptionId} funded with ${LINK_AMOUNT} LINK.`
  );
};

createAndFundSub().catch((err) => {
  console.log("Error creating/funding Subscription ", err);
});
