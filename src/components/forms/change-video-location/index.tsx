import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMoveVideos } from "@/hooks/useFolders";
import React from "react";

type Props = {
  videoId: string;
  currentFolder?: string;
  currentWorkSpace?: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentFolderName,
  currentWorkSpace,
}: Props) => {
  const {
    register,
    isPending,
    onFormSubmit,
    folders,
    workspaces,
    isFetching,
    isFolders,
  } = useMoveVideos(videoId, currentWorkSpace!);

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((f) => f.id === currentWorkSpace);

  return (
    <form
      className="flex flex-col gap-y-5 p-5 bg-white rounded-xl shadow-lg"
      onSubmit={onFormSubmit}
    >
      <div className="border-[1px] rounded-xl p-5 bg-gray-100">
        <h2 className="text-sm text-gray-700">Current Workspace</h2>
        {workspace && <p className="text-gray-900">{workspace.name}</p>}
        <h2 className="text-sm text-gray-700 mt-4">Current Folder</h2>
        {folder ? (
          <p className="text-gray-900">{folder.name}</p>
        ) : (
          "This video has no folder"
        )}
      </div>
      <Separator orientation="horizontal" className="my-4 border-gray-300" />
      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl bg-gray-50">
        <h2 className="text-sm text-gray-700">To</h2>
        <Label className="flex-col gap-y-2 flex">
          <p className="text-xs text-gray-600">Workspace</p>
          <select
            className="rounded-xl text-base bg-white border-[1px] border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500"
            {...register("workspace_id")}
          >
            {workspaces.map((space) => (
              <option key={space.id} className="text-gray-700" value={space.id}>
                {space.name}
              </option>
            ))}
          </select>
        </Label>
        {isFetching ? (
          <Skeleton className="w-full h-[40px] rounded-xl bg-gray-200" />
        ) : (
          <Label className="flex flex-col gap-y-2">
            <p className="text-xs text-gray-600">Folders in this workspace</p>
            {isFolders && isFolders.length > 0 ? (
              <select
                {...register("folder_id")}
                className="rounded-xl bg-white border-[1px] border-gray-300 text-base text-gray-800 focus:ring-2 focus:ring-blue-500"
              >
                {isFolders.map((folder, key) => (
                  <option
                    className="text-gray-700"
                    key={folder.id}
                    value={folder.id}
                  >
                    {folder.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-600 text-sm">
                This workspace has no folders
              </p>
            )}
          </Label>
        )}
      </div>
      <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
        <Loader state={isPending} color="#fff">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
