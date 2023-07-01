// Retrieve the form element and add a submit event listener
document.getElementById("myForm").addEventListener("submit", function(event) {
    // event.preventDefault(); // Prevent form submission
    // Get the form data
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    // Create a unique key for the user object
    //let key = "user_" + Date.now(); // Using current timestamp as a unique identifier
    // Create a user object
    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone
    };
    // Store the user object in local storage with the unique key
    //localStorage.setItem(key, JSON.stringify(user));
    // Clear the form fields
    //document.getElementById("myForm").reset();
    axios.post("https://crudcrud.com/api/54f216c68a2a4e02af4c40b79fb9cce9/appointmentdata", user)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });
    // Reload the booked members list to display the updated list
    loadBookedMembers();
});
// Function to load booked members from local storage and display in the list
function loadBookedMembers() {
   // Get the list of registered members
   axios.get("https://crudcrud.com/api/54f216c68a2a4e02af4c40b79fb9cce9/appointmentdata")
   .then((response) => {
       const itemsList = document.getElementById("items");
       itemsList.innerHTML = ""; // Clear the existing list
       // Loop through the list of members and display them on the page
       response.data.forEach((user) => {
           const li = document.createElement("li");
           li.classList.add("list-group-item");
           li.innerHTML = `
               <div>Name: ${user.firstName} ${user.lastName}</div>
               <div>Email: ${user.email}</div>
               <div>Phone: ${user.phone}</div>
           `;
           const deleteButton = document.createElement("button");
           deleteButton.className = "btn btn-danger btn-sm float-right delete";
           deleteButton.textContent = "DELETE";
           deleteButton.dataset.id = user._id;

           deleteButton.addEventListener("click", function(event) {
            const userId = event.target.dataset.id;
            axios.delete(`https://crudcrud.com/api/54f216c68a2a4e02af4c40b79fb9cce9/appointmentdata/${userId}`)
            .then(() => {
                li.remove();

            })
            .catch((err) => {
                console.log(err);
            })
           })

           li.appendChild(deleteButton);
           itemsList.appendChild(li);
       });
   })
   .catch((err) => {
       console.log(err);
   });
}

// Initial load of booked members list when the page loads

window.addEventListener("DOMContentLoaded", () => {
    loadBookedMembers();
})