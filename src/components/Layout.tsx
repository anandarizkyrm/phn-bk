import Head from 'next/head'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = (props: Props) => {
    const { children } = props
    return (
        <>
            <Head>
                <title>Phone Book</title>
                <meta name="description" content="Phone book app" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{children}</main>
        </>
    )
}

export default Layout