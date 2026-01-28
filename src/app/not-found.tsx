export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Not Found</h2>
            <p className="text-xl mb-6" style={{ color: 'var(--text-secondary)' }}>Could not find requested resource</p>
            <a
                href="/"
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{
                    backgroundColor: 'var(--accent-color)',
                    color: '#ffffff'
                }}
            >
                Return Home
            </a>
        </div>
    );
}
