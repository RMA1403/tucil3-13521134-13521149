import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({children, className, ...props}: ButtonProps): JSX.Element {
    return (
        <button
            className={clsx("px-6 py-2 text-xl shadow-md rounded-md text-center bg-[#94C5CC] hover:bg-[#8DBBC2] active:bg-[#87B4BA] hover:cursor-pointer", className !== undefined && className)}
            {...props}
        >
            {children}
        </button>
    );
}
