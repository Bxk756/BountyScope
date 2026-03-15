/**
 * BountyScope JavaScript Endpoint Discovery Engine
 */

import fetch from "node-fetch";

export async function scanJS(url) {

  const discovered = new Set();

  try {

    const response = await fetch(url);
    const html = await response.text();

    const jsFiles = [...html.matchAll(/src=["'](.*?\.js)["']/g)]
      .map(match => match[1]);

    for (const js of jsFiles) {

      let jsUrl = js;

      if (!js.startsWith("http")) {
        const base = new URL(url).origin;
        jsUrl = base + js;
      }

      try {

        const jsResponse = await fetch(jsUrl);
        const jsContent = await jsResponse.text();

        const endpoints = jsContent.match(/\/api\/[a-zA-Z0-9/_-]+/g);

        if (endpoints) {
          endpoints.forEach(e => discovered.add(e));
        }

      } catch {}

    }

  } catch (err) {
    console.error("JS scan error:", err);
  }

  return [...discovered];
}
