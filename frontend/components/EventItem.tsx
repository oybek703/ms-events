import styles from '@styles/EventItem.module.css'
import { IEvent } from '@interfaces/event.interface'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const EventItem: React.FC<{ event: IEvent }> = ({ event }) => {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image alt={event.slug} src={event.image ?? '/images/event-default.png'} width={170} height={100} />
			</div>
			<div className={styles.info}>
				<span>
					<>{new Date(event.date).toLocaleDateString()}</> at {event.time}
				</span>
				<h3>{event.name}</h3>
			</div>
			<div className={styles.link}>
				<Link href={`/events/${event.slug}`}>
					<a className="btn btn-outline-success">Details</a>
				</Link>
			</div>
		</div>
	)
}

export default EventItem
