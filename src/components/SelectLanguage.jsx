import { useState } from 'react';

export function SelectLanguage() {
    const currentLanguage = localStorage.getItem('shelby-Language');
    const [showSelector, setShowSelector] = useState(false);

    const onChangeSelect = (e) => {
        const selectedLanguage = e.target.innerText.toLowerCase();
        localStorage.setItem('shelby-Language', selectedLanguage);
        sessionStorage.clear();
        window.location.reload();
    }

    return (
        <div 
          className="SelectLanguage" 
          onMouseMove={() => setShowSelector(true)} 
          onMouseLeave={() => setShowSelector(false)}
        >
            <p className="selectedLanguage">{currentLanguage}</p>

            <div className={showSelector ? "dropdown activeSelectLang" : "dropdown"} onClick={onChangeSelect}>
                <p>en</p>
                <p>ru</p>
                <p>am</p>
            </div>
        </div>
    )
}
