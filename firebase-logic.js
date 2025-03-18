import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Check authentication and fetch machines
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            // Fetch machines for the logged-in user
            const machinesRef = collection(db, 'machines'); // Reference the 'machines' collection
            const q = query(machinesRef, where('userId', '==', user.email)); // Query machines for the logged-in user
            const querySnapshot = await getDocs(q);

            const machineList = document.getElementById('machineList');
            machineList.innerHTML = ''; // Clear existing content

            querySnapshot.forEach((doc) => {
                const machine = doc.data();
                console.log('Machine Data:', machine); // Debug: Log the machine data

                // Extract fields from the machine document
                const model = machine.model || 'N/A';
                const serialNumber = machine['Serial Number'] || 'N/A'; // Use bracket notation for fields with spaces
                const purchaseDate = machine['Purchase Date']?.toDate?.()?.toLocaleDateString() || 'N/A'; // Use bracket notation for fields with spaces
                const lastMaintenanceDate = machine['Last Maintenance Date']?.toDate?.()?.toLocaleDateString() || 'N/A'; // Use bracket notation for fields with spaces
                const status = machine.Status || 'N/A'; // Use bracket notation for fields with spaces
                const imageUrl = machine['Image Url'] || '#'; // Use bracket notation for fields with spaces

                // Create a machine card and append it to the machine list
                machineList.innerHTML += `
                    <div class="machine-card">
                        <h3>${model}</h3>
                        <p><strong>Serial Number:</strong> ${serialNumber}</p>
                        <p><strong>Purchase Date:</strong> ${purchaseDate}</p>
                        <p><strong>Last Maintenance Date:</strong> ${lastMaintenanceDate}</p>
                        <p><strong>Status:</strong> ${status}</p>
                        <img src="${imageUrl}" alt="${model}" class="machine-image">
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
