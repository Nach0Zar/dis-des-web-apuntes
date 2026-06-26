//Armé esta funcionalidad para chequear el numero de telefono en el form validado ya que lo 
// armaba de 2 campos y necesitaba juntarlo en 1, además de que se me ocurrió armar el desplegable 
// del código de país + número formateado. Además evita escribir numeros en los campos de nombre y apellido
document.addEventListener('DOMContentLoaded', () => {
    const phoneInputLocal = document.getElementById('validPhoneLocal');
    const phoneCountry = document.getElementById('validPhoneCountry');
    const phoneFull = document.getElementById('validPhoneFull');
    const name = document.getElementById('validationName');
    const lastname = document.getElementById('validationLastName');

    const filterLetters = (value) => {
        return value.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, '');
    };

    [name, lastname].forEach((field) => {
        if (!field) return;
            field.addEventListener('input', (event) => {
                event.target.value = filterLetters(event.target.value);
        });
    });
    
    if (!phoneInputLocal || !phoneCountry || !phoneFull) {
        return;
    }

    const formatLocalNumber = (digits) => {
        if (!digits) return '';
        if (digits.length <= 2) {
            return digits;
        }
        if (digits.length <= 6) {
            return `${digits.slice(0, 2)}-${digits.slice(2)}`;
        }
        if (digits.length <= 10) {
            return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
        }
        return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
    };

    const updateFullPhone = () => {
        const rawLocal = phoneInputLocal.value.replace(/\D/g, '');
        const formattedLocal = formatLocalNumber(rawLocal);
        phoneInputLocal.value = formattedLocal;
        phoneFull.value = `+${phoneCountry.value} ${formattedLocal}`.trim();
    };

    phoneInputLocal.addEventListener('input', (event) => {
        const raw = event.target.value.replace(/\D/g, '');
        event.target.value = formatLocalNumber(raw);
        updateFullPhone();
    });

    phoneCountry.addEventListener('change', updateFullPhone);
    updateFullPhone();
});

