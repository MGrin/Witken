function getTextForId(text) {
    var spl = text.split('_');
    switch (spl[0]) {
    case 'general':
        return general[text];
    case 'header':
        return header[text];
    case 'footer':
        return footer[text];
    case 'index':
        return index[text];
    case 'label':
        return label[text];
    case 'examen':
        return examen[text];
    case 'profile':
        return profile[text];
    case 'prof':
        return prof_data[text];
    case 'login':
        return login[text];
    case 'signup':
        return signup[text];
        default:
        console.log('problem with texts: ' + spl[0]);
        return "";
    }
}
var general = {
    general_decouvrez: "Découvrez",
    general_registration: "Votre profil",
    general_logout: "Logout",
    general_label: "Label",
    general_emploi: "Emploi",
    general_indexation: "Indexation",
    general_witken: "Witken",
    general_language_switch: "English",
    general_language_current: "Francais"
};

var header = {
    header_label_description_text: "description",
    header_label_examen_text: "examen",
    header_emploi_text: "découvrez vous<br/>démarquez vous",
    header_indexation_comment_text: "comment",
    header_indexation_pour_qui_text: "pour qui",
    header_witken_nous_text: "à propos",
    header_witken_partenaires_text: "contactez-nous"
};

var footer = {
    footer_text: "Copyright 2014 witken.ch. tout droit réservé"
};

var index = {
    index_slide1_title: "Label de haut potentiel",
    index_slide1_text: "Boostez vos neurones en passant l'examen<br />et obtenez un label certificat...",
    index_footer1_title: "Verifier un label",
    index_footer1_text: "Vous etes une enterprise qui souhaite engager un nouveau collaborateur? <br /><br /> Verifiez son numero d'authencite"
};

var label = {
    label_description: "Erroribus elaboraret delicatissimi pri ne, ut accumsan mnesarchum vel. Choro euripidis eu eam. Per meliore accusam phaedrum te, mel ex affert rationibus constituto. Ad primis option pro, epicurei appareat cu pri. Vis omnes splendide signiferumque eu, vide euripidis te sea. Natum civibus est eu, exerci denique ad qui, eu vim eros senserit. No purto graece nec, iudico tollit quo ut, agam porro mea cu. Has no oratio tantas. Laudem placerat vim ex. Mel an commune detraxit neglegentur. Veritus docendi denique ea quo.",
    label_label_or: "Label d'or",
    label_label_or_description: "Avec plus de 98% de réussite aux 3 tests, nous vous decernerons un label d'or. Ce label szmbolisera votre haut potentiel intellectuel, émotionelle et votre capacité élevé à communiquer autout de vous.",
    label_label_silver: "Label d'argent",
    label_label_silver_description: "Erroribus elaboraret delicatissimi pri ne, ut accumsan mnesarchum vel. Choro euripidis eu eam. Per meliore accusam phaedrum te, mel ex affert rationibus constituto. Ad primis option pro, epicurei appareat cu pri. Vis omnes splendide signiferumque eu, vide euripidis te sea. Natum civibus est eu, exerci denique ad qui, eu vim eros senserit. No purto graece nec, iudico tollit quo ut, agam porro mea cu. Has no oratio tantas. Laudem placerat vim ex. Mel an commune detraxit neglegentur. Veritus docendi denique ea quo.",
    label_label_bronze: "Label de bronze",
    label_label_bronze_description: "Erroribus elaboraret delicatissimi pri ne, ut accumsan mnesarchum vel. Choro euripidis eu eam. Per meliore accusam phaedrum te, mel ex affert rationibus constituto. Ad primis option pro, epicurei appareat cu pri. Vis omnes splendide signiferumque eu, vide euripidis te sea. Natum civibus est eu, exerci denique ad qui, eu vim eros senserit. No purto graece nec, iudico tollit quo ut, agam porro mea cu. Has no oratio tantas. Laudem placerat vim ex. Mel an commune detraxit neglegentur. Veritus docendi denique ea quo.",
    label_securite_title: "Sécurité & Forme",
    label_securite_description: "Erroribus elaboraret delicatissimi pri ne, ut accumsan mnesarchum vel. Choro euripidis eu eam. Per meliore accusam phaedrum te, mel ex affert rationibus constituto. Ad primis option pro, epicurei appareat cu pri. Vis omnes splendide signiferumque eu, vide euripidis te sea. Natum civibus est eu, exerci denique ad qui, eu vim eros senserit. No purto graece nec, iudico tollit quo ut, agam porro mea cu. Has no oratio tantas. Laudem placerat vim ex. Mel an commune detraxit neglegentur. Veritus docendi denique ea quo.",
    label_reconnaissance_title: "Reconnaissance",
    label_reconnaissance_description: "Erroribus elaboraret delicatissimi pri ne, ut accumsan mnesarchum vel. Choro euripidis eu eam. Per meliore accusam phaedrum te, mel ex affert rationibus constituto. Ad primis option pro, epicurei appareat cu pri. Vis omnes splendide signiferumque eu, vide euripidis te sea. Natum civibus est eu, exerci denique ad qui, eu vim eros senserit. No purto graece nec, iudico tollit quo ut, agam porro mea cu. Has no oratio tantas. Laudem placerat vim ex. Mel an commune detraxit neglegentur. Veritus docendi denique ea quo.",
    label_certificat_title: "Certificats",
    label_certificat_description: "Erroribus elaboraret delicatissimi pri ne, ut accumsan mnesarchum vel. Choro euripidis eu eam. Per meliore accusam phaedrum te, mel ex affert rationibus constituto. Ad primis option pro, epicurei appareat cu pri. Vis omnes splendide signiferumque eu, vide euripidis te sea. Natum civibus est eu, exerci denique ad qui, eu vim eros senserit. No purto graece nec, iudico tollit quo ut, agam porro mea cu. Has no oratio tantas. Laudem placerat vim ex. Mel an commune detraxit neglegentur. Veritus docendi denique ea quo."
}

