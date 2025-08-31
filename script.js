document.addEventListener('DOMContentLoaded', () => {
	const configTextarea = document.querySelector('#firebase-config');
	const emailInput = document.querySelector('#email');
	const passwordInput = document.querySelector('#password');
	const loginButton = document.querySelector('#login-button');
	const refreshTokenButton = document.querySelector('#refresh-token-button');
	const resultMessage = document.querySelector('#result-message');
	const connectionStatusDot = document.querySelector('#connection-status');
	const connectionStatusText = document.querySelector('#connection-text');
	const tokenStatusDot = document.querySelector('#token-status');
	const tokenStatusText = document.querySelector('#token-text');
	const idTokenDisplay = document.querySelector('#id-token-display');
	const tokenValidityDisplay = document.querySelector('#token-validity');

	let firebaseApp;
	let auth;

	function updateStatus(isConnected, hasValidToken) {
		if (isConnected) {
			connectionStatusDot.classList.remove('disconnected');
			connectionStatusDot.classList.add('connected');
			connectionStatusText.textContent = 'Connecté';
			refreshTokenButton.disabled = false;
		} else {
			connectionStatusDot.classList.remove('connected');
			connectionStatusDot.classList.add('disconnected');
			connectionStatusText.textContent = 'Déconnecté';
			refreshTokenButton.disabled = true;
		}

		if (hasValidToken) {
			tokenStatusDot.classList.remove('invalid');
			tokenStatusDot.classList.add('valid');
			tokenStatusText.textContent = 'ID Token Valide';
		} else {
			tokenStatusDot.classList.remove('valid');
			tokenStatusDot.classList.add('invalid');
			tokenStatusText.textContent = 'ID Token Invalide';
		}
	}

	function displayMessage(message, type) {
		resultMessage.textContent = message;
		resultMessage.className = `message ${type}`;
		setTimeout(() => {
			resultMessage.textContent = '';
			resultMessage.className = 'message';
		}, 5000);
	}

	function displayTokenInfo(token) {
		if (!token) {
			idTokenDisplay.textContent = 'Aucun ID Token disponible.';
			tokenValidityDisplay.textContent = '';
			return;
		}

		idTokenDisplay.textContent = token;

		try {
			const payload = JSON.parse(atob(token.split('.')[1]));
			const issuedAt = dayjs.unix(payload.iat);
			const expiresAt = dayjs.unix(payload.exp);

			const validityText = `Valide de ${issuedAt.format('DD/MM/YYYY HH:mm:ss')} à ${expiresAt.format('DD/MM/YYYY HH:mm:ss')}`;
			tokenValidityDisplay.textContent = validityText;

			const now = dayjs();
			const isValid = now.isBefore(expiresAt);
			updateStatus(true, isValid);
		} catch (e) {
			tokenValidityDisplay.textContent = 'Erreur lors de la lecture du token.';
			updateStatus(true, false);
		}
	}

	async function handleLogin(e) {
		e.preventDefault();

		const config = configTextarea.value.trim();
		const email = emailInput.value.trim();
		const password = passwordInput.value.trim();

		if (!config || !email || !password) {
			displayMessage('Veuillez remplir tous les champs.', 'error');
			return;
		}

		try {
			const firebaseConfig = JSON.parse(config);
			if (!firebaseApp) {
				firebaseApp = firebase.initializeApp(firebaseConfig);
				auth = firebaseApp.auth();
			}

			const userCredential = await auth.signInWithEmailAndPassword(email, password);
			const idToken = await userCredential.user.getIdToken();

			displayMessage('Connexion réussie !', 'success');
			displayTokenInfo(idToken);
		} catch (error) {
			console.error(error);
			displayMessage(`Erreur de connexion : ${error.message}`, 'error');
			updateStatus(false, false);
			displayTokenInfo(null);
		}
	}

	async function handleRefreshToken() {
		const user = auth.currentUser;
		if (user) {
			try {
				const idToken = await user.getIdToken(true); // true force le rafraîchissement
				displayMessage('ID Token actualisé avec succès !', 'success');
				displayTokenInfo(idToken);
			} catch (error) {
				console.error(error);
				displayMessage(`Erreur lors de l'actualisation du token : ${error.message}`, 'error');
			}
		} else {
			displayMessage("Veuillez vous connecter d'abord.", 'error');
		}
	}

	loginButton.addEventListener('click', handleLogin);
	refreshTokenButton.addEventListener('click', handleRefreshToken);

	// Écouteur pour l'état de l'authentification
	// Met à jour l'interface en temps réel
	firebase.auth().onAuthStateChanged(async (user) => {
		if (user) {
			updateStatus(true, false); // On met à jour l'état de connexion mais pas encore du token
			try {
				const idToken = await user.getIdToken();
				displayTokenInfo(idToken);
			} catch (error) {
				console.error('Erreur lors de la récupération du token:', error);
				displayTokenInfo(null);
			}
		} else {
			updateStatus(false, false);
			displayTokenInfo(null);
		}
	});
});
