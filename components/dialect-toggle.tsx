'use client'

import Image from 'next/image'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useDialect, type WolofDialectMode } from '@/context/dialect-context'
import { cn } from '@/lib/utils'

const flagSource = {
    senegal: { src: '/sn.svg', alt: 'Senegal flag' },
    gambia: { src: '/gm.svg', alt: 'Gambia flag' }
} as const

type FlagKey = keyof typeof flagSource

const modes: WolofDialectMode[] = ['both', 'senegal', 'gambia']

const labels: Record<WolofDialectMode, string> = {
    both: 'Show both dialects',
    senegal: 'Show Senegalese Wolof',
    gambia: 'Show Gambian Wolof'
}

const clipPaths = {
    left: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
    right: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
}

function SingleFlagIcon({ flag }: { flag: FlagKey }) {
    const { alt, src } = flagSource[flag]
    return (
        <div className="relative h-5 w-7 overflow-hidden rounded-[3px] border border-border">
            <Image alt={alt} className="h-full w-full object-cover" height={20} sizes="28px" src={src} width={28} />
        </div>
    )
}

function BothFlagIcon() {
    return (
        <div className="relative h-5 w-7 overflow-hidden rounded-[3px] border border-border">
            <Image
                alt="Senegal flag"
                className="absolute inset-0 h-full w-full object-cover"
                height={20}
                sizes="28px"
                src={flagSource.senegal.src}
                style={{ clipPath: clipPaths.left }}
                width={28}
            />
            <Image
                alt="Gambia flag"
                className="absolute inset-0 h-full w-full object-cover"
                height={20}
                sizes="28px"
                src={flagSource.gambia.src}
                style={{ clipPath: clipPaths.right }}
                width={28}
            />
            <div className="absolute inset-0">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
            </div>
        </div>
    )
}

function FlagIcon({ mode }: { mode: WolofDialectMode }) {
    if (mode === 'both') {
        return <BothFlagIcon />
    }
    const flag = mode === 'senegal' ? 'senegal' : 'gambia'
    return <SingleFlagIcon flag={flag} />
}

export function DialectToggle() {
    const { mode, setMode } = useDialect()
    const currentMode: WolofDialectMode = modes.includes(mode) ? mode : 'both'
    const nextMode = modes[(modes.indexOf(currentMode) + 1) % modes.length]

    const handleToggle = () => {
        setMode(nextMode)
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    aria-label={labels[currentMode]}
                    className={cn(
                        'inline-flex h-9 w-9 items-center justify-center rounded-full border text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                        currentMode === 'both' ? 'border-border bg-muted/60' : 'border-primary bg-primary/10 shadow-sm'
                    )}
                    onClick={handleToggle}
                    type="button"
                >
                    <FlagIcon mode={currentMode} />
                </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{labels[currentMode]}</TooltipContent>
        </Tooltip>
    )
}
