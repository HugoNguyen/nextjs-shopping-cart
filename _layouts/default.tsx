import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

type DefaultLayoutProps = {
    children: React.ReactNode,
    title?: string,
    description?: string
}

export const DefaultLayout = (props: DefaultLayoutProps) => {
    return (<>
        <Head>
            <title>{props.title}</title>
            <meta name='description' content={props.description}/>
        </Head>
        <div className="grid-container">
            <header>
                <Link href="/">React Shopping Cart</Link><br />
                <Link href="/about">About</Link>
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                All right reserved
            </footer>
        </div>
    </>);
}