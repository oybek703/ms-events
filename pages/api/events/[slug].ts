import { IEvent } from '@interfaces/event.interface'
import type { NextApiRequest, NextApiResponse } from 'next'
import { events } from './data.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const msEvent = events.find((event: IEvent) => event.slug === req.query.slug)
		res.status(200).json({ events: msEvent })
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(405).json({ message: `Method ${req.method} is not allowed!` })
	}
}
