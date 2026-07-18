"use client";


export function MenuToggle({ isOpen, }: { isOpen: boolean }) {

    return (
        <>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </>
    );
}

function MenuIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}
