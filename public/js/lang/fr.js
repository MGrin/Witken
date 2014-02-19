function getTextForId(text) {
    var spl = text.split('_');
    switch (spl[0]) {
        case 'general':
            return general[text];
            break;
        case 'header':
            return header[text];
            break;
        case 'footer':
            return footer[text];
            break;
        case 'index':
            return index[text];
            break;
        case 'label':
            return label[text];
        case 'examen':
            return examen[text];
        case 'profile':
            return profile[text];
        default:
            return "No text";
    }
}
var general = {
    general_decouvrez: "Découvrez",
    general_registration: "Votre profil",
    general_logout: "Logout",
    general_label: "Label",
    general_examen: "Examen",
    general_indexation: "Indexation",
    general_witken: "Witken",
    general_results: "Resultats",
    general_label_and_certificats: "Label & Certificats",
    general_messages: "Messages",
    general_compte: "Compte",
    general_language_switch: "English",
    general_language_current: "Francais"
};

var header = {
    header_label_description_text: "description",
    header_label_reconnaissance_text: "reconnaissance",
    header_examen_text: "inscription, <br/>date, lieu & prix",
    header_indexation_comment_text: "comment",
    header_indexation_pour_qui_text: "pour qui",
    header_witken_nous_text: "nous",
    header_witken_partenaires_text: "nos partenaires"
};

var footer = {
    footer_text: "Copyright 2014 witken.ch. tout droit réservé"
};

var profile = {
    profile_text_exam_1: "Votre examen est planifie pour le",
    profile_text_exam_time_morning: "de 8:30 a 12:30",
    profile_text_exam_time_afternoon: "de 13:30 a 16:30",
    profile_text_convocation: "Convocation",
    profile_text_horaires_detaile: "Horaires detaile",
    profile_text_terms: "Terms & conditions"
}
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