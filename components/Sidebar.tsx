/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import JavascriptIcon from '@/assets/icons/JavascriptIcon';
import AndroidIcon from '@/assets/icons/AndroidIcon';
import IosIcon from '@/assets/icons/IosIcon';
import ServerIcon from '@/assets/icons/ServerIcon';
import FlutterIcon from '@/assets/FlutterIcon';
import { Listbox } from '@headlessui/react';
import ReactIcon from '@/assets/icons/ReactIcon';

type NavRoute = {
    url: string;
    title: string;
};

interface Props {
    menu: boolean;
    nav: Record<string, Record<string, NavRoute>>;
}

const Sidebar: React.FC<Props> = ({ nav, menu }) => {
    const router = useRouter();
    const menuItem = [
        { link: '/android/v2/foundation/Basics', name: 'Android', icon: <AndroidIcon /> },
        { link: '/ios/v2/foundation/Basics', name: 'iOS', icon: <IosIcon /> },
        { link: '/javascript/v2/foundation/basics', name: 'JavaScript', icon: <JavascriptIcon /> },
        { link: '/react-native/v2/foundation/basics', name: 'React-Native', icon: <ReactIcon /> },
        { link: '/flutter/v2/foundation/basics', name: 'Flutter', icon: <FlutterIcon /> },
        { link: '/server-side/v2/foundation/basics', name: 'Server-Side', icon: <ServerIcon /> }
    ];
    // @ts-ignore
    let indexOf = menuItem.findIndex((e) => e.name.toLowerCase() === router.query.slug[0]);
    // @ts-ignore
    if (router.query.slug[0] === 'api-reference') {
        // @ts-ignore
        indexOf = menuItem.findIndex((e) => e.name.toLowerCase() === router.query.slug[1]);
    }
    indexOf = indexOf === -1 ? 0 : indexOf;
    const [tech, setTech] = React.useState(menuItem[indexOf]);
    const changeTech = (s) => {
        setTech(s);
        // @ts-ignore
        if (router.query.slug[0] === 'api-reference') {
            // @ts-ignore
            router.push(`/api-reference/${s.name.toLowerCase()}/v2/home/content`, undefined, {
                shallow: false
            });
        } else {
            router.push(s.link, undefined, { shallow: false });
        }
    };
    const aliasMenu = [
        {
            title: 'Room',
            url: '/server-side/v2/features/room'
        },
        {
            title: 'Webhook',
            url: '/server-side/v2/foundation/webhook'
        },
        {
            title: 'SFU Recording',
            url: '/server-side/v2/features/recording'
        },
        {
            title: 'Simulcast',
            url: '/server-side/v2/features/simulcast'
        }
    ];
    return (
        <div className="ctx">
            {/* Sidebar Version Section */}
            <section className="menu-container">
                <div className="menu-title">TECHNOLOGY</div>
                <Listbox value={tech} onChange={changeTech}>
                    <Listbox.Button className="dropdown">
                        <div style={{ display: 'flex ', alignItems: 'center' }}>
                            {tech.icon} <span style={{ marginLeft: '1rem' }}>{tech.name}</span>
                        </div>
                        <ChevronDown />{' '}
                    </Listbox.Button>
                    <Listbox.Options className="dropdown-options">
                        {menuItem.map((m) => (
                            <Listbox.Option
                                key={m.link}
                                value={m}
                                className={({ active }) =>
                                    `${
                                        active
                                            ? 'dropdown-option dropdown-option-active'
                                            : 'dropdown-option'
                                    }`
                                }>
                                {m.icon} <span style={{ marginLeft: '1rem' }}>{m.name}</span>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>
            </section>
            {/* Sidebar Menu Section */}
            {Object.entries(nav).map(([key, children], index) => (
                <section className="menu-container" key={`${key}-${index}`}>
                    <div className="menu-title">{key.replace(/-/g, ' ').toUpperCase()}</div>
                    {Object.entries(children).map(([_, route]) =>
                        Object.prototype.hasOwnProperty.call(route, 'title') ? (
                            <Link href={route.url || ''} key={`${route.url}-${index}`}>
                                <div
                                    className={`menu-item ${
                                        route.url === router.asPath ? 'active-link' : ''
                                    }`}>
                                    {route.title}
                                </div>
                            </Link>
                        ) : null
                    )}
                    {/* @ts-ignore */}
                    {key === 'features' && router.query.slug[0] !== 'server-side' ? (
                        <>
                            {aliasMenu.map((a) => (
                                <Link href={a.url} key={a.url}>
                                    <div
                                        className={`menu-item ${
                                            a.url === router.asPath ? 'active-link' : ''
                                        }`}>
                                        {a.title}
                                    </div>
                                </Link>
                            ))}
                        </>
                    ) : null}
                </section>
            ))}
            <style jsx>{`
                .ctx {
                    width: calc((100% - 1448px) / 2 + 298px);
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    height: calc(100vh - 80px);
                    min-width: 298px;
                    overflow-y: scroll;
                    top: ${menu ? '10px' : '80px'};
                    left: 0;
                    position: ${menu ? 'absolute' : 'sticky'};
                    background: var(--gray1);
                    z-index: 40;
                }
                ::-webkit-scrollbar {
                    width: 0px;
                }
                ::-webkit-scrollbar-thumb {
                    outline: 0px;
                }
                .menu-container {
                    margin: 10px 0;
                }
                .menu-item {
                    cursor: pointer;
                    padding: 8px 0;
                    color: var(--gray11);
                    font-weight: 400;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    padding-left: 20px;
                }
                .sub-title {
                    padding-left: 30px;
                    font-weight: 700;
                    font-size: 12px;
                    margin-top: 20px;
                    margin-bottom: 5px;
                }
                .sub-menu-item {
                    cursor: pointer;
                    padding: 8px 0;
                    color: var(--gray11);
                    font-weight: 400;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    padding-left: 30px;
                }

                a {
                    text-decoration: none;
                }
                .active-link {
                    color: var(--gray12);
                    background-color: var(--blue6);
                }
                .menu-item:hover {
                    background-color: var(--blue5);
                }
                }
                .sub-menu-item:hover {
                    background-color: var(--blue5);
                }
                .menu-title {
                    padding-left: 20px;
                    font-weight: 700;
                    font-size: 15px;
                    margin: 5px 0;
                }
                @media screen and (max-width: 1000px) {
                    .ctx {
                        display: ${menu ? 'flex' : 'none'};
                        top:20px;
                    }
                    :global(.page) {
                        height: ${menu ? '100vh !important' : ''};
                        overflow: ${menu ? 'hidden !important' : ''};
                        padding-right: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Sidebar;

const ChevronDown = () => (
    <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        style={{ color: 'var(--gray10)' }}>
        <path d="M6 9l6 6 6-6" />
    </svg>
);