var examen = {
    examen_description: "Erroribus elaboraret delicatissimi pri ne, ut accumsan mnesarchum vel. Choro euripidis eu eam. Per meliore accusam phaedrum te, mel ex affert rationibus constituto. Ad primis option pro, epicurei appareat cu pri. Vis omnes splendide signiferumque eu, vide euripidis te sea. Natum civibus est eu, exerci denique ad qui, eu vim eros senserit. No purto graece nec, iudico tollit quo ut, agam porro mea cu. Has no oratio tantas. Laudem placerat vim ex. Mel an commune detraxit neglegentur. Veritus docendi denique ea quo.",
    examen_inscription_title: "Inscription"
}

var login = {
    login_submit: "Login",
    login_password: "Password",
    login_register: "Register on Witken",
    login_forgotten: "Forgotten password?"
}

var signup = {
    signup_title:"Register",
    signup_name: "Name *",
    signup_surname: "Surname *",
    signup_person_title: "Title",
    signup_email: "Email *",
    signup_password: "Password *",
    signup_password_repeat: "Repeat password *",
    signup_gender: "Sex *",
    signup_birtday: "Date of birth *",
    signup_contact_home_phone: "Home number",
    signup_contact_cell_phone: "Mobile number *",
    signup_contact_home_address: "Home address *",
    signup_contact_home_postal_code: "Home ZIP code *",
    signup_contact_home_country: "Country",
    signup_contact_home_city: "City",
    signup_job_title: "Job title *",
    signup_work_address: "Work address",
    signup_error_incomplete: "The registration form is not complete",
    signup_error_zip: ' - <span class="error_m">The ZIP code is too long</span>',
    signup_error_password_short: ' - <span class="error_m">The password should have at least 8 characters</span>',
    signup_error_password_repeat: ' - <span class="error_m">The passwords don\'t match</span>',
    signup_error_email_format: ' - <span class="error_m">Wrong email format</span>',
    signup_error_email_exists: ' - <span class="error_m">Email already exists</span>',
    signup_error_birthday: ' - <span class="error_m">Your birthday is out of range</span>'


}