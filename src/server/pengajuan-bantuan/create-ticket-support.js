import { PostApi } from "@/lib/fetchApi";
export const CreateTicket = async (data) => {
  let response = await PostApi(data, "/ticket-support/add");
  console.log(data);
  return response;
};
