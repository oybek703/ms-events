import React, { PropsWithChildren, useEffect, useState, MouseEvent } from 'react'
import styles from '@styles/Modal.module.css'
import { FaTimes } from 'react-icons/fa'
import { createPortal } from 'react-dom'

interface IModalProps {
	title?: string
	show: boolean
	onClose: () => void
}

const Modal: React.FC<PropsWithChildren<IModalProps>> = ({ title, onClose, children, show }) => {
	const [isBrowser, setIsBrowser] = useState<boolean>(false)
	useEffect(function () {
		setIsBrowser(true)
	}, [])

	function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		event.preventDefault()
		onClose()
	}

	const modalRoot = isBrowser ? document.getElementById('modal-root') : null

	const modalContent: JSX.Element | null = show ? (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<a href="#" onClick={handleClick}>
						<FaTimes />
					</a>
				</div>
				{title && <div>{title}</div>}
				<div className={styles.body}>{children}</div>
			</div>
		</div>
	) : null
	return isBrowser ? createPortal(modalContent, modalRoot as Element) : null
}

export default Modal
