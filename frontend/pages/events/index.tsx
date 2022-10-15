import Layout from '@components/Layout'
import { GetStaticProps } from 'next'
import { IEvent } from '@interfaces/event.interface'
import axios from 'axios'
import { API_URL } from '@helpers/api'
import React, { PropsWithChildren } from 'react'
import EventItem from '@components/EventItem'
import { getEvents } from '@helpers/index'

const Events: React.FC<PropsWithChildren<IEventsProps>> = ({ events }) => {
	return (
		<Layout title="My Events">
			<h1 className="my-3 fw-bold">Events</h1>
			{events.length === 0 ? <h3>No events</h3> : events.map(event => <EventItem key={event.id} event={event} />)}
		</Layout>
	)
}

export const getStaticProps: GetStaticProps<IEventsProps> = async () => {
	const { data } = await axios.get(`${API_URL}/api/events`, {
		params: {
			pagination: {
				start: 0,
				limit: 10
			},
			populate: {
				image: '*'
			}
		}
	})
	const events = getEvents(data)
	return {
		props: {
			events: events ?? []
		}
	}
}

interface IEventsProps {
	events: IEvent[]
}

export default Events
