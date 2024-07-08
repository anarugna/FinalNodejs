document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCargarPelicula');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            console.log('El formulario no es válido. Por favor, corrige los errores.');
            return;
        }

        try {
            const formData = new FormData(form);
            const response = await fetch('/movies', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al cargar la película.');
            }

            const data = await response.json();
            console.log('Película cargada correctamente:', data.message);
            alert('Película cargada correctamente');

            // Redireccionar o realizar alguna acción adicional después de cargar la película
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar la película. Por favor, intenta nuevamente.');
        }
    });

    const validateForm = () => {
        let isValid = true;
        // Validaciones existentes
        isValid = validateField('titulo', 'El título es obligatorio') && isValid;
        isValid = validateField('descripcion', 'La descripción es obligatoria') && isValid;
        isValid = validateSelect('categoria_id', 'Selecciona una categoría válida') && isValid;
        isValid = validateSelect('director_id', 'Selecciona un director válido') && isValid;
        isValid = validateFile('imagen', 'Selecciona una imagen válida (PNG, JPG)') && isValid;
    
        // Validación de nuevas categorías y directores
        if (document.getElementById('categoria').value === '' && document.getElementById('nuevaCategoria').value === '') {
            setErrorFor(document.getElementById('categoria'), 'Selecciona una categoría o ingresa una nueva');
            isValid = false;
        } else {
            setSuccessFor(document.getElementById('categoria'));
        }
        if (document.getElementById('director').value === '' && document.getElementById('nuevoDirector').value === '') {
            setErrorFor(document.getElementById('director'), 'Selecciona un director o ingresa uno nuevo');
            isValid = false;
        } else {
            setSuccessFor(document.getElementById('director'));
        }
    
        return isValid;
    };
    
    // Ajustar el evento submit del formulario para manejar la lógica de creación de nuevas categorías y directores
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            console.log('El formulario no es válido. Por favor, corrige los errores.');
            return;
        }
    
        try {
            const response = await fetch('/api/movies/movies', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Error al cargar la película.');
            }
    
            const data = await response.json();
            console.log('Película cargada correctamente:', data.message);
            alert('Película cargada correctamente');
    
            // Redireccionar o realizar alguna acción adicional después de cargar la película
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar la película. Por favor, intenta nuevamente.');
        }
    });

    const validateFile = (fileId, errorMessage) => {
        const fileInput = document.getElementById(fileId);
        const file = fileInput.files[0];
        if (!file || !['image/jpeg', 'image/png'].includes(file.type)) {
            setErrorFor(fileInput, errorMessage);
            return false;
        } else {
            setSuccessFor(fileInput);
            return true;
        }
    };

    const setErrorFor = (input, message) => {
        const formControl = input.closest('div');
        formControl.classList.add('error');
        const errorText = formControl.querySelector('.error-text');
        errorText.innerText = message;
    };

    const setSuccessFor = (input) => {
        const formControl = input.closest('div');
        formControl.classList.remove('error');
        const errorText = formControl.querySelector('.error-text');
        errorText.innerText = '';
    };
});