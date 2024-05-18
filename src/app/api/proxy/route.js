// pages/api/proxy.js
export default async function handler(req, res) {
    const { url,...params } = req.query; // Destructure the query object
  
    // Construct the full API URL
    const apiUrl = `https://www.googleapis.com/upload/youtube/v3/videos?part=${encodeURIComponent(params.part)}&uploadType=multipart`;
  
    // Prepare the request options
    const options = {
      method: req.method,
      headers: {
       ...req.headers,
        'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}`, // Extract Bearer token
        'Content-Type': 'multipart/form-data' // Set Content-Type header
      },
      body: req.body // Pass the original request body
    };
  
    // Perform the request
    const response = await fetch(apiUrl, options);
  
    // Handle the response
    const data = await response.text(); // Adjust based on expected response format
    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).json(JSON.parse(data));
  }
  