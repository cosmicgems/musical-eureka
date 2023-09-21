import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


const API_KEY = process.env.YOUTUBE_DATA_API_KEY;
const BASE_URL = 'http://www.googleapis.com/youtube/v3';
const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID_QUANTUM

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET"){
        try {
            const playlistResponse = await axios.get(`${BASE_URL}/playlistItems`, {
                params: {
                    part: 'snippet',
                    maxResults: 10, 
                    playlistId: PLAYLIST_ID,
                    key: API_KEY,
                },
            });

            const videos = playlistResponse.data.items
            
            res.status(200).json({message: "Your videos fetched successfully.", videos})
        } catch (error) {
            res.status(200).json({message: "", videos: []})
        }

    }
}