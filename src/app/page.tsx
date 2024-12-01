"use client";

// Internal Components
import { useWallet } from "@aptos-labs/wallet-adapter-react";

function App() {
  const { connected } = useWallet();

  return (
    <>
    <div>home page</div>
    {connected && <p>Connected to wallet</p>}
    </>
  );
}

export default App;
