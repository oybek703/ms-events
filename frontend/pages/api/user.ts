import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { API_URL } from '@helpers/api'
import { parse } from 'cookie'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			if (!req.headers.cookie) return
			const { token } = parse(req.headers.cookie)
			const { data } = await axios.get(`${API_URL}/api/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			res.status(200).json(data)
		} catch (e: unknown) {
			let errorMessage = 'Internal server error!'
			if (e instanceof axios.AxiosError) {
				console.log(e.response?.data)
				errorMessage = e.response?.data.error.message
			}
			console.log(errorMessage)
			res.status(500).json({ message: errorMessage })
		}
	} else {
		res.setHeader('Allow', ['GET'])
		res.status(400).json({ message: ` Method ${req.method} is not allowed!` })
	}
}
