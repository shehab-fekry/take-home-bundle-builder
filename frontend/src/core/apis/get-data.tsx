import { useQuery } from "@tanstack/react-query";
import { IResponse } from "./@types";

const normalizer = (data: IResponse) => {
  return data.data;
}

const getData = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/data');
    const data = (await res.json()) as IResponse;

    if (!res.ok) {
      throw new Error(data.message);
    }

    return normalizer(data);
  } catch (error) {
    // network error
    if (error instanceof TypeError) {
      throw new Error('Somthing went wrong! please try again later.');
    }

    // server errors
    throw new Error(
      (error as { message?: string })?.message ||
        'Something went wrong!'
    );
  }
};

export const useGetDataQuery = () => {
  return useQuery({
    queryFn: () => getData(),
    queryKey: ['GET_DATA'],
  });
};
