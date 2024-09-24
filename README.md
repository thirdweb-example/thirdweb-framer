# How to Use Custom Components in Framer

1. Make sure you have the necessary Thirdweb packages installed. You'll need to add thirdweb to your project's dependencies: e.g. `thirdweb": "^5.58.5` (or latest)

2. Save the component in a file in your Framer project's `code` folder. The component will appear in your components panel in Framer.

3. To use the component in your canvas, drag it onto the canvas and drop it.

4. Use the properties panel to configure the component's properties (e.g. for `CustomConnectClaim721.tsx`, you'll need to set the following properties):

- clientId => Your Thirdweb client ID
- chainId => The chain ID you want to connect to
- contractAddress => The address of the ERC721 contract you want to claim from
- enableAccountAbstraction



