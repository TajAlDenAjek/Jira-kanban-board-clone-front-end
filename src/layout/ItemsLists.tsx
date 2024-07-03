import { MenuProps } from 'antd'
import { SettingOutlined, FileAddOutlined, ProjectOutlined, CodeOutlined, PlusOutlined, BarChartOutlined, HddOutlined } from '@ant-design/icons';
import React from 'react'

export const navBarList: MenuProps['items'] = ['Your work', 'Filters', 'Dashboards', 'Teams', 'Plans', 'Apps'].map((key, index) => ({
    key,
    label: `${key}`,

    items: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
            key: subKey,
            label: 'subKey',
        }
    })
}));

export const sideBarList: MenuProps['items'] = [
    {
        label: 'PLANNING',
        key: 'planning',
        children: [
            {
                key: 'planSub1',
                label: 'TimeLine',
                icon: React.createElement(HddOutlined)
            },
            {
                key: 'planSub2',
                label: 'Board',
                icon: React.createElement(BarChartOutlined)
            },
        ]
    },
    {
        label: 'Add view',
        key: 'addView',
        icon: React.createElement(PlusOutlined),
    },
    {
        label: 'DEVELOPMENT',
        key: 'development',
        children: [
            {
                key: 'devsub1',
                label: 'Code',
                icon: React.createElement(CodeOutlined),
            },
        ]
    },
    {
        key: 'projectPages',
        label: 'Project pages',
        icon: React.createElement(ProjectOutlined),
    },
    {
        key: 'addshortcut',
        label: 'Add shortcut',
        icon: React.createElement(FileAddOutlined),
    },
    {
        key: 'projectsettings',
        label: 'Project settings',
        icon: React.createElement(SettingOutlined),
    },
];


