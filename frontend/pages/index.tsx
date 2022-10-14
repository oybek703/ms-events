import Layout from '@components/Layout'
import React from 'react'
import { GetStaticProps } from 'next'
import { IEvent } from '@interfaces/event.interface'
import axios from 'axios'
import { API_URL } from '@helpers/api'
import EventItem from '@components/EventItem'
import Link from 'next/link'
import { getEvents } from '@helpers/index'

const Home: React.FC<IHomeProps> = ({ events }) => {
	console.log(API_URL)
	return (
		<Layout>
			<h1 className="fw-bold my-3">Upcoming events</h1>
			{events.length === 0 ? <h3>No events</h3> : events.map((event) => <EventItem key={event.id} event={event} />)}
			{events.length > 0 && (
				<Link href={'/events'}>
					<a className="btn btn-outline-secondary mb-2">All events</a>
				</Link>
			)}
		</Layout>
	)
}

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
	const { data } = await axios.get(`${API_URL}/api/events`, {
		params: {
			pagination: {
				start: 0,
				limit: 2
			},
			populate: {
				image: '*'
			}
		}
	})
	const events = getEvents(data)
	return {
		props: {
			events
		}
	}
}

interface IHomeProps {
	events: IEvent[]
}

export default Home
