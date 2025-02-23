import { NavigationSchema } from "@/entities/Navigation/model/types/NavigationSchema";
import axios from "axios";

export const fetchNavigationElements = async (): Promise<
  NavigationSchema[]
> => {
  const response = await axios.get<NavigationSchema[]>(
    "http://localhost:3000/navigation_elements"
  );
  return response.data.sort((a, b) => a.order - b.order);
};
