import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { API_URL } from '@helpers/api'
import { serialize } from 'cookie'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { email, username, password } = req.body
			const { data } = await axios.post(`${API_URL}/api/auth/local/register`, { email, username, password })
			res.setHeader(
				'Set-Cookie',
				serialize('token', data.jwt, {
					path: '/',
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					maxAge: 60 * 60 * 24 * 7 // one week
				})
			)
			res.status(200).json({ user: data.user })
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
		res.setHeader('Allow', ['POST'])
		res.status(400).json({ message: ` Method ${req.method} is not allowed!` })
	}
}
