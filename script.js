// script.js otimizado
document.addEventListener('DOMContentLoaded', () => {

    // 1. Animação ao Rolar (Intersection Observer)
    const sections = document.querySelectorAll('.fade-in-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // 2. Scroll Suave para o Menu (exceto botões de ação do WhatsApp)
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "" && !this.classList.contains('amelia-test-btn') && !this.classList.contains('plan-btn')) {
                e.preventDefault();
                const targetElement = document.querySelector(this.hash);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 3. Botão de Teste da Amélia (Número: +55 55 9217-5599)
    const ameliaTestButton = document.querySelector('.amelia-test-btn');
    if (ameliaTestButton) {
        const phoneNumber = '555592175599'; 
        const startMessage = 'Olá, Amélia';
        const encodedStartMessage = encodeURIComponent(startMessage);
        const ameliaWhatsappLink = `https://wa.me/${phoneNumber}?text=${encodedStartMessage}`;

        ameliaTestButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(ameliaWhatsappLink, '_blank');
        });
    }

    // 4. Animação de Abertura do Hero
    const heroContentBox = document.querySelector('.hero-content-box');
    if (heroContentBox) {
        setTimeout(() => heroContentBox.classList.add('animate'), 100); 
    }
	
    // 5. LÓGICA DA CHAVE SELETORA DE PREÇOS (WI-FI / LORA)
    const pricingToggle = document.getElementById('pricing-toggle');
    const labelWifi = document.getElementById('label-wifi');
    const labelLora = document.getElementById('label-lora');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', (e) => {
            const isLora = e.target.checked;
            
            if(isLora) {
                labelLora.classList.add('active');
                labelWifi.classList.remove('active');
            } else {
                labelWifi.classList.add('active');
                labelLora.classList.remove('active');
            }

            const priceVals = document.querySelectorAll('.price-val');
            const descVals = document.querySelectorAll('.desc-val');
            const hwTypes = document.querySelectorAll('.hw-type');
            const gatewayItems = document.querySelectorAll('.gateway-item');

            priceVals.forEach(el => el.innerText = isLora ? el.dataset.lora : el.dataset.wifi);
            descVals.forEach(el => el.innerText = isLora ? el.dataset.lora : el.dataset.wifi);
            hwTypes.forEach(el => el.innerText = isLora ? el.dataset.lora : el.dataset.wifi);
            
            gatewayItems.forEach(el => el.style.display = isLora ? 'block' : 'none');
        });
    }

    // 6. LÓGICA DOS BOTÕES DE PLANOS DIRECIONANDO PARA O WHATSAPP (+55 11 962469186)
    const planButtons = document.querySelectorAll('.plan-btn');
    planButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const planType = button.getAttribute('data-plan');
            const isLora = pricingToggle ? pricingToggle.checked : false;
            const versionText = isLora ? 'Versão LoRa (Campo Aberto)' : 'Versão Wi-Fi (Apiários Próximos)';
            
            let planName = '';
            let priceText = '';

            if (planType === 'mensal') {
                planName = 'Assinatura Mensal';
                priceText = isLora ? 'R$ 119,90/mês' : 'R$ 89,90/mês';
            } else if (planType === 'anual') {
                planName = 'Assinatura Anual com Desconto';
                priceText = isLora ? 'R$ 95,90/mês (Cobrado anualmente)' : 'R$ 71,90/mês (Cobrado anualmente)';
            } else if (planType === 'compra') {
                planName = 'Compra do Dispositivo Definitivo';
                priceText = isLora ? 'R$ 699,00 (Hardware) + R$ 24,90/mês (Manutenção/Plataforma) + R$ 299,00 (Gateway LoRa) ' : 'R$ 549,00 (Hardware) + R$ 24,90/mês (Manutenção/Plataforma)';
            }

            const message = `Olá! Tenho interesse na BeeWise.

Plano Escolhido: ${planName}
Tecnologia: ${versionText}
Valor: ${priceText}

Gostaria de prosseguir com a contratação.`;
            const encodedMessage = encodeURIComponent(message);
            const salesWhatsappUrl = `https://wa.me/5511962469186?text=${encodedMessage}`;

            window.open(salesWhatsappUrl, '_blank');
        });
    });
});