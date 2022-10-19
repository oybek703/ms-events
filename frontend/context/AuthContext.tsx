import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import axios from 'axios'
import { NEXT_URL } from '@helpers/api'

interface IUserLogin {
	email: string
	password: string
}

interface IAppContext {
	user: unknown
	error: string | null
	login: (user: IUserLogin) => Promise<void>
	register: (user: unknown) => void
	logout: () => void
	checkUserLoggedIn: () => void
	setError: Dispatch<SetStateAction<string | null>>
}

export const AuthContext = createContext<IAppContext>({
	user: null,
	error: '',
	logout: () => undefined,
	login: async () => undefined,
	register: () => undefined,
	checkUserLoggedIn: () => undefined,
	setError: () => undefined
})

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<unknown>(null)
	const [error, setError] = useState<string | null>(null)

	// Login
	async function login(userData: IUserLogin) {
		try {
			const { email: identifier, password } = userData
			const { data } = await axios.post(`${NEXT_URL}/api/login`, { identifier, password })
			const { user } = data
			setUser(user)
		} catch (e: unknown) {
			if (e instanceof axios.AxiosError) {
				setError(e.response?.data.message)
			}
			console.log(e)
		}
	}

	// Register
	function register(user: unknown) {
		console.log(user)
	}

	// Logout
	function logout() {
		console.log('logout')
	}

	// Check user logged in
	function checkUserLoggedIn() {
		console.log('check')
	}

	return (
		<AuthContext.Provider value={{ user, error, login, logout, register, checkUserLoggedIn, setError }}>
			{children}
		</AuthContext.Provider>
	)
}
