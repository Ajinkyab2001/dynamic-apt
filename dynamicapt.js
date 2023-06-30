function myfunc(event){
    event.preventDefault();
     var myobj = {
        full_name : document.getElementById("Name").value,
        email_id : document.getElementById("Email").value,
        phone_no : document.getElementById("Phone").value,
        // dates : document.getElementById("date").value,
        // times : document.getElementById("time").value,
     }
   
     let user_records = [];
   
     user_records.push({
        "user_details": myobj,
     
      })

    axios.post('https://crudcrud.com/api/823e9715924148e9920c298f9e0f36ee/appointmentdata',myobj)
    .then((response) => console.log(response))
    .catch(err => console.log(err))

      showUserOnScreen(myobj)

}
function showUserOnScreen(myobj){
    const parentElem = document.getElementById('ddd');
    const childElem = document.createElement('div');
    childElem.textContent = myobj.full_name +' '+myobj.email_id+' ';

    const deleteButton = document.createElement('input')
    deleteButton.type = "button"
    deleteButton.value = 'delete'
    deleteButton.onclick = () => {
        // localStorage.removeItem(myobj.email_id)
        // parentElem.removeChild(childElem)
    }

    const edit = document.createElement('input')
    edit.type = "button"
    edit.value = 'edit'
    edit.onclick = () => {
        // localStorage.removeItem(myobj.email_id)
        // parentElem.removeChild(childElem)
        document.getElementById("Name").value = myobj.full_name
        document.getElementById("Email").value = myobj.email_id
    }

     
    childElem.appendChild(deleteButton)
    childElem.appendChild(edit)

    parentElem.appendChild(childElem);
}