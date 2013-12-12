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
    default:
        console.log('problem with texts: ' + spl[0]);
        return "";
    }
}
var general = {
    general_decouvrez: "Learn more",
    general_registration: "Your profile",
    general_logout: "Logout",
    general_label: "Label",
    general_examen: "Examen",
    general_indexation: "Indexation",
    general_witken: "Witken",
    general_language_switch: "Francais",
    general_language_current: "English"
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

var label = {
    label_description: "Notre label vous permet d'ajouter un plus à votre image professionnelle, il vous permets d'améliorer votre employabilitée et de saisir de nouvelles opportunités en participant à différentes projets novateurs...",
    label_label_or: "Label d'or",
    label_label_or_description: "Avec plus de 98% de réussite aux 3 tests, nous vous decernerons un label d'or. Ce label szmbolisera votre haut potentiel intellectuel, émotionelle et votre capacité élevé à communiquer autout de vous.",
    label_label_silver: "Label d'argent",
    label_label_silver_description: "Blablabla argent blablabla",
    label_label_bronze: "Label de bronze",
    label_label_bronze_description: "Blablabla bronze blablabla"
}