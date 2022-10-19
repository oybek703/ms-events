import React, { createContext, PropsWithChildren, useState } from 'react'

interface IAppContext {
	user: unknown
	error: string
	login: (user?: unknown) => void
	register: (user: unknown) => void
	logout: () => void
	checkUserLoggedIn: () => void
}

export const AuthContext = createContext<IAppContext>({
	user: null,
	error: '',
	logout: () => undefined,
	login: () => undefined,
	register: () => undefined,
	checkUserLoggedIn: () => undefined
})

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<null | object>(null)
	const [error, setError] = useState<string>('')

	// Login
	function login(user: unknown) {
		console.log(user)
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
		<AuthContext.Provider value={{ user, error, login, logout, register, checkUserLoggedIn }}>
			{children}
		</AuthContext.Provider>
	)
}
