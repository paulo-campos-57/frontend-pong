import GameLobby from '../components/GameLobby';
import './style/Index.css';

export default function Index() {
    return (
        <>
            <div className="container">
                <h1>Bem vindo ao Pong!</h1>
                <GameLobby />
            </div>
        </>
    );
}