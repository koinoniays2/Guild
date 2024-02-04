import React from 'react'

export default function StatLayoutLayout({ children }) {
    return (
        <div className="w-1/2 flex flex-col py-1">
            {children}
        </div>
    )
}
