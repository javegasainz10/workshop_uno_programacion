createList();
loadStudents();
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function validateField(event) {
    var elementId = event.target.id;
    var formNode = document.getElementById(elementId);
    if(formNode.id === 'txtEmail' && validateEmail(txtEmail.value) === false){
        formNode.classList.add('is-invalid');
        formNode.classList.add('incomplete');
        document.getElementById('btnAddStudent').disabled = true;
    }
    else if(formNode.value === '' || formNode.value == undefined || formNode.value === null) {
        formNode.classList.add('is-invalid');
        formNode.classList.add('incomplete');
    } 
    else {
        formNode.classList.add('is-valid');
        formNode.classList.remove('incomplete');
        var invalids = document.getElementsByClassName('incomplete');
        if(invalids.length === 0) {
            document.getElementById('btnAddStudent').disabled = false;
        }
    }
}

var limitDni = document.getElementById('txtDni');
limitDni.onkeyup = restrictDNILength;

function restrictDNILength(){
    if (limitDni.value.indexOf('-') === 0) {
        limitDni.value = '';
    }
    if(limitDni.value.length > 8){
        limitDni.value = '';
    }
}

function resetValidator(event) {
    var elementId = event.target.id;
    var formNode = document.getElementById(elementId);
    formNode.classList.remove('is-invalid');
    formNode.classList.remove('is-valid');
}
function addStudent() {
    if(txtDni.value < 0) {
        alert('DNI inválido.');
        return;
    }
    if(localStorage.getItem(txtDni.value)) {
        alert('El alumno ingresado ya existe.');
        return;
    }
    var student = new Student(txtFirstName.value, txtLastName.value, txtDni.value, txtEmail.value);
    var obj = localStorage.getItem('StudentList');
    var alumno = JSON.parse(obj);
    alumno.push(student);
    localStorage.setItem('StudentList', JSON.stringify(alumno));

    var ulNode = document.getElementById('mainList'); //Container principal
    var liNode = document.createElement('li');  //fila de la lista
    liNode.id = 'saved-' + student.dni;
    liNode.className = 'list-group-item';
    var h1Node = document.createElement('h1');
    h1Node.innerHTML = student.firstName + ' ' + student.lastName
    var h3Node = document.createElement('h3');
    h3Node.innerHTML = 'DNI: ' + student.dni;
    var h4Node = document.createElement('h4');
    h4Node.innerHTML = 'DNI: ' + student.email;
    liNode.appendChild(h1Node);
    liNode.appendChild(h3Node);
    liNode.appendChild(h4Node);
    ulNode.appendChild(liNode);
    txtDni.value = '';
    txtFirstName.value = '';
    txtLastName.value = '';
    txtEmail.value = '';
}
function Student(firstName, lastName, dni, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.email = email;
}

function deleteStudent() {
    if(txtDniDelete.value === '') {
        alert('Debe ingresar un número de DNI.');
        return;
    }
    var obj = localStorage.getItem('StudentList');
    var alumnos2 = [];
    var alumnos = JSON.parse(obj);
    for (var i = 0; i < alumnos.length; i++) {
        var alumno = alumnos[i];
        if(alumno.dni != txtDniDelete.value) {
            alumnos2.push(alumno);
        }
    }
    alumnos = alumnos2;
    localStorage.setItem('StudentList', JSON.stringify(alumnos));
    while (mainList.firstChild) {
        mainList.removeChild(mainList.firstChild);
    }
    loadStudents();
    txtDniDelete.value = '';
}

function loadStudents(){
    var obj = localStorage.getItem('StudentList');
    var alumno = JSON.parse(obj);
    for(a = 0; a < alumno.length; a++){
        var item =  alumno[a];
        var ulNode = document.getElementById('mainList');
        var liNode = document.createElement('li');
        liNode.id = 'saved-' + item.dni;
        liNode.className = 'list-group-item';
        var h1Node = document.createElement('h1');
        h1Node.innerHTML = item.firstName + ' ' + item.lastName;
        var h3Node = document.createElement('h3');
        h3Node.innerHTML = 'DNI: ' + item.dni;
        var h4Node = document.createElement('h4');
        h4Node.innerHTML = 'DNI: ' + item.email;
        liNode.appendChild(h1Node);
        liNode.appendChild(h3Node);
        ulNode.appendChild(liNode);
    }
}

var studentSearch = document.getElementById('txtSearchStudent');
studentSearch.onkeyup = dynamicSearch;

function dynamicSearch() {
    var mainList = document.getElementById("mainList");
    while (mainList.firstChild) {
    mainList.removeChild(mainList.firstChild);
    }

    var obj = localStorage.getItem('StudentList');
    var alumno = JSON.parse(obj);
    for(a = 0; a < alumno.length; a++){
        var item =  alumno[a];
        if (item.firstName === studentSearch.value) {
            var ulNode = document.getElementById('mainList');
            var liNode = document.createElement('li');
            liNode.id = 'saved-' + item.dni;
            liNode.className = 'list-group-item';
            var h1Node = document.createElement('h1');
            h1Node.innerHTML = item.firstName + ' ' + item.lastName;
            var h3Node = document.createElement('h3');
            h3Node.innerHTML = 'DNI: ' + item.dni;
            var h4Node = document.createElement('h4');
            h4Node.innerHTML = 'DNI: ' + item.email;
            liNode.appendChild(h1Node);
            liNode.appendChild(h3Node);
            ulNode.appendChild(liNode);
        } else if (item.firstName =! studentSearch.value){
            var obj = localStorage.getItem('StudentList');
            var alumno = JSON.parse(obj);
            for(a = 0; a < alumno.length; a++){
            var item =  alumno[a];
            var ulNode = document.getElementById('mainList');
            var liNode = document.createElement('li');
            liNode.id = 'saved-' + item.dni;
            liNode.className = 'list-group-item';
            var h1Node = document.createElement('h1');
            h1Node.innerHTML = item.firstName + ' ' + item.lastName;
            var h3Node = document.createElement('h3');
            h3Node.innerHTML = 'DNI: ' + item.dni;
            var h4Node = document.createElement('h4');
            h4Node.innerHTML = 'DNI: ' + item.email;
            liNode.appendChild(h1Node);
            liNode.appendChild(h3Node);
            ulNode.appendChild(liNode);}
        }
    }
}

function createList(){
    var existing = localStorage.getItem('StudentList');
    if(existing) {
        return;
    } else {
        var students = [];
        var studentJSON = JSON.stringify(students);
        localStorage.setItem('StudentList', studentJSON);
    }
}