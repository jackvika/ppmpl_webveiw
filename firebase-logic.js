import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Check authentication and fetch machines
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Fetch machines for the logged-in user
        const machinesRef = collection(db, 'machines');
        const q = query(machinesRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const machineList = document.getElementById('machineList');
        machineList.innerHTML = ''; // Clear existing content

        querySnapshot.forEach((doc) => {
            const machine = doc.data();
            machineList.innerHTML += `
                <div class="machine-card">
                    <h3>${machine.model}</h3>
                    <p><strong>Serial Number:</strong> ${machine.serialNumber}</p>
                    <p><strong>Purchase Date:</strong> ${machine.purchaseDate.toDate().toLocaleDateString()}</p>
                    <p><strong>Last Maintenance Date:</strong> ${machine.lastMaintenanceDate.toDate().toLocaleDateString()}</p>
                    <p><strong>Status:</strong> ${machine.status}</p>
                    <img src="${machine.imageUrl}" alt="${machine.model}" class="machine-image">
                </div>
            `;
        });
    } else {
        // Redirect to login page if user is not authenticated
        window.location.href = 'login.html';
    }
});

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    });
});