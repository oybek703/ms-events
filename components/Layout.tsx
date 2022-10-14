import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'

interface ILayout {
	title?: string
	description?: string
	keywords?: string
}

const Layout: React.FC<PropsWithChildren<ILayout>> = ({
	title,
	keywords,
	children,
	description
}: PropsWithChildren<ILayout>) => {
	return (
		<div className={styles.layout}>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header />
			<main className="container">{children}</main>
			<Footer />
		</div>
	)
}

Layout.defaultProps = {
	keywords: 'music, events, dj',
	title: 'Find best music parties!',
	description: 'Latest musical events'
}

export default Layout
