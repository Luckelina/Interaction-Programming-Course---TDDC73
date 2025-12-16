
// src/api/github.js

//returns a isoString from datobject, starting at todays date
function buildDateFilter(daysBack) {
  const date = new Date();
  date.setDate(date.getDate() - daysBack);
  const iso = date.toISOString().slice(0, 10); // YYYY-MM-DD
  return iso;
}

//Fetch popular repos for a language and time range using REST search API.
  //fetch() → envelope arrives
  //res.ok → check label on envelope
  //res.json() → open envelope and read letter
export async function fetchPopularRepos(language, daysBack = 7) {
  const since = buildDateFilter(daysBack);
  const q = `language:${language} created:>${since}`;
  const url =
    `https://api.github.com/search/repositories` +
    `?q=${encodeURIComponent(q)}` + // encodeURIComponent make q url-friendly
    `&sort=stars&order=desc&per_page=30`;

  //fetch() performs an HTTP request and returns a Promise resolving to a Response object (res)
  //It gives the metadata first, not the content.
  //await pauses the async function until response is feteched.
  //Most GitHub REST API endpoints specify that you should pass an Accept header
  //with a value of application/vnd.github+json.

  //API versions: https://docs.github.com/en/rest/about-the-rest-api/api-versions?apiVersion=2022-11-28
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub error ${res.status}: ${text}`);
  }

  //Constructs the data after res.ok!
  const data = await res.json();
  return data.items; 
  // array of repositories
}
