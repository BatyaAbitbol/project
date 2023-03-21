import React from 'react';
import { TabMenu } from 'primereact/tabmenu';

export default function Home() {
  const items = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    { label: 'Courses', icon: 'pi pi-bookmark' },
    { label: 'Tests', icon: 'pi pi-fw pi-pencil' },
    { label: 'Tasks', icon: 'pi pi-fw pi-file' },
    // { label: 'Sign In', icon: 'pi pi-user' }
  ];

  return (
    <div className="card">
      <TabMenu model={items} />
    </div>
  );
}
/*

import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

export default function TemplateDemo() {
    const items = [
        {
            label: 'Courses',
            icon: 'pi pi-bookmark',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    // items: [
                    //     {
                    //         label: 'Bookmark',
                    //         icon: 'pi pi-fw pi-bookmark'
                    //     },
                    //     {
                    //         label: 'Video',
                    //         icon: 'pi pi-fw pi-video'
                    //     },

                    // ]
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash'
                },
                {
                    separator: true
                }
            ]
        },
        {
            label: 'Tests',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus'
                },
                {
                    label: 'View Tests',
                    icon: 'pi pi-eye'
                },
                {
                    label: 'Check',
                    icon: 'pi pi-check-circle'
                }

            ]
        },
        {
            label: 'Students',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'View List',
                    icon: 'pi pi-list',

                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archive',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" className="w-full" />;

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}
        
*/