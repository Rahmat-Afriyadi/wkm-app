import { PostApi } from "@/lib/fetchApi";
export const updateApprovalLf = async (data) => {
  let response = await PostApi(data, "/extend-bayar/update-extend-bayar/approval-lf");
  return response;
};
