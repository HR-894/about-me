// node-fetch ko import karo (CommonJS syntax)
const fetch = require('node-fetch');

module.exports = async (request, response) => {

    // Aapka GitHub username
    const username = "HR-894";
    let followers = "N/A";
    let repos = "N/A";

    try {
        // GitHub API se data fetch karo
        const githubResponse = await fetch(`https://api.github.com/users/${username}`);
        
        if (githubResponse.ok) {
            const data = await githubResponse.json();
            followers = data.followers;
            repos = data.public_repos;
        }
    } catch (e) {
        // Agar fail ho toh console mein error dikhao
        console.error(e);
    }

    // --- Naya SVG Code ---
    const svg = `
    <svg width="350" height="150" xmlns="http://www.w3.org/2000/svg">
        <style>
            .container {
                border: 2px solid #6272a4;
                border-radius: 10px;
                background-color: #282a36;
                width: 100%;
                height: 100%;
            }
            .text { font-family: 'Segoe UI', sans-serif; fill: #f8f8f2; }
            .title { font-size: 18px; font-weight: 600; }
            .stat { font-size: 14px; }
            .value { font-size: 20px; font-weight: 700; fill: #bd93f9; }
        </style>
        
        <rect class="container" />
        
        <text x="50%" y="30" dominant-baseline="middle" text-anchor="middle" class="text title">
            @${username}'s Live Stats
        </text>
        
        <text x="30%" y="70" dominant-baseline="middle" text-anchor="middle" class="text stat">
            Public Repos
        </text>
        <text x="30%" y="100" dominant-baseline="middle" text-anchor="middle" class="text value">
            ${repos}
        </text>
        
        <text x="70%" y="70" dominant-baseline="middle" text-anchor="middle" class="text stat">
            Followers
        </text>
        <text x="70%" y="100" dominant-baseline="middle" text-anchor="middle" class="text value">
            ${followers}
        </text>
    </svg>
    `;
    // ---------------------

    response.setHeader('Content-Type', 'image/svg+xml');
    // API rate limit hit na ho, isliye 1 ghante ke liye cache karo
    response.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=1800');

    response.status(200).send(svg);
};
