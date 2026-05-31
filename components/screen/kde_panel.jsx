import React from 'react';
import Clock from '../util components/clock';
import Status from '../util components/status';
import ReactGA from 'react-ga4';

export default function KdePanel(props) {
    return (
        <div className="absolute w-full h-12 bottom-0 left-0 bg-ub-grey shadow-md flex justify-between items-center z-50 text-white select-none border-t border-gray-700">
            {/* Start Menu Button */}
            <div 
                className="h-full px-4 flex justify-center items-center hover:bg-white hover:bg-opacity-10 cursor-pointer"
                onClick={() => {
                    ReactGA.event({
                        category: `KDE Panel`,
                        action: `Opened Start Menu`
                    });
                    props.showAllApps();
                }}
            >
                <img src="/themes/Yaru/status/arch_logo.svg" alt="Arch Menu" className="h-6 w-6" />
            </div>

            {/* Taskbar Apps Area (Simplified) */}
            <div className="flex-1 h-full flex justify-start items-center px-2">
                {Object.keys(props.closed_windows).map((appId, index) => {
                    if (!props.closed_windows[appId]) {
                        return (
                            <div 
                                key={index} 
                                className={`h-full w-12 flex justify-center items-center hover:bg-white hover:bg-opacity-10 cursor-pointer ${props.focused_windows[appId] ? 'border-b-2 border-ub-orange bg-white bg-opacity-10' : ''}`}
                                onClick={() => props.openAppByAppId(appId)}
                            >
                                <img 
                                    className="w-6 h-6" 
                                    src={props.apps.find(app => app.id === appId)?.icon} 
                                    alt={appId} 
                                />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* System Tray */}
            <div className="h-full flex justify-end items-center pr-2">
                <Status />
                <div className="mx-2 hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded cursor-pointer">
                    <Clock />
                </div>
                <div 
                    className="h-full px-2 flex justify-center items-center hover:bg-white hover:bg-opacity-10 cursor-pointer"
                    onClick={props.shutDown}
                >
                    <img src="/themes/Yaru/status/power-button.svg" alt="Power" className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
}
