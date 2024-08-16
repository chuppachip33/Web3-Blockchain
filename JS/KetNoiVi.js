document.addEventListener('DOMContentLoaded', () => {
    const connectWalletButton = document.getElementById('connect-wallet');
    const sendTransactionButton = document.getElementById('send-transaction');
    const walletInfoDiv = document.getElementById('wallet-info');
    const transactionStatusDiv = document.getElementById('transaction-status');
    let walletPublicKey;

    connectWalletButton.addEventListener('click', async () => {
        try {
            const { solana } = window;
            if (!solana) {
                alert('Không tìm thấy ví Solana. Vui lòng cài đặt tiện ích mở rộng ví Solana.');
                return;
            }

            if (!solana.isConnected) {
                const response = await solana.connect();
                walletPublicKey = response.publicKey.toString();
            } else {
                walletPublicKey = solana.publicKey.toString();
            }
            walletInfoDiv.innerHTML = `Connected to wallet: ${walletPublicKey}`;

            // Kết nối với cụm Devnet
            const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
            const balance = await connection.getBalance(new solanaWeb3.PublicKey(walletPublicKey));
            walletInfoDiv.innerHTML += `<br>Balance: ${balance / solanaWeb3.LAMPORTS_PER_SOL} SOL`;
        } catch (error) {
            console.error('Error connecting wallet:', error);
            walletInfoDiv.innerHTML = `Error: ${error.message}`;
        }
    });

    sendTransactionButton.addEventListener('click', async () => {
        try {
            const recipientAddress = document.getElementById('recipient-address').value.trim();
            const amount = parseFloat(document.getElementById('amount').value);

            if (!recipientAddress || isNaN(amount) || amount <= 0) {
                alert('Vui lòng nhập địa chỉ người nhận và số lượng hợp lệ.');
                return;
            }

            // Kiểm tra xem địa chỉ người nhận có hợp lệ không
            try {
                const recipientPublicKey = new solanaWeb3.PublicKey(recipientAddress);
                if (recipientPublicKey.toBase58().length !== 44) {
                    throw new Error("Địa chỉ người nhận không hợp lệ.");
                }
            } catch (error) {
                alert('Địa chỉ người nhận không hợp lệ.');
                return;
            }

            // Kết nối với cụm Devnet
            const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
            const transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: new solanaWeb3.PublicKey(walletPublicKey),
                    toPubkey: new solanaWeb3.PublicKey(recipientAddress),
                    lamports: amount * solanaWeb3.LAMPORTS_PER_SOL,
                })
            );

            transaction.feePayer = new solanaWeb3.PublicKey(walletPublicKey);
            const { blockhash } = await connection.getRecentBlockhash();
            transaction.recentBlockhash = blockhash;

            const signedTransaction = await window.solana.signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());

            await connection.confirmTransaction(signature);
            transactionStatusDiv.innerHTML = `Transaction sent: ${signature}`;
        } catch (error) {
            console.error('Error sending transaction:', error);
            transactionStatusDiv.innerHTML = `Error sending transaction: ${error.message}`;
        }
    });
});
