import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import styles from '@styles/Layout.module.css'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Showcase from '@components/Showcase'
import { useRouter } from 'next/router'

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
	const { pathname } = useRouter()
	return (
		<div className={styles.layout}>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header />
			{pathname === '/' && <Showcase />}
			<main className="container my-3">{children}</main>
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
