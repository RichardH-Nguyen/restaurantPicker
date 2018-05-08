var deleteButton = document.querySelectorAll('.delete-button');

deleteButton.forEach(function(button){
    var name = button.getAttributeNode('name').value;

    button.addEventListener('click', function(e){
        var confirmDelete = confirm('Are you sure you want to delete ' + name + '?')
        if(!confirmDelete){
            e.preventDefault();
        }
    })
});