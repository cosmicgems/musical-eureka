import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_KEY = process.env.YOUTUBE_DATA_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export default async function searchVideos(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const query = req.query.query as string; // Access the query parameter from the URL

        try {
            const response = await axios.get(`${BASE_URL}/search`, {
                params: {
                    key: API_KEY,
                    q: query,
                    part: 'snippet',
                    maxResults: 10,
                    type: 'video',
                },
            });

            const videos = response.data.items;

            return res.status(200).json({ message: "Videos were successfully fetched!", videos });
        } catch (error) {
            console.error('There was an error fetching the videos:', error);
            // return res.status(500).json({ message: "Internal server error." });
        }
    } else {
        res.status(500).json({ message: "Your request is unauthorized." });
    }
}
