import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const channelId = process.env.YOUTUBE_CHANNEL_ID || "YOUR_CHANNEL_ID";
  const apiKey = process.env.YOUTUBE_API_KEY || "YOUR_API_KEY";

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&id=order=date&maxResults=8&type=video`;

    const res = await fetch(url);

    if (!res.ok) {
      return NextResponse.json(
        { videos: getMockVideos() },
        { status: 200 }
      );
    }

    const data = await res.json();

    const videos = data.items?.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url || "",
      description: item.snippet.description,
      date: item.snippet.publishedAt,
    })) || [];

    return NextResponse.json({ videos });
  } catch {
    return NextResponse.json({ videos: getMockVideos() });
  }
}

function getMockVideos() {
  return [
    {
      id: "mock1",
      title: "CONFIG SENSIBILIDADE PERFEITA PARA MOBILADOR 2024",
      thumbnail: "",
      description: "A melhor configuração de sensibilidade para mobilador",
      date: new Date().toISOString(),
    },
    {
      id: "mock2",
      title: "TOP 10 MACETES QUE VOCÊ NÃO SABIA NO FREE FIRE",
      thumbnail: "",
      description: "Macetes incríveis para Free Fire",
      date: new Date().toISOString(),
    },
  ];
}
