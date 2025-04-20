import instance from "@/api/instance";

export const fetcher = (url: string) => instance.get(url).then((res) => res.data);
