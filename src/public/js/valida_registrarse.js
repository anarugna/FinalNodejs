document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#registroForm');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
        
        if (!validateForm()) {
            console.log('El formulario no es válido. Por favor, corrige los errores.');
        } else {
            console.log('El formulario es válido. Enviar datos...');
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const terminos = document.getElementById('terminos').checked;
            
            if (terminos) {
                try {
                    const response = await fetch('/api/users/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ nombre, email, password })
                    });
                    
                    const data = await response.json();
                    if (response.ok) {
                        alert('Registro Exitoso!');
                        // Redirigir o realizar otra acción después del registro exitoso
                    } else {
                        alert(`Error: ${data.message || 'Error en el registro'}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Ocurrió un error al registrar. Por favor, intenta nuevamente.');
                }
            } else {
                alert('Debes aceptar los términos y condiciones');
            }
        }
    });

    const validateForm = () => {
        let isValid = true;
        isValid = validateField('nombre', 'El nombre es obligatorio') && isValid;
        isValid = validateEmailField('email', 'El correo electrónico no es válido') && isValid;
        isValid = validateField('password', 'La contraseña es obligatoria') && isValid;
        const terminos = document.getElementById('terminos').checked;
        if (!terminos) {
            isValid = false;
            setErrorFor(document.getElementById('terminos'), 'Debes aceptar los términos y condiciones');
        } else {
            setSuccessFor(document.getElementById('terminos'));
        }
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