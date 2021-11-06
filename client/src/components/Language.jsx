export default function Language(props) {
    return (
        <select value={props.selectedLang} onChange={props.handleChange}>
            <option value='EN-US'>English</option>
            <option value='FR-FR'>Français</option>
            <option value='DE-DE'>Dutch</option>
            <option value='RU-RU'>Russian</option>
            <option value='PL-PL'>Polish</option>
            <option value='ES-ES'>Spanish</option>
            <option value='PT-BR'>Portugese</option>
            <option value='ZH-CN'>Chinese</option>
            <option value='KO-KR'>Korean</option>
        </select>
    )
}