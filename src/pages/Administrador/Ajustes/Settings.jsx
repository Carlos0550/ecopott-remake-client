import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../Barra de navegacion/AdminNavbar';
import { useAppContext } from '../../../Context';
import { List, Switch, message, Space } from 'antd';

function Settings() {
    const { ajustes, updateSettings } = useAppContext();
    const [parsedSettings, setParsedSettings] = useState([]);
    console.log(parsedSettings)
    console.log(ajustes)
    useEffect(() => {
        if (ajustes && ajustes.length > 0) {
            setParsedSettings([JSON.parse(ajustes[0].settings)?.page_enabled]);
        }
    }, [ajustes]);

    const [updating, setUpdating] = useState(false);

    const handleSwitchChange = async (value) => {
        // const updatedSettings = {
        //     ...parsedSettings[0],
        //     [key]: value,
        // };
        // console.log(value)
        setUpdating(true);
        await updateSettings(value);
        setUpdating(false);
    };

    const settingsData = [
        {
            key: 'page_enabled',
            label: 'Habilitar página',
            value: parsedSettings[0]?.page_enabled || false,
            description: 'Controla si la página está habilitada o deshabilitada',
        },
        
    ];

    return (
        <>
            <AdminNavbar />
            <div className="container__wrapper">
                <h1 className="title">Ajustes</h1>

                <List
                    itemLayout="vertical"
                    dataSource={settingsData}
                    style={{minWidth:"100%"}}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.label}
                                description={item.description}
                            />
                            <Space>
                                <span>{item.value ? 'Habilitado' : 'Deshabilitado'}</span>
                                <Switch
                                    checked={item.value}
                                    loading={updating}
                                    onChange={(value) => handleSwitchChange(value)}
                                />
                            </Space>
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
}

export default Settings;
