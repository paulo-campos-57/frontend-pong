import logoE from "../assets/logo-E.png";
import logoP from "../assets/logo-P.png";
import "./style/Footer.css";

export default function Footer() {
    return (
        <>
            <div className="footer-container">
                <img src={logoE} alt="Logo-Estela" className="logo-Estela" />
                <img src={logoP} alt="Logo-Paulo" className="logo-Paulo" />
            </div>
        </>
    );
}