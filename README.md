<p align="center">
  <img src="https://github.com/user-attachments/assets/1a1a51f8-457b-4833-bb83-ac24dac7c152" width="20%">
  <img src="https://github.com/user-attachments/assets/ab233b7c-6231-4a23-bf3f-609c56715e30" width="20%">
</p>

# Testing scripts for Chainlink Functions Toolkit on Remix
These scripts import [@chainlink/function-toolkit](https://www.npmjs.com/package/@chainlink/functions-toolkit) using ```require``` functions in Remix to perform the expected functionality of:
* Create Subscription
* Fund Subscription
* Add Consumer to Subscription
* Make Functions API Request
* Read Response from Functions Consumer Contract
* Customize Transaction

### Known Bugs
Currently, DON hosted secrets cannot be uploaded using Remix. I suspect this is due to network limitation Remix imposes on scripts that are trying to create networks requests. 

# Getting Started
You'll need: 
* PRIVATE_KEY
* RPC_URL
* [FunctionsRouterAddress, DON-id & gateway urls](https://docs.chain.link/chainlink-functions/supported-networks)
* [LinkTokenAddress](https://docs.chain.link/resources/link-token-contracts)
* GPT_API_KEY (If you want to test encrypted secrets, otherwise you can change the source code in ```sendRequest.js``` to call a simpler API point)
* [LINK and Native network Tokens](https://faucets.chain.link/)

  For this test, I used Sepolia network.

  ## Steps

1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Select the Gear icon at the top to open Remix's Script Configuration and check **Chainlink** <p align="center">
  <img src="https://github.com/user-attachments/assets/0beb7832-03a3-44ed-b55c-2e184a4f8075" width="45%">
  <img src="https://github.com/user-attachments/assets/a2dad73a-b044-400f-b543-fea5b66a8558" width="45%">
</p>

3. Create Contracts and Scripts folder
4. Inside Contracts, create a ```FunctionsConsumers.sol``` contract, the same found in [functionsConsumer.sol](https://github.com/RobItu/Remix-Functions-Test-Scripts/blob/main/functionsConsumer.sol)
5. Inside Scripts folder, create and copy all scripts found this repo.
6. Make sure to fill out all required variables (```PRIVATE KEY```, ```RPC_URL```, ```GPT_API_KEY```)
7. You can run each script by right clicking on it and hitting "run" or click on the green arrow button.

