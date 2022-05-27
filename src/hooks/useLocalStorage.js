import { useState, useEffect } from 'react'

export const useLocalStorage = (key, defaultvalue) => {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof defaultvalue === 'function') {
            return defaultvalue()
        } else {
            return defaultvalue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]

}