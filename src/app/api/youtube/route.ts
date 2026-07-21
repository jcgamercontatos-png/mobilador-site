import { NextRequest, NextResponse } from "next/server";

const CHANNEL_ID = "UC835FbsSjT9bDt6os1nuu7g";

async function fetchFromRSS() {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) return [];

  const text = await res.text();

  const videos: any[] = [];
  const entries = text.split("<entry>").slice(1);

  for (const entry of entries) {
    const title = entry.match(/<media:title>(.*?)<\/media:title>/)?.[1] || "";
    const videoId =
      entry.match(
        /yt:videoId>(.*?)<\/yt:videoId/
      )?.[1] || "";
    const thumbnail =
      entry.match(
        /<media:thumbnail url="(.*?)"/
      )?.[1] || "";
    const published =
      entry.match(/<published>(.*?)<\/published>/)?.[1] || "";

    if (videoId) {
      videos.push({
        id: videoId,
        title: title.replace(/&amp;/g, "&").replace(/&#39;/g, "'"),
        thumbnail: thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        date: published,
      });
    }
  }

  return videos;
}

export async function GET() {
  try {
    const videos = await fetchFromRSS();

    if (videos.length === 0) {
      return NextResponse.json({ videos: getMockVideos() });
    }

    return NextResponse.json({ videos });
  } catch {
    return NextResponse.json({ videos: getMockVideos() });
  }
}

function getMockVideos() {
  return [
    {
      id: "vi415Rs4rDs",
      title: "SENSIBILIDADE PRO: a config da IA que NINGUÉM está usando no GG Mouse Pro 3",
      thumbnail: "https://i.ytimg.com/vi/vi415Rs4rDs/hqdefault.jpg",
      date: new Date().toISOString(),
    },
  ];
}
