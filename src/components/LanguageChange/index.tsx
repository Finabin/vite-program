import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import i18n from 'i18next';
import { i18nAtom } from '../../stores/modules/i18nStore';
import { useAtom } from 'jotai';

export default function LanguageChange() {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <text onClick={() => {
                    setLanguage('简体中文');
                    i18n.changeLanguage('zh');
                }}>
                    简体中文
                </text>
            ),
        },
        {
            key: '2',
            label: (
                <text onClick={() => {
                    setLanguage('English');
                    i18n.changeLanguage('en');
                }}>
                    English
                </text>
            ),
        },
    ];

    const [language, setLanguage] = useAtom(i18nAtom);

    return (
        <Space direction="vertical">
            <Space wrap>
                <Dropdown menu={{ items }} placement="bottom">
                    <Button>{language}</Button>
                </Dropdown>
            </Space>
        </Space>
    )
};