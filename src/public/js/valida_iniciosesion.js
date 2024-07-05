document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
        
        if (validateForm()) {
            console.log('El formulario es válido. Enviar datos...');

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Inicio de sesión exitoso:', data);
                    // Guarda el token en el almacenamiento local
                    localStorage.setItem('token', data.token);
                    // Redirigir a otra página después del inicio de sesión exitoso
                    window.location.href = '/index.html';
                } else {
                    const errorData = await response.json();
                    console.error('Error en el inicio de sesión:', errorData);
                    alert(errorData.message);
                }
            } catch (error) {
                console.error('Error en el inicio de sesión:', error);
                alert('Error en el inicio de sesión. Por favor, inténtelo de nuevo.');
            }
        } else {
            console.log('El formulario no es válido. Por favor, corrige los errores.');
        }
    });

    const validateForm = () => {
        let isValid = true;
        isValid = validateEmailField('email', 'El correo electrónico no es válido') && isValid; // Validar campo de email
        isValid = validateField('password', 'La contraseña es obligatoria') && isValid; // Validar campo de contraseña
        return isValid;
    };

    const validateField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        if (value === '') {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    const validateEmailField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const email = field.value.trim();
        if (email === '') {
            setErrorFor(field, 'El correo electrónico es obligatorio');
            return false;
        } else if (!isEmail(email)) {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    const setErrorFor = (input, message) => {
        const formControl = input.closest('div');
        const errorText = formControl.querySelector('.error-text');
        formControl.classList.add('error');
        errorText.innerText = message;
        input.focus();
    };

    const setSuccessFor = (input) => {
        const formControl = input.closest('div');
        formControl.classList.remove('error');
        const errorText = formControl.querySelector('.error-text');
        errorText.innerText = '';
    };

    const isEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const value = input.value.trim();
            if (value !== '') {
                setSuccessFor(input);
            }
        });
    });

    form.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => {
            const value = select.value;
            if (value !== '') {
                setSuccessFor(select);
            }
        });
    });
});
