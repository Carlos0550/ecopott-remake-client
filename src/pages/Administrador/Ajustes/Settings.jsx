import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../Barra de navegacion/AdminNavbar';
import { useAppContext } from '../../../Context';
import { Space, Switch, Table, message } from 'antd';

function Settings() {
    const { ajustes, updateSettings } = useAppContext();
    const [parsedSettings, setParsedSettings] = useState([]);

    useEffect(() => {
        if (ajustes && ajustes.length > 0) {
            setParsedSettings([JSON.parse(ajustes[0].settings)]);
        }
    }, [ajustes]);

    const [updating, setUpdating] = useState(false);
    const handleSwitchChange = async (key, value) => {
        const updatedSettings = {
            ...parsedSettings[0],
            [key]: value,
        };
        setUpdating(true)
        await updateSettings(updatedSettings)
        setUpdating(false)
    };

    const tableSetting = [
        {
            key: "1",
            title: "Habilitar página",
            render: (_, record) => (
                <>
                    <Space>
                        <span>{record.page_enabled ? "Habilitado" : "Deshabilitado"}</span>
                        <Switch 
                            checked={record.page_enabled} 
                            loading={updating}
                            onChange={(value) => handleSwitchChange('page_enabled', value)} 
                        />
                    </Space>
                </>
            ),
        },
        {
            key: "2",
            title: "Notificaciones de compra",
            render: (_, record) => (
                <>
                    <Space>
                        <span>{record.notificaciones ? "Habilitado" : "Deshabilitado"}</span>
                        <Switch 
                            checked={record.notificaciones} 
                            onChange={(value) => handleSwitchChange('notificaciones', value)} 
                        />
                    </Space>
                </>
            ),
        },
    ];

    return (
        <>
            <AdminNavbar />
            <div className='container__wrapper'>
                <h1 className='title'>Ajustes</h1>

                <Table
                    columns={tableSetting}
                    dataSource={parsedSettings}
                    pagination={false}
                    rowKey="key"
                    scroll={{x:500}}
                />
            </div>
        </>
    );
}

export default Settings;
