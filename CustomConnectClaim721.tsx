import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { ConnectButton, ThirdwebProvider, ClaimButton, useActiveAccount } from "thirdweb/react"
import { createThirdwebClient } from "thirdweb"
import { defineChain } from "thirdweb/chains"

function ConnectAndClaimButtons(props) {
    const { enableAccountAbstraction, chainId, clientId, contractAddress, ...rest } = props
    const account = useActiveAccount()

    const client = React.useMemo(() => createThirdwebClient({ clientId }), [clientId])

    const connectButtonProps = {
        client: client,
        ...rest,
    }

    if (enableAccountAbstraction) {
        connectButtonProps.accountAbstraction = {
            chain: defineChain(chainId),
            gasless: true,
        }
    }

    return (
        <>
            <ConnectButton {...connectButtonProps} />
            {account && contractAddress && (
                <ClaimButton
                    client={client}
                    chain={defineChain(chainId)}
                    contractAddress={contractAddress as string}
                    claimParams={{
                        type: "ERC721",
                        quantity: BigInt(1),
                    }}
                >
                    Claim
                </ClaimButton>
            )}
        </>
    )
}

export function CustomConnectClaim721(props) {
    return (
        <ThirdwebProvider>
            <ConnectAndClaimButtons {...props} />
        </ThirdwebProvider>
    )
}

CustomConnectClaim721.defaultProps = {
    enableAccountAbstraction: false,
    chainId: 1, // Default to Ethereum mainnet
    clientId: "", // Default to empty string
    contractAddress: "", // Default to empty string
}

addPropertyControls(CustomConnectClaim721, {
    enableAccountAbstraction: {
        type: ControlType.Boolean,
        title: "Enable Account Abstraction",
    },
    chainId: {
        type: ControlType.Number,
        title: "Chain ID",
    },
    clientId: {
        type: ControlType.String,
        title: "Client ID",
    },
    contractAddress: {
        type: ControlType.String,
        title: "Contract Address",
    },
})