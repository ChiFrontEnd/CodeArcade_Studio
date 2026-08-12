const fs = require('fs');
const path = require('path');

const REPOS = ['your-username/repo-one', 'your-username/repo-two']; // Change to your actual repositories
const TOKEN = process.env.GITHUB_TOKEN;

const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'GitHub-Stats-Dashboard'
};

async function fetchGitHub(endpoint) {
    const res = await fetch(`https://api.github.com/repos/${endpoint}`, { headers });
    if (!res.ok) {
        console.error(`Failed to fetch ${endpoint}: ${res.statusText}`);
        return null;
    }
    return res.json();
}

async function collectData() {
    const currentData = { repos: {} };
    const today = new Date().toISOString().split('T')[0];

    for (const repoPath of REPOS) {
        const repoKey = repoPath.split('/')[1]; // e.g., "repo-one"

        // 1. Fetch general repository info (stars, forks, open issues)
        const repoInfo = await fetchGitHub(repoPath);
        if (!repoInfo) continue;

        // 2. Fetch traffic views (14-day window)
        const viewsData = await fetchGitHub(`${repoPath}/traffic/views`) || { views: [], count: 0, uniques: 0 };

        // 3. Fetch traffic clones (14-day window)
        const clonesData = await fetchGitHub(`${repoPath}/traffic/clones`) || { clones: [], count: 0, uniques: 0 };

        // 4. Fetch releases and calculate total downloads
        const releasesInfo = await fetchGitHub(`${repoPath}/releases`) || [];
        let totalDownloads = 0;
        const releases = releasesInfo.map(r => {
            const downloadCount = r.assets.reduce((acc, asset) => acc + asset.download_count, 0);
            totalDownloads += downloadCount;
            return {
                tag: r.tag_name,
                name: r.name,
                published: r.published_at,
                downloads: downloadCount,
                prerelease: r.prerelease
            };
        });

        currentData.repos[repoKey] = {
            stars: repoInfo.stargazers_count,
            forks: repoInfo.forks_count,
            open_issues: repoInfo.open_issues_count,
            visitors_14d: viewsData.uniques || 0,
            views_14d: viewsData.count || 0,
            cloners_14d: clonesData.uniques || 0,
            clones_14d: clonesData.count || 0,
            total_downloads: totalDownloads,
            daily_views: viewsData.views || [],
            daily_clones: clonesData.clones || [],
            releases: releases
        };
    }

    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save current.json
    fs.writeFileSync(path.join(dataDir, 'current.json'), JSON.stringify(currentData, null, 2));

    // Update history.json (Append today's snapshot for time-series charts)
    const historyPath = path.join(dataDir, 'history.json');
    let history = [];
    if (fs.existsSync(historyPath)) {
        history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    }

    // Build history entry for today
    const historyEntry = { date: today };
    for (const [repoKey, data] of Object.entries(currentData.repos)) {
        historyEntry[repoKey] = {
            stars: data.stars,
            total_downloads: data.total_downloads
        };
    }

    // Remove existing entry for today if it exists, then push new one
    history = history.filter(h => h.date !== today);
    history.push(historyEntry);

    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
    console.log('Stats successfully collected and updated!');
}

collectData();