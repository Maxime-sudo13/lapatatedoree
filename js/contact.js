function validateAndSubmit(event) {
    event.preventDefault();
    
    // Récupération des champs
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const sujet = document.getElementById('sujet').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Vérification que tous les champs sont remplis
    if (!nom || !email || !sujet || !message) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return false;
    }
    
    // Vérification du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return false;
    }
    
    // Construction du lien mailto
    const mailtoLink = `mailto:lapatatedoree54@gmail.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(`De: ${nom}\nEmail: ${email}\n\n${message}`)}`;
    
    // Ouverture du client mail par défaut
    window.location.href = mailtoLink;
    
    // Réinitialisation du formulaire
    document.getElementById('contactForm').reset();
    
    return false;
}