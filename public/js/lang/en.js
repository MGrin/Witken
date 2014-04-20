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
    general_decouvrez: "Explore",
    general_registration: "Your profile",
    general_logout: "logout",
    general_label: "Label",
    general_examen: "Exam",
    general_emploi: "Job",
    general_indexation: "Indexing",
    general_witken: "Witken",
    general_results: "Results",
    general_label_and_certificats: "Results",
    general_messages: "Requests",
    general_compte: "Account",
    general_enterprise: "Enterprises",
    general_language_switch: "Français",
    general_language_current: "English"
};

var profile = {
    profile_text_exam_1: "Your exam is planned for",
    profile_text_exam_time_morning: "from 8:30 to 12:30",
    profile_text_exam_time_afternoon: "from 13:30 to 16:30",
    profile_text_convocation: "Meeting",
    profile_text_horaires_detaile: "Detailed schedule",
    profile_text_terms: "Terms & conditions",
    profile_indexation_insubscription: "Unsubscribe",
    profile_indexation_insubscription_text: "If you would like unsubscribe please send an email to admin@witken.ch",
    profile_no_content_reason_results: "This information will be active once you have passed your exams",
    profile_personnal_number_text: "Personal identification number:",
    profile_personnal_data: "Personal data",
    profile_professional_data: "Professional data",
    profile_parrainez_data: "Invite a person",
    profile_status: "Status: ",
    profile_confirmed: "Confirmed",
    profile_personality: "Personality",
    profile_leadership: "Leadership",
    profile_exam_passed: "You have already passed your exam",
    profile_exam_day: "14th May 2014",
    profile_test_personality: "Personality test",
    profile_test_leadership: "Leadership test",
    profile_test_qi: "Iq",
    profile_test_qe: "Eq",
    profile_test_co: "Co",
    profile_test_qi_detail: "Qi = Intelligence quotient",
    profile_test_qe_detail: "Eq = Emotional quotient",
    profile_test_co_detail: "Co = Communication"
}

var prof_data = {
    prof_data_sector: "Sector",
    prof_data_post: "Post",
    prof_data_hierarchie_level: "Level hierarchy",
    prof_data_experience_age: "Year(s) of experience",
    prof_data_experience_prof: "Professional experience",
    prof_data_enterprise: "Enterprise",
    prof_data_region: "Region",
    prof_data_start_time: "From",
    prof_data_end_time: "To",
    prof_data_studies: "Formation",
    prof_data_material: "Subject",
    prof_data_diplome: "Diploma",
    prof_data_getting_year: "Year of graduation",
    prof_data_language: "Language",
    prof_data_level: "Level",
    prof_data_informatique: "Computer skills (optional)",
    prof_data_programm: "Program"
}

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
    login_title: "Login",
    login_submit: "Login",
    login_email: "Email",
    login_password: "Password",
    login_register: "Register on Witken",
    login_forgotten: "Forgotten password?",
    login_error_email: ' - <span class="error_m">Wrong email format</span>',
    login_error_password: ' - <span class="error_m">Wrong password</span>'
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