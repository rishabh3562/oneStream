import { NextResponse } from "next/server";
import { google } from 'googleapis';
import { Readable } from 'stream';

export async function GET(req) {
    return NextResponse.json({ message: "Hello, World!" }, { status: 200 });
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('videoFile');
        const title = formData.get('title');
        const description = formData.get('description');
        const tags = formData.get('tags');
        const privacyStatus = formData.get('privacyStatus');
        const accessToken = formData.get('accessToken');

        if (!file) {
            return NextResponse.json({ error: "No file found" }, { status: 400 });
        }

        if (!accessToken) {
            return NextResponse.json({ error: "Access token is missing" }, { status: 400 });
        }

        // OAuth2 Client setup
        const oAuth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URL
        );
        oAuth2Client.setCredentials({ access_token: accessToken });

        const youtube = google.youtube({ version: 'v3', auth: oAuth2Client });

        // Convert file Blob to a readable stream
        const stream = Readable.from(file.stream());

        // Call YouTube API to upload video
        const response = await youtube.videos.insert({
            part: 'snippet,status',
            requestBody: {
                snippet: {
                    title,
                    description,
                    tags: tags.split(','),
                    categoryId: '22' // Category ID for 'People & Blogs' (change as needed)
                },
                status: {
                    privacyStatus
                }
            },
            media: {
                body: stream // Pass the file stream
            }
        });

        return NextResponse.json({ message: "Video uploaded successfully", response }, { status: 200 });
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Video upload failed", details: error.message }, { status: 500 });
    }
}
