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
            return "No text";
    }
}
var general = {
    general_decouvrez: "Découvrez",
    general_registration: "Votre profil",
    general_logout: "déconnecter",
    general_label: "Label",
    general_examen: "Examen",
    general_emploi: "Emploi",
    general_indexation: "Indexation",
    general_witken: "Witken",
    general_results: "Resultats",
    general_label_and_certificats: "Résultats",
    general_messages: "Demandes",
    general_compte: "Compte",
    general_enterprise: "Enterprises",
    general_language_switch: "English",
    general_language_current: "Français"
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

var profile = {
    profile_text_exam_1: "Votre examen est planifie pour le",
    profile_text_exam_time_morning: "de 8:30 à 12:30",
    profile_text_exam_time_afternoon: "de 13:30 à 16:30",
    profile_text_convocation: "Convocation",
    profile_text_horaires_detaile: "Horaire détaillé",
    profile_text_terms: "Termes & conditions",
    profile_text_terms_details: "Téléchargés les termes & conditions " +  '<a href="">ici</a>',
    profile_indexation_insubscription: "Désinscription",
    profile_indexation_insubscription_text: "Si vous souhaitez vous désinscrire de notre base de donnée veuillez nous envoyer un courriel à " +  '<a href="mailto:index@witken.ch?Subject=Désinscription" target="_blank"">index@witken.ch</a>',
    profile_no_content_reason_results: "Ces informations s'afficherons des que vos resultats d'examen seront connu",
    profile_personnal_number_text: "Numero d'identification personnel: ",
    profile_personnal_data: "Données personnel",
    profile_professional_data: "Données professionel",
    profile_parrainez_data: "Parrainez un contact",
    profile_parrainez_text: "Parrainez un contact dans votre entourage et faites-vous rembourser une partie de votre examen! Pour chaque personne parrainée, recevez jusqu’à 100 CGF (maximum 5 parrainages par personne). Dès que la personne sera inscrite à l’un de nos examens, vous recevrez 20CHF",
    profile_parrainez_enter: "Entrer une adresse email !",
    profile_status: "Statut: ",
    profile_confirmed: "Confirmé",
    profile_not_confirmed: "Pas confirmé",
    profile_exam_passed: "Vous avez déjà passe votre examen",
    profile_personality: "Personnalité",
    profile_leadership: "Leadership",
    profile_test_personality: "Test de la personnalité",
    profile_test_leadership: "Test de leadership",
    profile_test_qi: "Qi",
    profile_test_qe: "Qe",
    profile_test_co: "Co",
    profile_test_qi_detail: "QI = Quotien intellectuel",
    profile_test_qe_detail: "Qe = Quotien émotionnel",
    profile_test_co_detail: "Co = Communication",
    profile_indexation_appear: "Comment j'apparais dans la base de donnée :",
    profile_messages_make_contact: "Rentrer en contact avec une entreprise vous permet de découvrir lors propositions, cela vous engage en rien.",
    profile_refuse: "Refuser",
    profile_accept: "Accepter",
    profile_exam_no_online_test_done: "Le test de Leadership et do Personnalité n'est pas finis!",
    profile_online_test_link: "Passer les tests de Leadership et de Personnalité",
    profile_accept_button_p: "Parrainez",
    profile_refuse_button_p: "Fermer"
}

var prof_data = {
    prof_data_sector: "Secteur",
    prof_data_post: "Poste",
    prof_data_hierarchie_level: "Niveau hiérarchique",
    prof_data_experience_age: "Annee(s) d'experience",
    prof_data_experience_prof: "Experience profesionnel",
    prof_data_enterprise: "Enterprise",
    prof_data_region: "Region",
    prof_data_start_time: "De",
    prof_data_end_time: "À",
    prof_data_studies: "Formation",
    prof_data_material: "Matiere",
    prof_data_diplome: "Diplôme",
    prof_data_getting_year: "Annee d'obtention",
    prof_data_language: "Langue",
    prof_data_level: "Niveau",
    prof_data_informatique: "Informatique (facultatif)",
    prof_data_programm: "Programme"
}

var index = {
    index_slide1_title: "Label de haut potentiel",
    index_slide1_text: "Boostez vos neurones en passant l'examen<br />et obtenez un label certificat...",
    index_footer_results_text: "consultez vos rapports <br />telecharger vos certificats",
    index_footer_labels_text: "controle son authenticite",
    index_footer_enterprises_text: "creez un compte <br /> verifiez un label"
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
    login_title: "Authentification",
    login_email: "Email",
    login_submit: "S'identifier",
    login_password: "Mot de passe",
    login_register: "S'inscrire sur Witken",
    login_forgotten: "Mot de passe oublié?",
    login_error_email: ' - <span class="error_m">Format e-mail erroné</span>',
    login_error_email_missing: ' - <span class="error_m">n\'existe pas</span>',
    login_error_password: ' - <span class="error_m">ne correspondent pas</span>'
}

var signup = {
    signup_title:"S'inscrire",
    signup_name: "Prenom *",
    signup_surname: "Nom *",
    signup_person_title: "Titre",
    signup_email: "Email *",
    signup_password: "Mot de passe *",
    signup_password_repeat: "Répéter mot de passe *",
    signup_gender: "Sexe *",
    signup_birtday: "Naissance *",
    signup_contact_home_phone: "Téléphone Maison",
    signup_contact_cell_phone: "Téléphone Natel *",
    signup_contact_home_address: "Adresse du domicile *",
    signup_contact_home_postal_code: "Code postal du domicile *",
    signup_contact_home_country: "Pays d'origine",
    signup_contact_home_city: "Ville natale",
    signup_job_title: "Titre d'emploi *",
    signup_work_address: "Adresse de travail",
    signup_error_incomplete: "Le formulaire d'inscription n'est pas complète",
    signup_error_zip: ' - <span class="error_m">Le code postal est trop long</span>',
    signup_error_password_short: ' - <span class="error_m">doit comporter au moins 8 caractères</span>',
    signup_error_password_repeat: ' - <span class="error_m">Mots de passe ne correspondent pas</span>',
    signup_error_email_format: ' - <span class="error_m">Format e-mail erroné</span>',
    signup_error_email_exists: ' - <span class="error_m">Email existe déjà</span>',
    signup_error_birthday: ' - <span class="error_m">Votre anniversaire est hors de portée</span>'
}