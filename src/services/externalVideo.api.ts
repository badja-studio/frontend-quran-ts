import gtkApiClient from "./gtkApi.config";

export async function getVideoByTeacherId(teacherId: string) {
  const res = await gtkApiClient.get("/api/participants", {
    params: {
      page: 1,
      per_page: 1,
      teacher_id: teacherId,
      video_status: "UPLOADED",
    },
  });

  return res.data?.data?.[0] || null;
}
