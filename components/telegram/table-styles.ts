import { tv } from 'tailwind-variants';

export const table = tv({
    slots: {
        base: 'w-full border-collapse',
        wrapper: 'relative overflow-x-auto rounded-2xl bg-neutral-900/50 border border-white/10 backdrop-blur-sm',
        table: 'w-full text-sm text-left',
        thead: 'text-xs uppercase bg-neutral-800/50 border-b border-white/10',
        tbody: 'divide-y divide-white/10',
        tr: 'hover:bg-white/5 transition-colors',
        th: 'px-6 py-4 font-semibold text-white/90',
        td: 'px-6 py-4 text-white/70',
        emptyWrapper: 'text-center py-12 text-white/50',
        selectedRow: 'bg-[#FF595E]/10 border-l-2 border-[#FF595E]',
    }
});

export const pagination = tv({
    slots: {
        wrapper: 'flex items-center justify-center gap-2 mt-4',
        button: 'px-4 py-2 rounded-lg border border-white/10 bg-neutral-800/50 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white/90',
        activeButton: 'bg-[#FF595E] border-[#FF595E] text-white hover:bg-[#FF595E]/90',
        pageInfo: 'text-sm text-white/70 px-4',
    }
});

export const checkbox = tv({
    base: 'w-4 h-4 rounded border-2 border-white/20 bg-transparent checked:bg-[#FF595E] checked:border-[#FF595E] cursor-pointer transition-all',
});

export const searchInput = tv({
    base: 'px-4 py-2 rounded-lg bg-neutral-800/50 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FF595E]/50 focus:ring-1 focus:ring-[#FF595E]/50 transition-all',
});

export const button = tv({
    base: 'px-4 py-2 rounded-lg font-medium transition-all inline-flex items-center gap-2',
    variants: {
        variant: {
            primary: 'bg-[#FF595E] text-white hover:bg-[#FF595E]/90',
            danger: 'bg-red-600 text-white hover:bg-red-700',
            ghost: 'bg-transparent border border-white/10 text-white/90 hover:bg-white/5',
            icon: 'p-2 bg-transparent hover:bg-white/5 text-white/70 hover:text-white',
        },
        size: {
            sm: 'text-sm px-3 py-1.5',
            md: 'text-base px-4 py-2',
            lg: 'text-lg px-6 py-3',
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
    }
});

export const dropdown = tv({
    slots: {
        trigger: 'px-4 py-2 rounded-lg bg-neutral-800/50 border border-white/10 text-white/90 hover:bg-white/5 transition-all inline-flex items-center gap-2',
        menu: 'absolute z-50 mt-2 min-w-[200px] rounded-lg bg-neutral-900 border border-white/10 backdrop-blur-sm shadow-xl overflow-hidden',
        item: 'px-4 py-2 text-white/90 hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-2',
        selectedItem: 'bg-[#FF595E]/20 text-[#FF595E]',
    }
});
