import { useParams } from "react-router-dom";
import { useGetOrganizationEvents } from "../../../queries";

export const OrganizationEvents = () => {
  const { organizationId } = useParams();

  const { data, isFetched } = useGetOrganizationEvents(
    Number(organizationId) | 0
  );

  console.log(data);

  return isFetched ? <div>content</div> : <div>Loading</div>;
};
