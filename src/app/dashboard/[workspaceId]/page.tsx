import { getAllUserVideos, getWorkspaceFolders } from "@/actions/workspace";
import CreateWorkspace from "@/components/global/create-workspace";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CreateForlders from "@/components/global/create-folders";
import Folders from "@/components/global/folders";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import React from "react";

type Props = {
  params: { workspaceId: string };
};

const Page = async ({ params: { workspaceId } }: Props) => {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div>
        <Tabs defaultValue="videos" className="mt-6">
          <div className="flex w-full justify-between items-center">
            <TabsList className="bg-transparent gap-2 pl-0">
              <TabsTrigger
                className="p-[13px] px-6 rounded-full text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#252525]"
                value="videos"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="archive"
                className="p-[13px] px-6 rounded-full text-gray-300 data-[state=active]:text-white data-[state=active]:bg-[#252525]"
              >
                Archive
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-x-3">
              <CreateWorkspace />
              <CreateForlders workspaceId={workspaceId} />
            </div>
          </div>
          <section className="py-9">
            <TabsContent value="videos">
              <Folders workspaceId={workspaceId} />
            </TabsContent>
            <TabsContent value="archive">
              <h1>Archives</h1>
            </TabsContent>
          </section>
        </Tabs>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
