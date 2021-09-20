$("form#form-login").submit(function (e) {
    e.preventDefault();
    const values = {};

    $.each($("#form-login").serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });

    if (values.user === 'admin' && values.password === '12345') {
        window.location.href = "dashboard.html";
    } else {
        alert('Credenciales inválidas');
    }
});
