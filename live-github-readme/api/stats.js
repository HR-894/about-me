// Hum CommonJS syntax (module.exports) ka istemaal kar rahe hain
module.exports = async (request, response) => {

    // Abhi ka current time lo
    const date = new Date();
    const timeString = date.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    // --- Yahaan Asli Jaadu Hai (SVG Code) ---
    // Hum text-based image (SVG) bana rahe hain.
    const svg = `
    <svg width="300" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" rx="10" ry="10" fill="#282a36" />

        <text x="50%" y="30" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#f8f8f2">
            Server Time (IST)
        </text>

        <text x="50%" y="65" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="24" fill="#50fa7b" font-weight="bold">
            ${timeString}
        </text>
    </svg>
    `;
    // ------------------------------------------

    // Browser ko batao ki yeh ek image hai, text nahi!
    response.setHeader('Content-Type', 'image/svg+xml');
    // Cache ko disable karo, taaki har baar fresh data aaye
    response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');

    // Image bhej do
    response.status(200).send(svg);
};
