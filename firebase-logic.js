import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Check authentication and fetch machines
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            // Fetch machines for the logged-in user
            const machinesRef = collection(db, 'machines');
            const q = query(machinesRef, where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);

            const machineList = document.getElementById('machineList');
            machineList.innerHTML = ''; // Clear existing content

            querySnapshot.forEach((doc) => {
                const machine = doc.data();
                const purchaseDate = machine.purchaseDate.toDate().toLocaleDateString();
                const lastMaintenanceDate = machine.lastMaintenanceDate.toDate().toLocaleDateString();

                machineList.innerHTML += `
                    <div class="machine-card">
                        <h3>${machine.model}</h3>
                        <p><strong>Serial Number:</strong> ${machine.serialNumber}</p>
                        <p><strong>Purchase Date:</strong> ${purchaseDate}</p>
                        <p><strong>Last Maintenance Date:</strong> ${lastMaintenanceDate}</p>
                        <p><strong>Status:</strong> ${machine.status}</p>
                        <img src="${machine.imageUrl}" alt="${machine.model}" class="machine-image">
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error fetching machines:', error);
            alert('An error occurred while fetching machines. Please try again.');
        }
    } else {
        // Redirect to login page if user is not authenticated
        window.location.href = 'login.html';
    }
});

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Logout error:', error);
        alert('An error occurred during logout. Please try again.');
    });
});
