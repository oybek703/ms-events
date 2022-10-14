import Layout from '@components/Layout'
import { IEvent } from '@interfaces/event.interface'
import React from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import axios from 'axios'
import { API_URL } from '@config/index'
import styles from '@styles/Event.module.css'
import Link from 'next/link'
import { FaPenAlt, FaTimes } from 'react-icons/fa'
import Image from 'next/image'

const Event: React.FC<IEventItemProps> = ({ event }) => {
	function handleDelete() {
		console.log('delete')
	}
	return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${event.slug}`}>
						<a>
							<FaPenAlt /> Edit Event
						</a>
					</Link>
					<a className={styles.delete} href="#" onClick={handleDelete}>
						<FaTimes /> Delete Event
					</a>
				</div>
				<span>
					{event.date} at {event.time}
				</span>
				<h1>{event.name}</h1>
				{event.image && (
					<div className={styles.image}>
						<Image alt={event.slug} src={event.image} width={960} height={600} />
					</div>
				)}
				<h3>Performers:</h3>
				<p>{event.performers}</p>
				<h3>Description:</h3>
				<p>{event.description}</p>
				<h3>Venue: {event.venue}</h3>
				<p>{event.address}</p>
				<Link href="/events">
					<a className={`${styles.back}`}>{'<'} Go Back</a>
				</Link>
			</div>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await axios.get(`${API_URL}/api/events`)
	const paths = data.events.map((event: IEvent) => ({ params: { slug: event.slug } }))
	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps<IEventItemProps> = async ({ params }: GetStaticPropsContext) => {
	if (!params) return { notFound: true }
	const { data } = await axios.get(`${API_URL}/api/events/${params.slug}`)
	if (JSON.stringify(data) === '{}') return { notFound: true }
	return {
		props: {
			event: data.events
		}
	}
}

interface IEventItemProps {
	event: IEvent
}

export default Event
