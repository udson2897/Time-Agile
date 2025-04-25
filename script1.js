// =============================================
// MENU MOBILE TOGGLE (MANTIDO)
// =============================================
document.getElementById('mobileMenu').addEventListener('click', function() {
    const nav = document.getElementById('mainNav');
    const icon = this.querySelector('i');
    
    nav.classList.toggle('active');
    
    if (icon) {
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// =============================================
// SCROLL SUAVE (MANTIDO)
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            const nav = document.getElementById('mainNav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = document.querySelector('#mobileMenu i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});


// =============================================
const formContato = document.getElementById('formContato');

if (formContato) {
    formContato.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        try {
            // 1. Preparar dados do formulário
            const formData = {
                name: this.name.value.trim(),
                email: this.email.value.trim(),
                phone: this.phone.value.trim() || 'Não informado',
                business: this.business.value,
                service: this.service.value,
                message: this.message.value.trim()
            };

            // 2. Validação básica
            if (!formData.nome || !formData.email || !formData.mensagem) {
                throw new Error("Por favor, preencha nome, e-mail e mensagem!");
            }

            // 3. Desabilitar botão e mudar texto
            submitButton.disabled = true;
            submitButton.textContent = "Enviando...";

            // 4. Enviar dados pro Google Apps Script
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbzAydKVJxiAA3fccnfQjQN-jfd9g-8rVcC72VMJxFHv_1uGFRA2Jvor6TFUxzzoKHA3/exec';

            await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors', // ignora política de CORS
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // 5. Mensagem simulada de sucesso
            alert("📨 Mensagem enviada com sucesso!");
            this.reset();

        } catch (error) {
            console.error("Erro no envio:", error);
            alert(`⚠️ ${error.message}`);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}
