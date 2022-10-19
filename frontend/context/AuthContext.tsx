import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'
import { NEXT_URL } from '@helpers/api'
import { useRouter } from 'next/router'
import { Routes } from '@components/Header'

interface IUser {
	email: string
	password: string
}

interface IUserLogin extends IUser {}

interface IUserRegister extends IUser {
	username: string
}

interface IAppContext {
	user: unknown
	error: string | null
	login: (user: IUserLogin) => Promise<void>
	register: (user: IUserRegister) => Promise<void>
	logout: () => Promise<void>
	checkUserLoggedIn: () => Promise<void>
	setError: Dispatch<SetStateAction<string | null>>
}

export const AuthContext = createContext<IAppContext>({
	user: null,
	error: '',
	logout: async () => undefined,
	login: async () => undefined,
	register: async () => undefined,
	checkUserLoggedIn: async () => undefined,
	setError: () => undefined
})

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<unknown>(null)
	const [error, setError] = useState<string | null>(null)
	const { push } = useRouter()

	// Login
	async function login(userData: IUserLogin) {
		try {
			const { email: identifier, password } = userData
			const { data } = await axios.post(`${NEXT_URL}/api/login`, { identifier, password })
			const { user } = data
			setUser(user)
			await push(Routes.dashboard)
		} catch (e: unknown) {
			if (e instanceof axios.AxiosError) {
				setError(e.response?.data.message)
			}
			console.log(e)
		}
	}

	// Register
	async function register(userData: IUserRegister) {
		try {
			const { username, email, password } = userData
			const { data } = await axios.post(`${NEXT_URL}/api/register`, { username, email, password })
			const { user } = data
			setUser(user)
			await push(Routes.dashboard)
		} catch (e: unknown) {
			if (e instanceof axios.AxiosError) {
				setError(e.response?.data.message)
			}
			console.log(e)
		}
	}

	// Logout
	async function logout() {
		try {
			await axios.post(`${NEXT_URL}/api/logout`)
			setUser(null)
			await push('/')
		} catch (e) {
			if (e instanceof axios.AxiosError) {
				console.log(e.message)
				setError(e.message)
			}
		}
	}

	// Check user logged in
	async function checkUserLoggedIn() {
		try {
			const { data } = await axios.get(`${NEXT_URL}/api/user`)
			setUser(data)
		} catch (e: unknown) {
			if (e instanceof axios.AxiosError) {
				console.log(e.message)
			}
		}
	}

	useEffect(function () {
		;(async () => await checkUserLoggedIn())()
	}, [])

	return (
		<AuthContext.Provider value={{ user, error, login, logout, register, checkUserLoggedIn, setError }}>
			{children}
		</AuthContext.Provider>
	)
}
