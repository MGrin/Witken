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
    default:
        console.log('problem with texts: ' + spl[0]);
        return "";
    }
}
var general = {
    general_decouvrez: "Learn more",
    general_registration: "Registration",
    general_logout: "Logout",
    general_label: "Label",
    general_examen: "Examen",
    general_indexation: "Indexation",
    general_witken: "Witken",
    general_language_switch: "English",
    general_language_current: "Francais"
}; //9

var header = {
    header_label_description_text: "description",
    header_label_reconnaissance_text: "reconnaissance",
    header_examen_text: "inscription, <br/>date, lieu & prix",
    header_indexation_comment_text: "comment",
    header_indexation_pour_qui_text: "pour qui",
    header_witken_nous_text: "we are",
    header_witken_partenaires_text: "nos partenaires"
}; //7

var footer = {
    footer_partenaires_title: "Nos partenaires"
}; //1

var index = {
    index_slide1_title: "Label de haut potentiel",
    index_slide1_text: "Boostez vos neurones en passant l'examen<br />et obtenez un label certificat...",
    index_footer1_title: "Verifier un label",
    index_footer1_text: "Vous etes une enterprise qui souhaite engager un nouveau collaborateur? <br /><br /> Verifiez son numero d'authencite"
}; //4