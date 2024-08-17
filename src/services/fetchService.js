const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "Web/2.0",
    "Allow-Control-Allow-Origin": "*",
    mode: "no-cors"
};

const CONTRIB_URL = "https://shivishbrahma-rest-api.netlify.app/github/contributions/";

export async function loadMockup(file) {    
    try {
        const response = await window.fetch(`${process.env.PUBLIC_URL}/data/${file}.json`, {
            method: "GET",
            headers: headers
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getContributionData(username) {
    const response = await window.fetch(`${CONTRIB_URL}${username}`, {
        method: "GET",
        headers: headers
    });
    const data = await response.json();
    if (data.message) throw new Error(data.message);
    return data.contributions;
}
