/**
 * BountyScope - Parameter Extraction Engine
 * Extracts parameters from HTTP requests for vulnerability testing
 */

export function extractParameters(requestText) {
  const parameters = new Set();

  if (!requestText) return [];

  const lines = requestText.split("\n");
  const requestLine = lines[0] || "";

  // Extract query parameters from URL
  const queryMatch = requestLine.match(/\?(.*)\sHTTP/);

  if (queryMatch) {
    const queryParams = queryMatch[1].split("&");

    queryParams.forEach(param => {
      const [key] = param.split("=");
      if (key) parameters.add(key.trim());
    });
  }

  // Extract JSON body parameters
  const bodyMatch = requestText.match(/\{[\s\S]*\}/);

  if (bodyMatch) {
    try {
      const json = JSON.parse(bodyMatch[0]);

      Object.keys(json).forEach(key => parameters.add(key));
    } catch (err) {
      // Ignore invalid JSON bodies
    }
  }

  return [...parameters];
}
