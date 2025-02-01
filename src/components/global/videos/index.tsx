"use client";
import { getAllUserVideos } from "@/actions/workspace";
import VideoRecorderDuotone from "@/components/icons/video-recorder-duotone";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideosProps } from "@/types/index.type";
import React from "react";
import VideoCard from "./video-card";

type Props = {
  folderId: string;
  videosKey: string;
  workspaceId: string;
};

const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
  const { data: videoData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId)
  );

  console.log("Fetched video data:", videoData);

  const { status: videosStatus, data: videos } = videoData as VideosProps;

  console.log("Video Status:", videosStatus);
  console.log("Videos Data:", videos);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoRecorderDuotone />
          <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videosStatus !== 200
            ? "p-5"
            : "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {/* {videosStatus === 200 ? (
          videos.map((video) => (
            <div key={video.id} className="p-4 border border-gray-300">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-500">ID: {video.id}</p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(video.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-[#BDBDBD]"> No videos in workspace</p>
        )} */}

        {videosStatus === 200 ? (
          videos.map((video) => (
            <VideoCard key={video.id} workspaceId={workspaceId} {...video} />
          ))
        ) : (
          <p className="text-[#BDBDBD]"> No videos in workspace</p>
        )}
      </section>
    </div>
  );
};

export default Videos;
