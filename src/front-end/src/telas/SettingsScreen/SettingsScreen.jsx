import React, { useState } from 'react';
import './SettingsScreen.css';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';

const SettingsScreen = () => {
    // Estados para os checkboxes
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    const handleNotificationChange = (event) => {
        setNotificationsEnabled(event.target.checked);
        // Aqui você pode adicionar lógica para salvar a preferência do usuário,
        // por exemplo, em localStorage ou enviar para um backend.
        console.log('Notificações ativadas:', event.target.checked);
    };

    const handleDarkModeChange = (event) => {
        setDarkModeEnabled(event.target.checked);
        // Para o Dark Mode, você pode adicionar a lógica de ativação aqui,
        // ou apenas exibir a mensagem de "em teste".
        console.log('Dark Mode ativado:', event.target.checked);
    };

    return (
        <>
            <Header toggleAddressModal={() => { }} />
            <main className="settings-container">
                <h1 className="settings-title">Configurações</h1>

                <div className="settings-card">
                    <div className="setting-item">
                        <label className="setting-label" htmlFor="notification-toggle">
                            Ativar Notificações
                        </label>
                        <input
                            type="checkbox"
                            id="notification-toggle"
                            checked={notificationsEnabled}
                            onChange={handleNotificationChange}
                            className="toggle-switch"
                        />
                    </div>

                    <div className="setting-item">
                        <div className="dark-mode-container">
                            <label className="setting-label" htmlFor="dark-mode-toggle">
                                Dark Mode
                            </label>
                            <input
                                type="checkbox"
                                id="dark-mode-toggle"
                                checked={darkModeEnabled}
                                onChange={handleDarkModeChange}
                                className="toggle-switch"
                            />
                        </div>
                        <p className="dark-mode-info">
                            (Este modo ainda não foi implementado e está em fase de teste.)
                        </p>
                    </div>

                    {/* Você pode adicionar mais itens de configuração aqui */}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SettingsScreen;