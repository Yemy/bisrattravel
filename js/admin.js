import { auth, db } from "./firebase-config.js";
import { GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Allowed email addresses
const allowedEmail = "yemane@gmail.com"; // Replace with the specific email
const allowedGoogleEmail = "yemybold@gmail.com"; // Replace with the specific Google account email

// Email/Password Login
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user.email === allowedEmail) {
            alert("Login successful!");
            document.getElementById("login-section").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
            loadMessages();
        } else {
            alert("Unauthorized email. Access denied.");
            await signOut(auth);
        }
    } catch (error) {
        alert("Login failed: " + error.message);
    }
});

// Google Login
document.getElementById("google-login").addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        if (user.email === allowedGoogleEmail) {
            alert("Google Login successful!");
            document.getElementById("login-section").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
            loadMessages();
        } else {
            alert("Unauthorized Google account. Access denied.");
            await signOut(auth);
        }
    } catch (error) {
        console.error("Google Login failed:", error);
        alert("Google Login failed: " + error.message);
    }
});

// Logout
document.getElementById("logout").addEventListener("click", async () => {
    await signOut(auth);
    document.getElementById("login-section").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
});

// Load Messages
async function loadMessages() {
    const messagesTable = document.getElementById("messages-table");
    messagesTable.innerHTML = ""; // Clear table

    try {
        // Query the messages collection, ordered by timestamp
        const messagesQuery = query(collection(db, "messages"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(messagesQuery);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.phone}</td>
                    <td>${data.subject}</td>
                    <td>${data.message}</td>
                    <td>${data.timestamp?.toDate().toLocaleString()}</td>
                </tr>
            `;
            messagesTable.innerHTML += row;
        });

        if (querySnapshot.empty) {
            messagesTable.innerHTML = "<tr><td colspan='6'>No messages found.</td></tr>";
        }
    } catch (error) {
        console.error("Error loading messages:", error);
        alert("Failed to load messages.");
    }
}