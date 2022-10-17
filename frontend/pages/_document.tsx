import { Html, Main, NextScript, Head } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<title>Music Events</title>
			</Head>
			<body>
				<Main />
				<NextScript />
				<div id="modal-root" />
			</body>
		</Html>
	)
}
