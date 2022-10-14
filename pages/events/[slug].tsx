import Layout from '@components/Layout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { IEvent } from '@interfaces/event.interface'
import React from 'react'
import axios from 'axios'
import { API_URL } from '@config/index'

const EvenItem: React.FC<IEventItemProps> = ({ event }) => {
	return (
		<Layout>
			<h1 className="fw-bold text-center mt-3">{event.slug}</h1>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
	const { data } = await axios.get(`${API_URL}/api/events/${query.slug}`)
	return {
		props: {
			event: data.events
		}
	}
}

interface IEventItemProps {
	event: IEvent
}

export default EvenItem
