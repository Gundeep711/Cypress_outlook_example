document.addEventListener('DOMContentLoaded',function() {
    const form = document.getElementById('myForm');
    form.addEventListener('submit', function(e){
        e.preventDefault();

        const formData = new FormData(form);
        const formObject = {};

        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        const jsonData = JSON.stringify(formObject, null, 2);
        console.log(jsonData);

        //saving json with File Saver Library
        const blob = new Blob([jsonData], {type: 'application/json'});
        const timestamp = Date.now();
        const fileName = `form_data_${timestamp}.json`;
        saveAs(blob, fileName);
    });
});