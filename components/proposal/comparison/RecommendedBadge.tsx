export default function RecommendedBadge() {
    return (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-pulse">
            <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-70 animate-ping"></div>
                <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-sm px-8 py-3 rounded-full shadow-2xl uppercase tracking-wider">
                    Recommended for you
                </div>
            </div>
        </div>
    );
}